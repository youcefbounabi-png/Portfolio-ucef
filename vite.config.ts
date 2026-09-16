import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'resend-api',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url === '/api/send' && req.method === 'POST') {
            let body = ''
            req.on('data', (chunk) => {
              body += chunk
            })
            req.on('end', async () => {
              try {
                const data = JSON.parse(body)
                const apiKey = process.env.RESEND_API_KEY
                if (!apiKey) {
                  res.statusCode = 500
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ error: 'Missing RESEND_API_KEY environment variable in .env' }))
                  return
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
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(result))
              } catch (err: any) {
                res.statusCode = 500
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: err.message }))
              }
            })
          } else {
            next()
          }
        })
      },
    },
  ],
  server: {
    port: 5176,
    host: true,
  },
  build: {
    cssCodeSplit: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-motion': ['motion'],
          'vendor-icons': ['lucide-react'],
          'vendor-utils': ['@number-flow/react', 'lenis'],
        },
      },
    },
  },
})

