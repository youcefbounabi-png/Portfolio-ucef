export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return res.status(500).json({ error: 'Missing RESEND_API_KEY environment variable' })
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
        reply_to: data.contact && data.contact.includes('@') ? data.contact : undefined,
        subject: `New Lead: ${data.name || 'Client'} — ${data.service || 'Project Inquiry'}`,
        text: `Name: ${data.name}\nContact: ${data.contact}\nService: ${data.service}\nChannels: ${data.channels || 'None specified'}\n\nProject Scope & Goals:\n${data.msg || 'No details provided'}`,
      }),
    })

    const result = await resendRes.json()
    return res.status(200).json(result)
  } catch (err: any) {
    return res.status(500).json({ error: err.message })
  }
}
