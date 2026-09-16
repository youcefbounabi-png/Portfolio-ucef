import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion'
import { Plus } from 'lucide-react'

const items = [
  {
    id: '01',
    title: 'How fast can you deliver?',
    content:
      'Landing pages take 1 week (promising 3–5 days is unrealistic for high-converting bespoke craftsmanship). Full websites and AI chatbot systems take 2 weeks. The AI receptionist takes 5–10 days, which includes custom voice prompt engineering, knowledge base indexing, SIP trunking, and live telephony stress testing.',
  },
  {
    id: '02',
    title: 'How does the AI receptionist work?',
    content:
      'Your existing business line forwards missed or incoming calls directly to an autonomous voice agent powered by LiveKit Agents and Twilio SIP. Running on an ultra-low latency WebRTC audio pipeline (<600ms response time), the agent converses naturally in English, French, or Algerian Arabic (Darja). It answers customer questions from your private SOPs, checks real-time calendar availability via API tool-calling, books appointment slots, and immediately sends an SMS summary with caller details to your personal phone.',
  },
  {
    id: '03',
    title: 'What does it cost?',
    content:
      'Website Build starts from $290 one-time. Website + AI base suite starts from $490 one-time (advanced multi-channel setups like WhatsApp + Instagram DMs + Gmail triage are scoped and quoted upfront via Contact). The AI Receptionist is a one-time setup fee ($390) plus a monthly subscription ($49/mo) covering LiveKit telephony infrastructure, SIP routing, and ongoing prompt maintenance. You always get a fixed quote upfront — no surprises.',
  },
  {
    id: '04',
    title: 'Do I own everything?',
    content:
      'Yes. Domain, site code, accounts, and automation workflows are 100% yours. I build, hand over with a complete Loom walkthrough video, and include two weeks of free dedicated fixes and support after launch.',
  },
  {
    id: '05',
    title: 'What do you need from me to start?',
    content:
      'Just your logo (if you have one), your core services and prices, and how you want your booking or lead flow to operate. I handle the rest — architecture, design, code, tool integrations, and launch.',
  },
  {
    id: '06',
    title: 'What if the AI can’t answer a caller?',
    content:
      'The AI handles ~85% of routine queries and bookings autonomously. If an edge case or urgent request arises, it gracefully offers warm transfer to your staff line or logs the caller’s request and triggers an urgent SMS notification directly to your phone so you never lose a client.',
  },
  {
    id: '07',
    title: 'Languages and communication?',
    content:
      'Fluent in English, French, and Algerian Arabic. You get direct one-on-one communication, regular Loom video updates during development, and swift post-launch assistance.',
  },
]

export function FaqAccordion() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <Accordion type="single" defaultValue="01" collapsible className="w-full">
        {items.map((item) => (
          <AccordionItem
            value={item.id}
            key={item.id}
            className="border-white/25 last:border-b"
          >
            <AccordionTrigger className="group text-left py-6 overflow-hidden text-white/30 transition-colors duration-200 hover:no-underline hover:text-white/70 data-[state=open]:text-white [&>svg]:hidden">
              <span className="flex flex-1 items-start gap-4 md:gap-6">
                <span className="pt-2 text-xs font-manrope tracking-widest">{item.id}</span>
                <span className="font-italiana uppercase leading-[1.1] text-[clamp(1.5rem,4vw,2.6rem)]">
                  {item.title}
                </span>
              </span>
              <span className="ml-4 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/30 text-white transition-transform duration-300 group-data-[state=open]:rotate-45">
                <Plus size={16} />
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-white/70 text-[15px] leading-relaxed pb-7 pl-9 md:pl-14 pr-4">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
