export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Security: Origin / Referer validation
  const origin = req.headers.origin || req.headers.referer || ''
  const isAllowedOrigin =
    !origin ||
    origin.includes('youcefdev.com') || origin.includes('youcef-dev.vercel.app') ||
    origin.includes('localhost') ||
    origin.includes('127.0.0.1') ||
    origin.includes('vercel.app')

  if (!isAllowedOrigin) {
    return res.status(403).json({ error: 'Forbidden origin' })
  }

  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return res.status(500).json({ error: 'Server configuration error' })
    }

    const data = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {})

    // Honeypot protection: if bots fill hidden fields, silently acknowledge without sending
    if (data._gotcha || data.website || data.honeypot) {
      return res.status(200).json({ success: true, message: 'Message acknowledged' })
    }

    // Input sanitization and length limits
    const name = String(data.name || 'Client').trim().slice(0, 100)
    const contact = String(data.contact || '').trim().slice(0, 150)
    const service = String(data.service || 'Project Inquiry').trim().slice(0, 100)
    const channels = String(data.channels || 'None specified').trim().slice(0, 200)
    const msg = String(data.msg || 'No details provided').trim().slice(0, 3000)

    if (!contact && msg === 'No details provided') {
      return res.status(400).json({ error: 'Missing required contact information' })
    }

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Youcef Studio <onboarding@resend.dev>',
        to: ['youcefbounabi@gmail.com'],
        reply_to: contact && contact.includes('@') ? contact : undefined,
        subject: `New Lead: ${name} — ${service}`,
        text: `Name: ${name}\nContact: ${contact}\nService: ${service}\nChannels: ${channels}\n\nProject Scope & Goals:\n${msg}`,
      }),
    })

    const result = await resendRes.json()
    return res.status(200).json(result)
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to process request securely' })
  }
}
