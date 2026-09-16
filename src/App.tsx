import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate, useMotionValueEvent, type MotionValue } from 'motion/react'
import { ArrowUpRight, Bot, CalendarCheck, Check, CheckCheck, Code2, Database, ExternalLink, FileDown, Globe, MapPin, MessageCircle, PhoneCall, Play, Send, Sparkles, Star, X } from 'lucide-react'
import NumberFlow from '@number-flow/react'
import Lenis from 'lenis'
import TrackingSwarm from './TrackingSwarm'
import CloudTransition from './CloudTransition'
import { FaqAccordion } from './components/ui/faq-accordion'
import { RenaissancePortalPreloader } from './components/RenaissancePortalPreloader'
import { DaVinciPortraitHalo, DaVinciSectionWatermark, DaVinciNeverMissCallWatermark } from './components/DaVinciWatermarks'

const LOGO_PATH =
  'M60 120C26.8629 120 0 93.1371 0 60V0C22.5654 0 42.2213 12.4569 52.4662 30.8691C38.4788 34.2089 28.0787 46.7902 28.0787 61.8006V63.1443C28.0787 79.9648 41.7146 93.6006 58.5353 93.6006H59.8789L59.8785 61.8006C59.8785 79.3633 74.1159 93.6006 91.6787 93.6006L91.6787 61.8006C91.6787 44.2783 77.5071 30.0661 60 30.0008L60 0H62.5352C94.2722 0 120 25.7279 120 57.4648V60C120 93.1371 93.1371 120 60 120Z'

function LogoMark({ size = 80 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="geometricPrecision"
    >
      <path fillRule="evenodd" clipRule="evenodd" d={LOGO_PATH} fill="white" />
    </svg>
  )
}

const ROMANS_IMG =
  'https://commons.wikimedia.org/wiki/Special:FilePath/Rembrandt%20-%20The%20Anatomy%20Lesson%20of%20Dr%20Nicolaes%20Tulp.jpg?width=1600'

const BOXES = [
  { x: 0.18, y: 0.34, w: 78, h: 98, word: 'face' },
  { x: 0.3, y: 0.3, w: 80, h: 100, word: 'face' },
  { x: 0.42, y: 0.32, w: 82, h: 102, word: 'face' },
  { x: 0.55, y: 0.28, w: 78, h: 96, word: 'face' },
  { x: 0.68, y: 0.3, w: 80, h: 100, word: 'face' },
  { x: 0.78, y: 0.38, w: 76, h: 94, word: 'face' },
  { x: 0.5, y: 0.72, w: 110, h: 76, word: 'subject' },
  { x: 0.63, y: 0.58, w: 72, h: 88, word: 'ledger' },
  { x: 0.7, y: 0.5, w: 64, h: 80, word: 'hands' },
]

const HERO_IMG =
  'https://commons.wikimedia.org/wiki/Special:FilePath/Giovanni%20Battista%20Tiepolo%20-%20Allegory%20of%20the%20Planets%20and%20Continents.jpg?width=1920'

const CV_PATH = '/youcef-bounabi-cv.pdf'

const YOUCEF_CUTOUT = '/youcef-cutout.png?v=3'

const FAQ_TEMPLE = '/faq-temple.png'

const FAQ_THINKER = '/thinker-cut.png'

const HERO_BOXES = [
  { x: 0.28, y: 0.16, w: 56, h: 68, word: 'cherub' },
  { x: 0.47, y: 0.18, w: 60, h: 70, word: 'goddess' },
  { x: 0.4, y: 0.38, w: 58, h: 72, word: 'mercury' },
  { x: 0.73, y: 0.32, w: 56, h: 68, word: 'saturn' },
  { x: 0.84, y: 0.46, w: 52, h: 64, word: 'parasol' },
]

const SERVICES = [
  {
    icon: Globe,
    no: 'I.',
    title: 'Web Development',
    desc: 'High-performance landing pages, e-commerce storefronts, and web platforms designed to convert visitors into booked clients.',
    points: [
      'Bespoke Next.js & React platforms with 95+ PageSpeed scores',
      'Direct booking systems, WhatsApp handoff & payment checkout',
      'Full code ownership, SEO schema & 2 weeks launch support',
    ],
    price: 'From $290 (1 week for landing pages · 2 weeks for full platforms)',
  },
  {
    icon: Bot,
    no: 'II.',
    title: 'AI Automation & Agents',
    desc: 'Conversational lead qualification, multi-channel bots, and automated CRM pipelines that run your business operations on autopilot.',
    points: [
      '24/7 autonomous lead qualification on WhatsApp, IG & Web',
      'Zero-hallucination RAG knowledge base trained on your SOPs & pricing',
      'Automated webhook pipelines syncing leads to CRM & Google Sheets',
    ],
    price: 'Base suite from $490 (2 weeks setup · Custom channels scoped via Contact)',
  },
  {
    icon: PhoneCall,
    no: 'III.',
    title: 'AI Receptionist (Voice)',
    desc: 'An autonomous 24/7 voice agent that answers your business phone, qualifies callers, resolves inquiries, and locks in appointments.',
    points: [
      'Answers incoming calls in <600ms with natural human cadence',
      'Direct calendar booking (Google Calendar, Cal.com) via API tools',
      'Instant SMS & email caller summaries delivered to your phone',
    ],
    price: '$390 setup + $49/mo (5–10 days turnaround · Telephony infrastructure & maintenance)',
  },
]

const STACK_GROUPS = [
  {
    label: 'Languages & Frameworks',
    icon: Code2,
    items: ['C#', '.NET', 'C / C++', 'TypeScript', 'JavaScript', 'Python', 'React', 'Next.js', 'Node.js', 'Tailwind CSS'],
  },
  {
    label: 'Backend, Data & APIs',
    icon: Database,
    items: ['ASP.NET Core', 'REST APIs', 'PostgreSQL', 'MySQL / SQLite', 'Entity Framework', 'Webhooks', 'Git / GitHub'],
  },
  {
    label: 'AI, Voice & Automation',
    icon: Bot,
    items: ['OpenAI API', 'Whisper', 'Twilio SIP', 'LiveKit', 'WhatsApp', 'Instagram', 'Calendar / CRM', 'Docs & SOPs'],
  },
]

const MARQUEE = ['C#', '.NET', 'React', 'Next.js', 'TypeScript', 'SQL', 'REST APIs', 'Python', 'OpenAI', 'Twilio SIP', 'LiveKit', 'Node.js', 'WhatsApp', 'Tailwind']

/* ============ INTERACTION PRIMITIVES — awwwards-style motion, same Baroque theme ============ */

function Magnetic({ children, className = 'inline-block', strength = 0.32 }: { children: ReactNode; className?: string; strength?: number }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 })
  return (
    <motion.div
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
    >
      {children}
    </motion.div>
  )
}

function Tilt({ children, className = '', max = 6 }: { children: ReactNode; className?: string; max?: number }) {
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 160, damping: 16 })
  const sry = useSpring(ry, { stiffness: 160, damping: 16 })
  return (
    <motion.div
      className={className}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2)
        rx.set(-(((e.clientY - r.top) / r.height - 0.5) * max * 2))
      }}
      onMouseLeave={() => { rx.set(0); ry.set(0) }}
    >
      {children}
    </motion.div>
  )
}

const STUDIO_WORDS: Array<{ text: string; bold?: boolean }> = [
  { text: 'I' },
  { text: 'built' },
  { text: 'this' },
  { text: 'practice' },
  { text: 'with' },
  { text: 'a' },
  { text: 'single' },
  { text: 'purpose' },
  { text: '—' },
  { text: 'to' },
  { text: 'give' },
  { text: 'ambitious' },
  { text: 'businesses' },
  { text: 'the' },
  { text: 'polish' },
  { text: 'of' },
  { text: 'a' },
  { text: 'royal' },
  { text: 'court' },
  { text: 'and' },
  { text: 'the' },
  { text: 'engine' },
  { text: 'room' },
  { text: 'of' },
  { text: 'the' },
  { text: 'future.' },
  { text: 'I' },
  { text: 'craft' },
  { text: 'high-performance' },
  { text: 'web' },
  { text: 'platforms' },
  { text: 'and' },
  { text: 'deploy' },
  { text: 'autonomous' },
  { text: 'AI' },
  { text: 'systems:' },
  { text: 'conversion-driven', bold: true },
  { text: 'sites,', bold: true },
  { text: 'automated', bold: true },
  { text: 'lead', bold: true },
  { text: 'engines,', bold: true },
  { text: 'and' },
  { text: '24/7', bold: true },
  { text: 'voice', bold: true },
  { text: 'agents', bold: true },
  { text: 'that' },
  { text: 'never' },
  { text: 'miss' },
  { text: 'an' },
  { text: 'opportunity.' },
]

interface WorkProject {
  title: string
  tags: string[]
  img: string
  pos: string
  url: string
  desc: string
  isExternal?: boolean
  isVideoDemo?: boolean
  demoTitle?: string
  demoDesc?: string
  videoUrl?: string
}

const WORK: WorkProject[] = [
  {
    title: 'Flex Supps',
    tags: ['E-COMMERCE', 'SUPABASE', 'GSAP'],
    img: '/work-flexsupp.png',
    pos: 'center top',
    url: 'https://www.flexsupp.com/',
    desc: 'Sports nutrition and fitness supplements e-commerce platform in Algeria with custom cart, Supabase backend, multi-language catalog, and smooth GSAP animations.',
    isExternal: true,
  },
  {
    title: 'ADA Clinic',
    tags: ['LUXURY CLINIC', 'NEXT.JS', 'BOOKING'],
    img: '/work-adaclinic.png',
    pos: 'center center',
    url: 'https://ada-clinic.vercel.app/',
    desc: 'Aventura Dental Arts — luxury esthetic & restorative dentistry clinic in Miami with cinematic video hero, bespoke typography, and patient intake systems.',
    isExternal: true,
  },
  {
    title: 'Goldenbody Nutrition',
    tags: ['3D PERFORMANCE', 'NEXT.JS', 'SHOP'],
    img: '/work-goldenbody.png',
    pos: 'center center',
    url: 'https://goldenbody.vercel.app/',
    desc: 'Elite sports nutrition platform featuring scroll-driven 3D sequence canvas, clinical dosage formulations, and high-performance product showcase.',
    isExternal: true,
  },
  {
    title: 'Coach Akram',
    tags: ['HIGH-TICKET FUNNEL', 'THREE.JS', 'PAYPAL'],
    img: '/work-akramcoach.png',
    pos: 'center center',
    url: 'https://akramcoach.com/',
    desc: 'Elite coaching platform for Dr. Akram Ikni combining pharmaceutical science with championship bodybuilding, Three.js visuals, and PayPal checkout.',
    isExternal: true,
  },
  {
    title: 'Akram Coach Books',
    tags: ['DIGITAL STORE', 'E-BOOKS', 'AUTOMATION'],
    img: '/work-akrambooks.png',
    pos: 'center top',
    url: 'https://books.akramcoach.com/',
    desc: 'Digital product storefront and training protocol library featuring instant automated e-book fulfillment and high-converting checkout funnel.',
    isExternal: true,
  },
  {
    title: 'LiveKit AI Receptionist',
    tags: ['VOICE TELEPHONY', 'LIVEKIT', 'TWILIO SIP', 'VIDEO DEMO'],
    img: '/ada_cadcam.png',
    pos: 'center center',
    url: '#contact',
    desc: '24/7 autonomous telephony voice agent with sub-600ms latency, real-time Google Calendar / Cal.com booking, instant SMS summaries, and trilingual fluency.',
    isVideoDemo: true,
    demoTitle: 'LiveKit AI Voice Receptionist Demonstration',
    demoDesc: 'Autonomous telephony voice agent answering inbound customer calls in real-time, retrieving business info with zero hallucinations, and locking in calendar appointments.',
  },
  {
    title: 'Autonomous Lead Engine',
    tags: ['AI AUTOMATION', 'WHATSAPP BOT', 'CRM PIPELINE', 'VIDEO DEMO'],
    img: FAQ_TEMPLE,
    pos: 'center 30%',
    url: '#contact',
    desc: 'Multi-channel WhatsApp & web bot pipeline with automated lead qualification, webhook ingestion to CRM & Google Sheets, and automated 5-star review booster.',
    isVideoDemo: true,
    demoTitle: 'Omnichannel AI Automation Flow',
    demoDesc: 'Conversational lead triage on WhatsApp & web, instant lead scoring, webhook CRM sync, and automated missed-call re-engagement sequences.',
  },
]

function WorkList({
  triggerRef,
  lastItemRef,
  globalThemeBg,
}: {
  triggerRef?: React.Ref<HTMLAnchorElement>
  lastItemRef?: React.Ref<HTMLAnchorElement>
  globalThemeBg?: MotionValue<string>
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)
  const [selectedDemo, setSelectedDemo] = useState<WorkProject | null>(null)
  const mx = useMotionValue(-500)
  const my = useMotionValue(-500)
  const sx = useSpring(mx, { stiffness: 260, damping: 26, mass: 0.5 })
  const sy = useSpring(my, { stiffness: 260, damping: 26, mass: 0.5 })

  return (
    <motion.section
      id="work"
      style={{ backgroundColor: globalThemeBg || '#F26522' }}
      className="relative w-full font-manrope transition-colors duration-300"
    >
      <DaVinciSectionWatermark variant="work" />
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
          <div>
            <SectionLabel index="02">Selected Work</SectionLabel>
            <h2 className="font-italiana text-white leading-[1.05] text-[clamp(2rem,5vw,3.6rem)] mt-2">
              Recent builds & intelligence systems.
            </h2>
          </div>
          <p className="text-white/70 text-[13px] max-w-[320px] font-light leading-relaxed">
            From high-conversion e-commerce storefronts to 24/7 autonomous LiveKit voice telephony.
          </p>
        </div>

        <div
          ref={ref}
          className="relative mt-8"
          onMouseLeave={() => setActive(null)}
          onMouseMove={(e) => {
            const r = ref.current?.getBoundingClientRect()
            if (!r) return
            mx.set(e.clientX - r.left - 210)
            my.set(e.clientY - r.top - 135)
          }}
        >
          {WORK.map((w, i) => (
            <motion.a
              key={w.title}
              ref={i === WORK.length - 2 ? triggerRef : (i === WORK.length - 1 ? lastItemRef : undefined)}
              href={w.url}
              target={w.isExternal ? '_blank' : undefined}
              rel={w.isExternal ? 'noreferrer' : undefined}
              onClick={(e) => {
                if (w.isVideoDemo) {
                  e.preventDefault()
                  setSelectedDemo(w)
                }
              }}
              onMouseEnter={() => setActive(i)}
              initial={{ opacity: 0, x: i % 2 === 0 ? -48 : 48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.65, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex items-center justify-between gap-6 border-t border-white/25 py-7 last:border-b cursor-pointer transition-colors duration-300 hover:bg-white/[0.04] px-2 rounded-xl"
            >
              <div className="flex items-start gap-5 md:gap-8">
                <span className="font-italiana text-white/40 text-[18px] pt-2">0{i + 1}</span>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-italiana text-white leading-none text-[clamp(1.8rem,4.5vw,3.2rem)] transition-transform duration-500 ease-out group-hover:translate-x-3">
                      {w.title}
                    </h3>
                    {w.isExternal && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-white/60 tracking-wider font-mono uppercase bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15">
                        Live Site <ExternalLink size={10} />
                      </span>
                    )}
                    {w.isVideoDemo && (
                      <span className="inline-flex items-center gap-1.5 text-[11px] text-[#FFF6E9] tracking-wider font-mono uppercase bg-[#2B0E02] px-2.5 py-0.5 rounded-full border border-white/25">
                        <Play size={10} className="fill-white" /> Demo Video
                      </span>
                    )}
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {w.tags.map((t) => (
                      <span key={t} className="text-white/85 text-[10px] tracking-[0.18em] border border-white/30 rounded-full px-3 py-0.5 bg-black/10">
                        {t}
                      </span>
                    ))}
                  </div>
                  {/* Mobile preview thumbnail */}
                  <div className="mt-4 block md:hidden rounded-xl overflow-hidden aspect-[16/10] border border-white/20 shadow-lg max-w-[340px]">
                    <img
                      src={w.img}
                      alt={w.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                      style={{ objectPosition: w.pos }}
                    />
                  </div>
                </div>
              </div>
              <span className="shrink-0 w-11 h-11 rounded-full border border-white/40 grid place-items-center text-white opacity-40 group-hover:opacity-100 group-hover:bg-white group-hover:text-[#F26522] group-hover:border-white transition-all duration-500">
                {w.isVideoDemo ? (
                  <Play size={16} className="translate-x-0.5 fill-current" />
                ) : (
                  <ArrowUpRight size={18} />
                )}
              </span>
            </motion.a>
          ))}

          {/* Floating cursor preview card */}
          <motion.div
            className="pointer-events-none absolute left-0 top-0 z-30 hidden md:block w-[400px] lg:w-[440px]"
            style={{ x: sx, y: sy }}
            initial={false}
            animate={{ opacity: active === null ? 0 : 1, scale: active === null ? 0.92 : 1 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-[0_32px_85px_rgba(40,10,0,0.65)] border border-white/25 bg-[#2B0E02]">
              {WORK.map((w, i) => (
                <motion.div
                  key={w.title}
                  initial={false}
                  animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.05 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="absolute inset-0 h-full w-full"
                >
                  <img
                    src={w.img}
                    alt={w.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                    style={{ objectPosition: w.pos }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3.5 left-4 right-4 text-white">
                    <p className="font-italiana text-[20px] leading-tight drop-shadow-md">{w.title}</p>
                    <p className="text-[11px] text-white/85 font-mono tracking-wider uppercase mt-1">
                      {w.isExternal ? 'Click to visit live website ↗' : 'Click to preview demo video ▶'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[12px] text-white/60 pt-4 border-t border-white/20">
          <p>Real-world client sites & intelligent automation systems engineered by Youcef.</p>
          <a href="#contact" className="hover:text-white transition-colors flex items-center gap-1.5 font-medium">
            Have a project in mind? Let&apos;s talk <ArrowUpRight size={13} />
          </a>
        </div>
      </div>

      {/* Video Demonstration Modal */}
      <AnimatePresence>
        {selectedDemo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedDemo(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl rounded-3xl bg-[#1D0A03] border border-[#F26522]/40 p-6 md:p-8 text-white shadow-[0_25px_90px_rgba(0,0,0,0.85)]"
            >
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/15">
                <div>
                  <span className="text-[11px] font-mono tracking-[0.2em] text-[#F26522] uppercase font-semibold">
                    AI System Showcase
                  </span>
                  <h3 className="font-italiana text-[26px] md:text-[32px] text-[#FFF6E9] leading-tight mt-1">
                    {selectedDemo.demoTitle || selectedDemo.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedDemo(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center text-white/80 hover:text-white transition-colors shrink-0"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-5 rounded-2xl overflow-hidden bg-black/60 aspect-video relative border border-white/15 shadow-inner">
                <video
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  poster={selectedDemo.img}
                >
                  <source src={selectedDemo.videoUrl || '/hands.mp4'} type="video/mp4" />
                </video>
              </div>

              <div className="mt-5 space-y-3">
                <p className="text-[14px] text-white/85 leading-relaxed font-light">
                  {selectedDemo.demoDesc || selectedDemo.desc}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {selectedDemo.tags.map((t) => (
                    <span key={t} className="text-[10px] font-mono tracking-wider uppercase bg-white/10 border border-white/15 px-2.5 py-1 rounded-full text-white/80">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[12px] text-white/60">
                  Full audio and customized client test calls available.
                </p>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedDemo(null)}
                    className="flex-1 sm:flex-none text-[13px] px-4 py-2.5 rounded-full border border-white/30 text-white/80 hover:text-white transition-colors"
                  >
                    Close
                  </button>
                  <a
                    href="#contact"
                    onClick={() => setSelectedDemo(null)}
                    className="flex-1 sm:flex-none text-[13px] font-medium bg-[#F26522] text-white px-5 py-2.5 rounded-full hover:bg-white hover:text-[#331507] transition-colors flex items-center justify-center gap-2"
                  >
                    Request Live Demo <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}

function FillCta() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const fill = useTransform(scrollYProgress, [0.1, 0.9], [100, 0])
  const clip = useMotionTemplate`inset(0 ${fill}% 0 0)`
  return (
    <div ref={ref} className="relative mt-2 overflow-visible">
      {/* Leonardo Da Vinci Acoustic Blueprint Watermark with scroll-revealing acoustic arcs */}
      <DaVinciNeverMissCallWatermark scrollProgress={scrollYProgress} />
      <div className="relative z-10">
        {['NEVER MISS', 'ANOTHER CALL.'].map((line) => (
          <div key={line} className="relative font-italiana leading-[0.98] text-[clamp(2.8rem,10vw,8rem)]">
            <div className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255,246,233,0.6)' }}>{line}</div>
            <motion.div aria-hidden className="absolute inset-0 text-[#FFF6E9]" style={{ clipPath: clip }}>{line}</motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}

function EchoSlice({ index, progress, children }: { index: number; progress: MotionValue<number>; children: ReactNode }) {
  const travel = 60 + index * 65
  const start = index * 0.05
  const y = useTransform(progress, [start, 1], [0, -travel])
  const opacity = 0.55 - index * 0.07
  const scaleY = useTransform(progress, [0, 1], [1, 0.55])
  return (
    <motion.div
      aria-hidden
      className="absolute inset-0 flex justify-center items-end"
      style={{ y, opacity, scaleY, transformOrigin: '50% 100%', clipPath: 'inset(0 0 80% 0)', filter: `blur(${index * 0.8}px)` }}
    >
      {children}
    </motion.div>
  )
}

function SocialRow({ label, href, external = false }: { label: string; href: string; external?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className="group flex items-center justify-between border-t border-white/30 py-3 text-[15px] text-white/85 transition-colors hover:text-white"
    >
      <span>{label}</span>
      <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
    </a>
  )
}

function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const name = 'YOUCEF.DEV'.split('')
  const letters = name.map((ch, i) => (
    <span key={i} aria-hidden className="inline-block">{ch}</span>
  ))
  const SLICES = 4
  return (
    <div ref={ref} className="relative overflow-x-clip bg-[#F26522] pt-72 pb-10 select-none" aria-label="Youcef dot dev">
      {/* stationary base + upward echo extrusion: lettertop ghosts ripple into the space above */}
      <div className="relative font-manrope font-extrabold tracking-[-0.04em] leading-[0.85] text-[#FFF6E9] text-[clamp(3.5rem,16.5vw,15rem)] whitespace-nowrap">
        <div className="flex justify-center items-end">{letters}</div>
        {Array.from({ length: SLICES }).map((_, i) => (
          <EchoSlice key={i} index={i} progress={scrollYProgress}>
            <div className="flex justify-center items-end w-full">{letters}</div>
          </EchoSlice>
        ))}
      </div>
      {/* CRT scanlines for the cyber feel */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ background: 'repeating-linear-gradient(to bottom, rgba(43,14,2,0.14) 0px, rgba(43,14,2,0.14) 1px, transparent 1px, transparent 4px)' }}
      />
      <div className="relative px-6 md:px-12 pt-8 font-mono">
        <div className="grid gap-8 md:grid-cols-[1fr_1.2fr_1.2fr] md:gap-12">
          <div className="flex gap-4 text-[12px] leading-relaxed text-white/75">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-white/80" />
            <p>YOUCEF.DEV<br />WEB & AI STUDIO<br />LONDON · REMOTE</p>
          </div>
          <div className="border-b border-white/30">
            <SocialRow label="LinkedIn" href="https://www.linkedin.com/in/youcef-bounabi-723740218/" external />
            <SocialRow label="X" href="https://x.com/Youcef0dev" external />
          </div>
          <div className="border-b border-white/30">
            <SocialRow label="Instagram" href="https://www.instagram.com/youcef.builds/" external />
            <SocialRow label="My CV (PDF)" href={CV_PATH} />
            <SocialRow label="Get in Touch" href="#contact" />
          </div>
        </div>
        <div className="flex items-center justify-between pt-8 pb-2 font-manrope text-[12px] text-white/60">
          <span>© 2026 Youcef.dev — Web & AI Studio</span>
          <a href="#services" className="hover:text-white">Back to top ↑</a>
        </div>
      </div>
    </div>
  )
}

function DeliverySpark({ className = 'w-3 h-3' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden>
      <path d="M9.2 1L3 9.2h4.6L6.8 15 13 6.8H8.4L9.2 1z" />
    </svg>
  )
}

/* ============ PRICING — billing switch + animated numbers, Baroque theme ============ */

interface BillingPlan {
  name: string
  description: string
  monthly: number
  yearly: number
  oneTime?: boolean
  popular?: boolean
  isStartingFrom?: boolean
  hasSetup?: boolean
  setupFee?: number
  timeline?: string
  scopeNote?: string
  features: { text: string; icon: ReactNode }[]
  includes: string[]
}

const BILLING_PLANS: BillingPlan[] = [
  {
    name: 'Website Build',
    description: 'A bespoke, conversion-engineered website to turn visitors into booked paying clients.',
    monthly: 290, yearly: 290, oneTime: true,
    timeline: '1 week delivery',
    features: [
      { text: 'Bespoke React / Next.js site', icon: <Globe size={18} /> },
      { text: 'WhatsApp & booking integration', icon: <MessageCircle size={18} /> },
      { text: '95+ Speed & SEO schema', icon: <MapPin size={18} /> },
    ],
    includes: [
      '1–5 page bespoke design & clean React code',
      'Booking system & WhatsApp lead button',
      'Mobile-first & 95+ PageSpeed optimization',
      '1 week delivery guarantee + 2 weeks support',
    ],
  },
  {
    name: 'Website + AI',
    description: 'Bespoke website plus standard 24/7 web & WhatsApp lead bot. Custom multi-channel systems quoted via Contact.',
    monthly: 490, yearly: 490, oneTime: true, popular: true, isStartingFrom: true,
    timeline: '2 weeks delivery',
    scopeNote: 'Base suite from $490 • Custom channels quoted via Contact',
    features: [
      { text: 'Site + WhatsApp AI bot', icon: <Bot size={18} /> },
      { text: 'Lead capture to CRM / Sheets', icon: <Database size={18} /> },
      { text: 'Review booster & SMS nurture', icon: <Star size={18} /> },
    ],
    includes: [
      'Complete bespoke website build (1–5 pages)',
      '24/7 Web & WhatsApp lead qualification bot',
      'Automated lead capture to CRM & Google Sheets',
      '2 weeks delivery guarantee & full handover',
    ],
  },
  {
    name: 'AI Receptionist',
    description: 'An autonomous 24/7 voice agent that answers your business phone, qualifies callers, and books calendar slots.',
    monthly: 49, yearly: 39,
    hasSetup: true,
    setupFee: 390,
    timeline: '5–10 days delivery',
    scopeNote: 'One-time setup ($390) + monthly LiveKit telephony subscription',
    features: [
      { text: 'Answers in <600ms, 24/7', icon: <PhoneCall size={18} /> },
      { text: 'Books to Google / Cal.com', icon: <CalendarCheck size={18} /> },
      { text: 'Instant SMS caller summaries', icon: <Send size={18} /> },
    ],
    includes: [
      'Custom prompt tuning & business knowledge base',
      'LiveKit + Twilio SIP telephony (<600ms latency)',
      'Direct calendar booking & SMS caller summaries',
      '5–10 days launch with end-to-end test calls',
    ],
  },
]

type RevealVariant = 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur'

const REVEAL_FROM: Record<RevealVariant, any> = {
  up: { opacity: 0, y: 36, filter: 'blur(6px)' },
  down: { opacity: 0, y: -36, filter: 'blur(6px)' },
  left: { opacity: 0, x: -48, filter: 'blur(6px)' },
  right: { opacity: 0, x: 48, filter: 'blur(6px)' },
  scale: { opacity: 0, scale: 0.92, y: 18, filter: 'blur(6px)' },
  blur: { opacity: 0, scale: 0.985, filter: 'blur(16px)' },
}

function Reveal({ index = 0, className = '', variant = 'up', children }: { index?: number; className?: string; variant?: RevealVariant; children: ReactNode }) {
  return (
    <motion.div
      initial={REVEAL_FROM[variant]}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: false, amount: 0.35 }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function PricingSwitch({ onSwitch }: { onSwitch: (value: string) => void }) {
  const [selected, setSelected] = useState('0')
  const handleSwitch = (value: string) => { setSelected(value); onSwitch(value) }
  const btn = (value: string, label: ReactNode) => (
    <button
      key={value}
      onClick={() => handleSwitch(value)}
      className={`relative z-10 h-12 cursor-pointer rounded-xl px-4 sm:px-6 py-2 text-sm sm:text-base font-medium transition-colors ${selected === value ? 'text-white' : 'text-[#331507]/55 hover:text-[#331507]'}`}
    >
      {selected === value && (
        <motion.span
          layoutId="billing-switch"
          className="absolute inset-0 rounded-xl bg-[#331507] shadow-lg"
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
      <span className="relative flex items-center gap-2">{label}</span>
    </button>
  )
  return (
    <div className="flex justify-center">
      <div className="relative mx-auto flex w-fit rounded-xl border border-[#331507]/10 bg-[#FFF6E9] p-1">
        {btn('0', 'Monthly Billing')}
        {btn('1', <>Yearly Billing<span className="rounded-full bg-[#F26522]/15 px-2 py-0.5 text-xs font-medium text-[#F26522]">Save 20%</span></>)}
      </div>
    </div>
  )
}

function PricingPlans() {
  const [isYearly, setIsYearly] = useState(false)
  return (
    <div className="mt-10">
      <Reveal index={0} variant="blur">
        <PricingSwitch onSwitch={(v) => setIsYearly(v === '1')} />
      </Reveal>
      <div className="mt-8 grid md:grid-cols-3 gap-5">
        {BILLING_PLANS.map((plan, i) => (
          <Reveal key={plan.name} index={i} variant="scale" className="h-full">
            <div className={`rounded-2xl p-7 h-full flex flex-col justify-between ${plan.popular ? 'bg-[#2B0E02] text-white shadow-[0_24px_60px_rgba(60,10,0,0.35)] ring-2 ring-[#F26522]' : 'bg-[#FFF6E9] text-[#331507]'}`}>
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-italiana text-[28px] leading-none">{plan.name}</h3>
                  {plan.popular && (
                    <span className="shrink-0 bg-[#F26522] text-white px-3 py-1 rounded-full text-[12px] font-medium">Popular</span>
                  )}
                </div>
                <p className={`mt-2 text-[13px] leading-relaxed ${plan.popular ? 'text-white/70' : 'text-[#331507]/65'}`}>{plan.description}</p>
                
                <div className="mt-4 flex flex-col gap-1">
                  <div className="flex items-baseline gap-1">
                    <span className="font-italiana text-[44px] leading-none">$</span>
                    <NumberFlow
                      value={plan.hasSetup ? (isYearly ? plan.yearly : plan.monthly) : plan.monthly}
                      className="font-italiana text-[44px] leading-none"
                    />
                    <span className={`text-[13px] ml-1 ${plan.popular ? 'text-white/60' : 'text-[#331507]/55'}`}>
                      {plan.hasSetup ? (isYearly ? '/mo (billed yearly)' : '/mo') : plan.oneTime ? (plan.isStartingFrom ? 'one-time (base)' : 'one-time') : isYearly ? '/yr' : '/mo'}
                    </span>
                  </div>
                  {plan.hasSetup && (
                    <span className={`text-[12px] font-mono tracking-wide ${plan.popular ? 'text-white/80' : 'text-[#F26522] font-semibold'}`}>
                      + ${plan.setupFee} one-time setup & tuning
                    </span>
                  )}
                  {plan.timeline && (
                    <span className={`text-[11px] font-mono tracking-wider uppercase mt-0.5 flex items-center gap-1.5 ${plan.popular ? 'text-white/70' : 'text-[#331507]/65'}`}>
                      <DeliverySpark className="w-3 h-3 text-[#F26522] shrink-0" />
                      {plan.timeline}
                    </span>
                  )}
                </div>

                <Magnetic className="mt-5 block">
                  <a
                    href="#contact"
                    className={`group rounded-full pl-5 pr-2 py-2 flex items-center justify-between ${plan.popular ? 'bg-[#F26522] text-white' : 'bg-[#331507] text-white'}`}
                  >
                    <span className="text-[13px] font-medium">Choose {plan.name}</span>
                    <span className="w-7 h-7 bg-white rounded-full grid place-items-center">
                      <ArrowUpRight size={14} className="text-[#331507] transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </a>
                </Magnetic>
                <div className="mt-5 grid grid-cols-3 gap-2">
                  {plan.features.map((f) => (
                    <div key={f.text} className={`rounded-xl p-3 text-center ${plan.popular ? 'bg-white/10' : 'bg-[#331507]/5'}`}>
                      <span className={`mx-auto grid w-fit place-items-center ${plan.popular ? 'text-white' : 'text-[#F26522]'}`}>{f.icon}</span>
                      <p className={`mt-2 text-[11px] leading-snug ${plan.popular ? 'text-white/80' : 'text-[#331507]/75'}`}>{f.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`mt-5 pt-5 border-t ${plan.popular ? 'border-white/15' : 'border-[#331507]/10'}`}>
                <p className="text-[13px] font-semibold">{plan.includes[0]}</p>
                <ul className="mt-3 space-y-2">
                  {plan.includes.slice(1).map((f) => (
                    <li key={f} className={`flex items-center gap-2.5 text-[13px] ${plan.popular ? 'text-white/85' : 'text-[#331507]/85'}`}>
                      <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${plan.popular ? 'border-white/40 bg-white text-[#2B0E02]' : 'border-[#F26522] bg-white text-[#F26522]'}`}>
                        <CheckCheck size={12} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

function SectionLabel({ index, children }: { index: string; children: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.6 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-4 mb-8"
    >
      <span className="w-9 h-9 rounded-full border border-white/40 text-white text-[13px] grid place-items-center font-manrope">{index}</span>
      <span className="text-white/80 text-[12px] tracking-[0.28em] uppercase font-manrope">{children}</span>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 h-px bg-white/20 origin-left"
      />
    </motion.div>
  )
}

function LogoZoomTransition({
  imgRef,
  vidRef,
  showVideo,
}: {
  imgRef: React.RefObject<HTMLImageElement | null>
  vidRef: React.RefObject<HTMLVideoElement | null>
  showVideo: boolean
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Phase 1: Text dissolution & blur fade (0.0 to 0.14)
  const textOpacity = useTransform(scrollYProgress, [0, 0.14], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.14], [0, -28])
  const textBlur = useTransform(scrollYProgress, [0, 0.14], [0, 8])
  const textFilter = useMotionTemplate`blur(${textBlur}px)`

  // Hint badge fades right away on initial scroll
  const hintOpacity = useTransform(scrollYProgress, [0, 0.05], [0.85, 0])

  // Phase 2: Vector Camera Dive into the central gap
  // Using native 2000px vector SVG: scale 0.048 = 96px initial, scales up to 1.5 (3000px)
  // Perfectly crisp vector curves at all zoom levels, zero pixelation
  const logoScale = useTransform(
    scrollYProgress,
    [0.04, 0.22, 0.46],
    [0.048, 0.28, 1.5]
  )
  const logoOpacity = useTransform(scrollYProgress, [0.32, 0.46], [1, 0])
  const logoDisplay = useTransform(scrollYProgress, (p) => (p >= 0.46 ? 'none' : 'flex'))

  // Expanding aperture mask on the orange overlay, centered on the gap (50% 51.5%)
  const radiusX = useTransform(
    scrollYProgress,
    [0.04, 0.22, 0.46],
    [7, 120, 2400]
  )
  const radiusY = useTransform(
    scrollYProgress,
    [0.04, 0.22, 0.46],
    [14, 220, 3000]
  )
  const maskGradient = useMotionTemplate`radial-gradient(ellipse ${radiusX}px ${radiusY}px at 50% 51.5%, transparent 75%, black 100%)`

  // Orange overlay dissolves smoothly into the full painting view by 0.46
  const overlayOpacity = useTransform(scrollYProgress, [0.22, 0.46], [1, 0])
  const overlayDisplay = useTransform(scrollYProgress, (p) => (p >= 0.46 ? 'none' : 'block'))

  // Subtle 3D camera parallax on the painting itself
  const paintingScale = useTransform(scrollYProgress, [0.04, 0.46], [1.12, 1.0])

  return (
    <div ref={containerRef} className="relative w-full h-[260vh] bg-[#F26522]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* ============ LAYER 1: THE DESTINATION (REMBRANDT + TRACKING SWARM) ============ */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          <motion.div
            style={{ scale: paintingScale }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              ref={imgRef}
              src={ROMANS_IMG}
              alt="Classical scholars studied by machine vision"
              loading="lazy"
              decoding="async"
              className="w-full h-full block object-cover object-[50%_35%]"
            />
            <div className="absolute inset-0 bg-[#F26522] mix-blend-multiply opacity-25 pointer-events-none" />
            <TrackingSwarm imgRef={imgRef} boxes={BOXES} bias={[0.5, 0.35]} />
            {showVideo && (
              <video
                ref={vidRef}
                autoPlay
                loop
                muted
                playsInline
                onError={() => {}}
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/romans.mp4" type="video/mp4" />
                <source
                  src="https://res.cloudinary.com/daklr2whx/video/upload/v1778602552/track-video_2_s9lp53.mp4"
                  type="video/mp4"
                />
              </video>
            )}
          </motion.div>

          {/* Harmonic dissolve gradient at bottom into FooterWordmark */}
          <div className="absolute bottom-0 left-0 w-full h-[160px] bg-gradient-to-t from-[#F26522] to-transparent z-10 pointer-events-none" />
        </div>

        {/* ============ LAYER 2: THE ORANGE OVERLAY WITH APERTURE HOLE & TYPOGRAPHY ============ */}
        <motion.div
          style={{
            opacity: overlayOpacity,
            display: overlayDisplay,
            maskImage: maskGradient,
            WebkitMaskImage: maskGradient,
          }}
          className="absolute inset-0 bg-[#F26522] z-10 pointer-events-none"
        >
          {/* Base Typography Container */}
          <motion.div
            style={{ opacity: textOpacity, y: textY, filter: textFilter }}
            className="absolute inset-0 flex flex-col items-center justify-center select-none"
          >
            {/* Top text: S.P.D */}
            <div className="absolute top-[calc(50%-72px)] -translate-y-full flex flex-col items-center text-center px-6">
              <span className="font-marck text-white text-[clamp(4.5rem,10vw,8.5rem)] leading-none drop-shadow-sm">
                S.P.D
              </span>
            </div>

            {/* Bottom text: Quote + hint */}
            <div className="absolute top-[calc(50%+64px)] flex flex-col items-center text-center px-6 max-w-[500px]">
              <p className="text-white/90 text-[15px] md:text-[16px] leading-[1.8] font-light">
                Your business should serve your life, not consume it. Let the machines
                handle the heavy lifting — so you can focus on the vision.
              </p>
              <motion.div
                style={{ opacity: hintOpacity }}
                className="mt-6 flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-white/70 bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-sm border border-white/15"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                Scroll to explore
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* ============ LAYER 3: VECTOR LOGO MARK (CRISP NATIVE VECTOR, GUARANTEED 0 RESIDUE) ============ */}
        <motion.div
          style={{
            scale: logoScale,
            opacity: logoOpacity,
            display: logoDisplay,
            transformOrigin: '50% 50%',
          }}
          className="absolute z-20 pointer-events-none flex items-center justify-center drop-shadow-[0_4px_24px_rgba(0,0,0,0.18)]"
        >
          <LogoMark size={2000} />
        </motion.div>
      </div>
    </div>
  )
}

export default function App() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const cloudY = useTransform(scrollYProgress, [0, 1], [0, -140])
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -50])

  const [isLoading, setIsLoading] = useState(true)
  const [isHeroSettled, setIsHeroSettled] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)
  const [showVideo, setShowVideo] = useState(true)
  const [toast, setToast] = useState('')
  const vidRef = useRef<HTMLVideoElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const heroImgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, anchors: true })
    lenisRef.current = lenis
    if (isLoading) {
      lenis.stop()
      window.scrollTo(0, 0)
      document.body.style.overflow = 'hidden'
    }
    let raf = 0
    const loop = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (!lenisRef.current) return
    if (!isLoading) {
      lenisRef.current.start()
      document.body.style.overflow = ''
    }
  }, [isLoading])

  useEffect(() => {
    const t = setTimeout(() => {
      if (vidRef.current && vidRef.current.readyState === 0) setShowVideo(false)
    }, 8000)
    return () => clearTimeout(t)
  }, [])

  const [selectedChannels, setSelectedChannels] = useState<string[]>([])
  const [contactService, setContactService] = useState('Website + AI (Base Package $490 — 2 weeks)')
  const [contactMsg, setContactMsg] = useState('')

  const toggleChannel = (ch: string) => {
    setSelectedChannels((prev) =>
      prev.includes(ch) ? prev.filter((c) => c !== ch) : [...prev, ch]
    )
  }

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (mobileMenuOpen) {
      lenisRef.current?.stop()
      document.body.style.overflow = 'hidden'
    } else if (!isLoading) {
      lenisRef.current?.start()
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen, isLoading])

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false)
    const target = document.getElementById(id)
    if (target) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, { offset: -20, duration: 1.1 })
      } else {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const darkTriggerRef = useRef<HTMLAnchorElement>(null)
  const lastWorkItemRef = useRef<HTMLAnchorElement>(null)
  const stackRef = useRef<HTMLElement>(null)
  const exitTriggerRef = useRef<HTMLDivElement>(null)

  // 1. Enter dark mode: Tuned so it does NOT trigger early on item 06.
  // Stays 100% vibrant orange through item 06, and smoothly transitions to black
  // specifically as you view the last item (Autonomous Lead Engine) right before Capabilities.
  const { scrollYProgress: enterProgress } = useScroll({
    target: lastWorkItemRef,
    offset: ['start 85%', 'end 60%'],
  })

  // 2. Exit dark mode: Keep Capabilities and all tech cards 100% pitch black.
  // The transition back to orange occurs exclusively across the marquee bands at the bottom of Capabilities,
  // so that by the time Section 04 Pricing arrives, it is completely orange.
  const { scrollYProgress: exitProgress } = useScroll({
    target: exitTriggerRef,
    offset: ['start 40%', 'end 10%'],
  })

  // Combined dark factor: 0 (orange) -> 1 (pure black) -> 0 (orange)
  const darkProgress = useTransform(
    [enterProgress, exitProgress],
    (values: number[]) => {
      const enter = values[0] ?? 0
      const exit = values[1] ?? 0
      return Math.max(0, Math.min(1, enter * (1 - exit)))
    }
  )

  const globalThemeBg = useTransform(
    darkProgress,
    [0, 1],
    ['#F26522', '#0B0604']
  )

  const capabilitiesVideoOpacity = useTransform(
    darkProgress,
    [0, 0.35, 1],
    [0, 0.45, 0.95]
  )

  const { scrollYProgress: stackScrollProgress } = useScroll({
    target: stackRef,
    offset: ['start end', 'end start'],
  })
  const leftStatueX = useTransform(stackScrollProgress, [0.10, 0.28, 0.88, 0.99], ['-70%', '0%', '0%', '-70%'])
  const leftStatueOpacity = useTransform(stackScrollProgress, [0.10, 0.24, 0.88, 0.99], [0, 1, 1, 0])

  const rightStatueX = useTransform(stackScrollProgress, [0.10, 0.28, 0.88, 0.99], ['70%', '0%', '0%', '70%'])
  const rightStatueOpacity = useTransform(stackScrollProgress, [0.10, 0.24, 0.88, 0.99], [0, 1, 1, 0])

  useMotionValueEvent(globalThemeBg, 'change', (latest) => {
    if (typeof document !== 'undefined') {
      document.body.style.backgroundColor = latest
    }
  })

  const faqRef = useRef<HTMLElement>(null)
  const { scrollYProgress: faqScrollProgress } = useScroll({
    target: faqRef,
    offset: ['start end', 'end start'],
  })
  const thinkerX = useTransform(faqScrollProgress, [0.22, 0.52, 0.78, 0.98], ['-110%', '0%', '0%', '-110%'])
  const thinkerOpacity = useTransform(faqScrollProgress, [0.22, 0.46, 0.82, 0.98], [0, 0.95, 0.95, 0])
  const thinkerRotate = useTransform(faqScrollProgress, [0.22, 0.52, 0.78, 0.98], [-4, 0, 0, -4])

  const templeX = useTransform(faqScrollProgress, [0.22, 0.52, 0.78, 0.98], ['110%', '0%', '0%', '110%'])
  const templeOpacity = useTransform(faqScrollProgress, [0.22, 0.46, 0.82, 0.98], [0, 0.92, 0.92, 0])
  const templeRotate = useTransform(faqScrollProgress, [0.22, 0.52, 0.78, 0.98], [4, 0, 0, 4])

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const name = String(fd.get('name') || 'friend').split(' ')[0]
    const contact = String(fd.get('contact') || '')
    const service = String(fd.get('service') || contactService)
    const channelsStr = selectedChannels.length ? selectedChannels.join(', ') : 'None specified'
    const msg = String(fd.get('msg') || contactMsg || '')

    setToast(`Sending your inquiry directly to Youcef…`)

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(fd.get('name') || ''),
          contact,
          service,
          channels: channelsStr,
          msg,
        }),
      })

      if (res.ok) {
        setToast(`✓ Thanks ${name}! Your inquiry was delivered directly to Youcef's email. You'll hear back within 24 hours.`)
        setContactMsg('')
        setSelectedChannels([])
        form.reset()
      } else {
        throw new Error('API failed')
      }
    } catch {
      // Graceful fallback to mailto if endpoint is offline
      const subject = encodeURIComponent(`Project Inquiry — ${service}`)
      const fullBody = `Name: ${fd.get('name')}\nContact: ${contact}\nService: ${service}\nChannels: ${channelsStr}\n\nProject Scope & Goals:\n${msg}`
      window.location.href = `mailto:youcefbounabi@gmail.com?subject=${subject}&body=${encodeURIComponent(fullBody)}`
      setToast(`Thanks ${name} — opened your email client to send directly!`)
    }

    setTimeout(() => setToast(''), 7000)
  }

  return (
    <>
      {isLoading && (
        <RenaissancePortalPreloader
          onBurnProgress={(p) => {
            if (p > 0.3) setIsHeroSettled(true)
          }}
          onComplete={() => {
            setIsHeroSettled(true)
            setIsLoading(false)
          }}
        />
      )}
      {/* ================= ELEGANT FLOATING MOBILE HAMBURGER TRIGGER ================= */}
      <div className="fixed top-5 right-5 z-50 md:hidden pointer-events-auto">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          className="w-12 h-12 rounded-full bg-[#0B0604]/85 backdrop-blur-xl border border-white/20 text-white flex flex-col items-center justify-center gap-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.55)] active:scale-95 transition-all duration-300"
        >
          <motion.span
            animate={mobileMenuOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="w-5 h-[1.5px] bg-white rounded-full block origin-center"
          />
          <motion.span
            animate={mobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.18 }}
            className="w-4 h-[1.5px] bg-white/80 rounded-full block origin-center"
          />
          <motion.span
            animate={mobileMenuOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="w-5 h-[1.5px] bg-white rounded-full block origin-center"
          />
        </button>
      </div>

      {/* ================= ELEGANT FULLSCREEN MOBILE DRAWER ================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#0B0604]/96 backdrop-blur-2xl text-white flex flex-col justify-between px-7 pt-20 pb-8 overflow-y-auto md:hidden"
          >
            {/* Ambient warm radial lighting */}
            <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#F26522]/15 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-10 left-0 w-64 h-64 bg-[#F26522]/10 rounded-full blur-[80px] pointer-events-none" />

            {/* Header Info inside drawer */}
            <div className="relative z-10 border-b border-white/10 pb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <LogoMark size={28} />
                <div>
                  <div className="text-[10px] font-mono tracking-[0.25em] text-white/50 uppercase">Atelier &amp; Systems</div>
                  <div className="text-[14px] font-semibold text-white">Youcef.dev</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[10px] tracking-widest text-[#34d399] uppercase font-mono bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
                Available
              </div>
            </div>

            {/* Navigation Links with Roman Numerals and Italiana Serif */}
            <nav className="relative z-10 my-auto py-6 flex flex-col gap-4">
              {[
                { num: '01', title: 'Services', desc: 'Web, AI & Telephony', id: 'services' },
                { num: '02', title: 'The Architect', desc: 'Engineering Practice', id: 'studio' },
                { num: '03', title: 'Selected Work', desc: '7 Flagship Systems', id: 'work' },
                { num: '04', title: 'Capabilities', desc: 'The Tools of the Trade', id: 'capabilities' },
                { num: '05', title: 'Investment', desc: 'Pricing & Retainers', id: 'pricing' },
                { num: '06', title: 'Inquiries & FAQ', desc: 'Questions Answered', id: 'faq' },
              ].map((item, idx) => (
                <motion.button
                  key={item.id}
                  type="button"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -14 }}
                  transition={{ duration: 0.32, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => scrollToSection(item.id)}
                  className="group flex items-baseline justify-between text-left w-full py-2 border-b border-white/5 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-[11px] font-mono tracking-widest text-[#F26522] group-hover:text-white transition-colors">
                      {item.num}
                    </span>
                    <span className="font-italiana text-[28px] sm:text-[32px] text-white/90 group-hover:text-[#F26522] transition-colors">
                      {item.title}
                    </span>
                  </div>
                  <span className="text-[11px] text-white/40 font-light tracking-wider">
                    {item.desc}
                  </span>
                </motion.button>
              ))}
            </nav>

            {/* Drawer Footer Actions */}
            <div className="relative z-10 pt-4 border-t border-white/10 space-y-3.5">
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="w-full py-3.5 px-6 rounded-full bg-[#F26522] hover:bg-[#ff7537] text-white text-[12px] font-semibold tracking-[0.2em] uppercase transition-all shadow-[0_4px_24px_rgba(242,101,34,0.4)] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>Start A Project</span>
                <ArrowUpRight size={15} />
              </button>

              <div className="flex items-center justify-between text-[12px] text-white/60 pt-1">
                <a
                  href="https://wa.me/213560684042"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <MessageCircle size={13} className="text-[#34d399]" />
                  WhatsApp
                </a>
                <a
                  href="mailto:youcefbounabi@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  Email Studio
                </a>
                <a
                  href={CV_PATH}
                  download="Youcef-Bounabi-CV.pdf"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <FileDown size={13} />
                  CV
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div style={{ backgroundColor: globalThemeBg }} className="relative w-full overflow-x-clip transition-colors duration-200">
      {/* ================= HERO — baroque sky, tracking, portfolio serif ================= */}
      <section ref={heroRef} className="relative w-full min-h-[90vh] overflow-x-clip bg-[#F26522] font-manrope">
        <motion.div
          animate={{ scale: [1.05, 1.12, 1.05] }}
          transition={{ duration: 36, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
          style={{ transformOrigin: '50% 30%', y: bgY, willChange: 'transform' }}
        >
          <img
            ref={heroImgRef}
            src={HERO_IMG}
            alt="Baroque celestial fresco studied by machine vision"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full block object-cover object-[50%_28%]"
          />
        </motion.div>
        <div className="absolute inset-0 z-[1] bg-[#F26522] mix-blend-multiply opacity-20 pointer-events-none" />
        <TrackingSwarm imgRef={heroImgRef} boxes={HERO_BOXES} bias={[0.5, 0.28]} pairs={[[0, 2], [1, 2], [3, 4]]} />
        {/* readability scrims — keep tracking boxes behind text, darken bright clouds */}
        <div className="absolute inset-0 z-[5] bg-gradient-to-b from-black/40 via-transparent to-black/55 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-[85%] z-[5] bg-gradient-to-t from-black/70 via-black/25 to-transparent pointer-events-none" />

        <div className="relative z-30 min-h-[90vh] flex flex-col px-6 md:px-12 pt-6">
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: isHeroSettled ? 1 : 0, y: isHeroSettled ? 0 : -24 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-start justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <LogoMark size={44} />
              <p className="text-white text-[13px] leading-[1.5]">
                Youcef.dev
                <br />
                Web & AI Studio. London · Remote.
                <br />
                Taking projects now.
              </p>
            </div>
            <nav className="hidden md:flex items-center gap-7 text-white/85 text-[12px] tracking-[0.2em]">
              <a href="#services" className="hover:text-white transition-colors">SERVICES</a>
              <a href="#work" className="hover:text-white transition-colors">WORK</a>
              <a href="#stack" className="hover:text-white transition-colors">STACK</a>
              <a href="#pricing" className="hover:text-white transition-colors">PRICING</a>
              <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            </nav>
            <div className="hidden sm:block">
              <Magnetic>
                <a
                  href="#contact"
                  className="shrink-0 rounded-full border border-white/70 text-white text-[12px] tracking-[0.2em] px-7 py-3 hover:bg-white hover:text-[#F26522] transition-colors duration-500 inline-block"
                >
                  START A PROJECT
                </a>
              </Magnetic>
            </div>
          </motion.div>

          <div className="flex-1 flex flex-col justify-center items-center text-center py-16 sm:py-24 md:py-28 z-20">
            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: isHeroSettled ? 1 : 0, y: isHeroSettled ? 0 : 36 }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-italiana text-white leading-[1.03] text-[clamp(2.6rem,7vw,6.4rem)] max-w-[1100px] mx-auto [text-shadow:0_4px_40px_rgba(0,0,0,0.92),0_2px_14px_rgba(0,0,0,0.8)] select-none"
            >
              Websites &amp; AI Systems
              <br />
              That Win Clients On Autopilot.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: isHeroSettled ? 1 : 0, y: isHeroSettled ? 0 : 24 }}
              transition={{ duration: 0.85, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 sm:mt-8 text-white/85 font-light text-[15px] sm:text-[18px] md:text-[21px] max-w-[700px] mx-auto leading-relaxed [text-shadow:0_2px_12px_rgba(0,0,0,0.85)]"
            >
              Bespoke Next.js platforms, conversion funnels &amp; 24/7 autonomous telephony voice agents built with old-school care.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHeroSettled ? 1 : 0, y: isHeroSettled ? 0 : 20 }}
              transition={{ duration: 0.85, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 sm:mt-11 flex flex-wrap items-center justify-center gap-4"
            >
              <Magnetic>
                <a
                  href="#contact"
                  className="rounded-full bg-white text-[#331507] hover:bg-[#FFF6E9] text-[11px] sm:text-[12px] font-semibold tracking-[0.18em] uppercase px-7 sm:px-8 py-3 sm:py-3.5 transition-all duration-300 shadow-[0_12px_36px_rgba(0,0,0,0.45)] hover:scale-105 inline-block"
                >
                  Start A Project
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#capabilities"
                  onClick={(e) => {
                    e.preventDefault()
                    const target = document.getElementById('capabilities')
                    if (target) {
                      if (lenisRef.current) {
                        lenisRef.current.scrollTo(target, { offset: -30, duration: 1.2 })
                      } else {
                        target.scrollIntoView({ behavior: 'smooth' })
                      }
                    }
                  }}
                  className="rounded-full border border-white/40 bg-black/30 hover:bg-white/15 text-white text-[11px] sm:text-[12px] font-medium tracking-[0.18em] uppercase px-6 sm:px-7 py-3 sm:py-3.5 transition-all duration-300 backdrop-blur-sm inline-block cursor-pointer"
                >
                  Explore Capabilities ↓
                </a>
              </Magnetic>
            </motion.div>
          </div>
        </div>

        <CloudTransition cloudY={cloudY} />
      </section>

      {/* ================= MANIFESTO & THE ARCHITECT — classical sculpture & kinetic narrative ================= */}
      <section className="relative w-full bg-[#F26522] font-manrope overflow-hidden py-24 sm:py-36">
        <DaVinciSectionWatermark variant="studio" />
        <div className="relative z-10 max-w-[1240px] mx-auto px-6 md:px-12">
          {/* Eyebrow & Title */}
          <div className="text-center mb-12 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center gap-3.5 mb-6 select-none"
            >
              <span className="w-10 sm:w-16 h-px bg-white/35" />
              <span className="text-[11px] sm:text-[12px] font-mono tracking-[0.32em] uppercase text-white/80">
                The Studio
              </span>
              <span className="w-10 sm:w-16 h-px bg-white/35" />
            </motion.div>

            <h2 className="font-italiana text-white leading-[1.02] text-[clamp(2.8rem,7vw,5.6rem)] select-none">
              {['Old', 'souls,', 'new', 'machines.'].map((w, i) => (
                <span key={w} className="inline-block overflow-hidden mr-3 sm:mr-4 align-bottom pb-1.5">
                  <motion.span
                    initial={{ y: '115%', rotate: 3, opacity: 0 }}
                    whileInView={{ y: '0%', rotate: 0, opacity: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.85, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block origin-bottom-left"
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </h2>
          </div>

          {/* 2-Column Gallery Layout: Portrait on Left, Architect Bio & Kinetic Narrative on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Youcef Portrait emerging directly from the orange surface */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 28 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-[280px] sm:w-[330px] md:w-[380px] lg:w-[410px] xl:w-[440px]"
              >
                {/* Ambient warm radial glow blooming into #F26522 */}
                <div aria-hidden className="absolute inset-0 grid place-items-center pointer-events-none">
                  <div className="w-[300px] sm:w-[360px] md:w-[420px] h-[300px] sm:h-[360px] md:h-[420px] rounded-full bg-gradient-to-tr from-[#FF2E00]/25 via-[#FFA500]/20 to-white/10 blur-[60px] sm:blur-[85px]" />
                </div>

                {/* Intentional Da Vinci Drafting Halo & Sacred Geometry Construction */}
                <DaVinciPortraitHalo />

                <motion.img
                  src={YOUCEF_CUTOUT}
                  alt="Youcef Bounabi — Creative Engineer & AI Architect"
                  loading="lazy"
                  decoding="async"
                  animate={{ y: [0, -8, 0], rotate: [0, 0.4, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative w-full h-auto object-contain select-none drop-shadow-[0_24px_50px_rgba(0,0,0,0.35)]"
                  style={{
                    filter: 'contrast(1.04) brightness(1.01)',
                    maskImage: 'linear-gradient(to right, black 0%, black 80%, rgba(0,0,0,0.6) 90%, transparent 98%), linear-gradient(to bottom, black 0%, black 82%, transparent 98%)',
                    WebkitMaskImage: 'linear-gradient(to right, black 0%, black 80%, rgba(0,0,0,0.6) 90%, transparent 98%), linear-gradient(to bottom, black 0%, black 82%, transparent 98%)',
                    maskComposite: 'intersect',
                    WebkitMaskComposite: 'destination-in',
                  }}
                />
              </motion.div>
            </div>

            {/* Right: Narrative & Manifesto */}
            <div className="lg:col-span-7 text-left">
              {/* Name & Title + CV button */}
              <motion.div
                initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap items-center gap-3 sm:gap-4"
              >
                <h3 className="text-white text-[22px] sm:text-[27px] md:text-[32px] font-bold tracking-tight">
                  I&apos;m Youcef <span className="font-italiana font-normal italic text-[#FFF1E8] text-[22px] sm:text-[28px] md:text-[33px]">— Creative Engineer &amp; AI Architect</span>
                </h3>
                <Magnetic>
                  <a
                    href={CV_PATH}
                    download="Youcef-Bounabi-CV.pdf"
                    className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/10 hover:bg-white hover:text-[#F26522] text-white text-[12px] sm:text-[13px] font-medium tracking-[0.16em] px-5 py-2 transition-all duration-300 backdrop-blur-sm shadow-[0_4px_14px_rgba(0,0,0,0.12)]"
                  >
                    <FileDown size={14} /> MY CV
                  </a>
                </Magnetic>
              </motion.div>

              {/* Narrative Paragraph — Kinetic Cascading Word-by-Word Animation */}
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.018,
                      delayChildren: 0.08,
                    },
                  },
                }}
                className="mt-8 text-[19px] sm:text-[23px] md:text-[26px] lg:text-[28px] leading-[1.65] select-none font-light"
              >
                {STUDIO_WORDS.map((item, i) => (
                  <motion.span
                    key={`${item.text}-${i}`}
                    variants={{
                      hidden: { opacity: 0, y: 20, filter: 'blur(6px)', scale: 0.95 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                        scale: 1,
                        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                      },
                    }}
                    className={`inline-block mr-[0.28em] will-change-[transform,opacity,filter] ${item.bold ? 'text-white font-semibold' : 'text-white/95 font-light'}`}
                  >
                    {item.text}
                  </motion.span>
                ))}
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section id="services" className="relative w-full bg-[#F26522] font-manrope">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-20">
          <SectionLabel index="01">Services</SectionLabel>
          <div className="relative">
            {SERVICES.map((s, i) => (
              <div key={s.title} className="sticky" style={{ top: `${112 + i * 18}px` }}>
              <motion.div
                initial={{ opacity: 0, y: 32, x: i % 2 === 0 ? -28 : 28, rotate: i % 2 === 0 ? -1 : 1 }}
                whileInView={{ opacity: 1, y: 0, x: 0, rotate: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl bg-[#FFF6E9] text-[#331507] p-7 md:p-9 mb-6 flex flex-col min-h-[380px] shadow-[0_24px_60px_rgba(60,10,0,0.25)]"
              >
              <Tilt className="flex flex-col flex-1">
                <div className="flex items-center justify-between">
                  <span className="w-11 h-11 rounded-full bg-[#331507] text-[#FFF6E9] grid place-items-center">
                    <s.icon size={19} />
                  </span>
                  <span className="font-italiana text-[22px] text-[#331507]/40">{s.no}</span>
                </div>
                <h3 className="mt-5 font-italiana text-[30px] leading-none">{s.title}</h3>
                <p className="mt-2 text-[14px] text-[#331507]/70 leading-relaxed">{s.desc}</p>
                <ul className="mt-5 space-y-2.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-[13px] text-[#331507]/85">
                      <span className="mt-0.5 w-[18px] h-[18px] rounded-full bg-[#F26522]/10 text-[#F26522] grid place-items-center shrink-0">
                        <Check size={11} strokeWidth={3} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <div className="pt-4 border-t border-[#331507]/10 text-[13px] text-[#331507]/60">{s.price} — fixed quote upfront</div>
                </div>
              </Tilt>
              </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WorkList
        triggerRef={darkTriggerRef}
        lastItemRef={lastWorkItemRef}
        globalThemeBg={globalThemeBg}
      />

      {/* ================= STACK / CAPABILITIES — dynamic dark theme ================= */}
      <motion.section
        ref={stackRef}
        id="capabilities"
        style={{ backgroundColor: globalThemeBg }}
        className="relative w-full font-manrope"
      >
          <span id="stack" className="sr-only" />
          <DaVinciSectionWatermark variant="capabilities" />

          {/* Soft editorial gradient blend from orange to black */}
          <div className="absolute -top-24 inset-x-0 h-24 bg-gradient-to-b from-transparent to-[#0B0604] pointer-events-none z-10" />

          {/* Classical Sculptural Battle Artwork — Left & Right Classical Soldiers Flanking the Section */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="sticky top-0 h-[100dvh] md:h-screen w-full overflow-hidden flex items-center justify-between pointer-events-none will-change-transform">
              {/* Left Marble Warrior — Slides in/out on Scroll with Floating Organic Breath (Desktop only) */}
              <motion.div
                aria-hidden
                style={{
                  x: leftStatueX,
                  opacity: leftStatueOpacity,
                }}
                className="absolute left-0 top-0 bottom-0 pointer-events-none select-none will-change-transform z-0 h-full w-[45vw] max-w-[620px] hidden md:flex items-center"
              >
                <motion.img
                  src="/statue-left.webp"
                  alt=""
                  loading="eager"
                  decoding="async"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-full max-h-[94vh] object-contain object-left select-none filter brightness-[0.98] contrast-[1.03] drop-shadow-[0_24px_50px_rgba(0,0,0,0.85)]"
                  style={{
                    maskImage: 'linear-gradient(to bottom, black 80%, transparent 98%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 98%)',
                  }}
                />
              </motion.div>

              {/* Right Marble Heroes — Restored Flawless Neoclassical Sculpture Pushed Down to AI & Voice Automations level */}
              <motion.div
                aria-hidden
                style={{
                  x: rightStatueX,
                  opacity: rightStatueOpacity,
                }}
                className="absolute right-0 top-0 bottom-0 pointer-events-none select-none will-change-transform z-0 h-full w-[65vw] sm:w-[50vw] md:w-[48vw] max-w-[340px] sm:max-w-[480px] md:max-w-[660px] opacity-45 sm:opacity-85 md:opacity-100 flex items-end justify-end pb-6 sm:pb-10 md:pb-14"
              >
                <motion.img
                  src="/statue-right.webp"
                  alt=""
                  loading="eager"
                  decoding="async"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-full max-h-[82vh] sm:max-h-[86vh] md:max-h-[90vh] object-contain object-right-bottom select-none filter brightness-[0.98] contrast-[1.03] drop-shadow-[0_24px_50px_rgba(0,0,0,0.85)]"
                  style={{
                    maskImage: 'linear-gradient(to bottom, black 84%, transparent 99%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 84%, transparent 99%)',
                  }}
                />
              </motion.div>

              {/* Ambient gradients to softly transition top/bottom into adjacent sections */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0B0604] via-transparent to-[#0B0604] opacity-35 md:opacity-60 pointer-events-none" />
              <div className="absolute inset-0 bg-[#0B0604]/20 pointer-events-none" />
            </div>
          </div>

          <div className="relative z-10 max-w-[880px] lg:max-w-[920px] mx-auto px-6 md:px-12 pt-20 sm:pt-28 pb-6 sm:pb-8">
            <SectionLabel index="03">Capabilities</SectionLabel>

            <div className="mb-10 sm:mb-14">
              <motion.h2
                initial={{ opacity: 0, x: -32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-italiana text-white leading-[1.05] text-[clamp(2.4rem,5.5vw,4.2rem)] max-w-[700px]"
              >
                The tools of the trade.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="mt-3 text-white/70 text-[14px] sm:text-[15px] font-light max-w-[580px] leading-relaxed"
              >
                Production-grade frameworks, resilient backend architectures, and autonomous AI pipelines engineered for relentless speed and uptime.
              </motion.p>
            </div>

            <div className="grid gap-6">
              {STACK_GROUPS.map((g, gi) => (
                <motion.div
                  key={g.label}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ duration: 0.7, delay: gi * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl border border-white/20 bg-black/45 backdrop-blur-md p-7 sm:p-8 overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                >
                  <Tilt className="relative">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-white/80 text-[12px] sm:text-[13px] tracking-[0.28em] uppercase font-mono">{g.label}</p>
                      <span className="w-10 h-10 rounded-full border border-white/30 text-white grid place-items-center shrink-0 bg-white/5">
                        <g.icon size={17} />
                      </span>
                    </div>
                    <Magnetic strength={0.06} className="block">
                      <div className="mt-6 flex flex-wrap gap-2.5 sm:gap-3">
                        {g.items.map((item, ii) => (
                          <motion.span
                            key={item}
                            initial={{ opacity: 0, y: 14, scale: 0.92 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: false, amount: 0.5 }}
                            transition={{ duration: 0.45, delay: Math.min(ii * 0.03, 0.25) }}
                            whileHover={{ scale: 1.08, y: -2 }}
                            className="cursor-default text-white text-[13px] sm:text-[14px] border border-white/30 rounded-full px-4 sm:px-5 py-2 hover:bg-white hover:text-[#331507] hover:border-white transition-all duration-300 backdrop-blur-sm bg-black/20"
                          >
                            {item}
                          </motion.span>
                        ))}
                      </div>
                    </Magnetic>
                  </Tilt>
                  <span aria-hidden className="pointer-events-none absolute -bottom-8 -right-4 text-white/[0.06] select-none">
                    <g.icon size={130} strokeWidth={1} />
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* marquee band — exit transition trigger zone into Pricing */}
          <div ref={exitTriggerRef} className="relative z-10 select-none pointer-events-none">
            <div className="border-y border-white/25 overflow-x-clip py-5 mb-4 select-none pointer-events-none">
              <motion.div
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
                className="flex w-max items-center gap-8 pr-8 will-change-transform select-none pointer-events-none"
              >
                {[...MARQUEE, ...MARQUEE].map((m, i) => (
                  <span key={i} className="flex items-center gap-8 font-italiana text-white/90 text-[26px] whitespace-nowrap select-none pointer-events-none">
                    {m} <span className="text-white/50 text-[16px]">✦</span>
                  </span>
                ))}
              </motion.div>
            </div>

            {/* reverse outline marquee */}
            <div className="border-b border-white/25 overflow-x-clip py-4 -rotate-1 pb-10 select-none pointer-events-none">
              <motion.div
                animate={{ x: ['-50%', '0%'] }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                className="flex w-max items-center gap-8 pr-8 will-change-transform select-none pointer-events-none"
              >
                {[...MARQUEE, ...MARQUEE].map((m, i) => (
                  <span key={i} className="flex items-center gap-8 font-italiana text-transparent text-[22px] whitespace-nowrap select-none pointer-events-none" style={{ WebkitTextStroke: '1px rgba(255,246,233,0.55)' }}>
                    {m} <span className="text-white/40 text-[14px]">✦</span>
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.section>

      {/* ================= PRICING ================= */}
      <motion.section
        id="pricing"
        style={{ backgroundColor: globalThemeBg }}
        className="relative w-full font-manrope transition-colors duration-300"
      >
        <DaVinciSectionWatermark variant="pricing" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 py-20">
          <SectionLabel index="04">Pricing</SectionLabel>
          <FillCta />
          <PricingPlans />
        </div>
      </motion.section>

      {/* ================= FAQ / ASK A QUESTION ================= */}
      <section ref={faqRef} id="faq" className="relative w-full overflow-hidden bg-gradient-to-b from-[#F26522] via-[#B53E0B] to-[#F26522] font-manrope">
        {/* side thinker — white marble statue, slides in from left on scroll (Visible on mobile & desktop) */}
        <motion.div
          aria-hidden
          style={{ x: thinkerX, opacity: thinkerOpacity, rotate: thinkerRotate }}
          className="pointer-events-none absolute -left-4 bottom-0 z-[5] block h-[48%] w-[160px] sm:h-[65%] sm:w-[220px] md:h-[70%] md:w-[220px] lg:h-[85%] lg:w-[260px] xl:w-[400px] opacity-50 sm:opacity-85 md:opacity-95 will-change-transform"
        >
          <motion.img
            src={`${FAQ_THINKER}?v=2`}
            alt=""
            loading="lazy"
            decoding="async"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            className="h-full w-full object-contain object-bottom opacity-95 mix-blend-multiply"
            style={{ maskImage: 'linear-gradient(to right, black 60%, transparent 97%)', WebkitMaskImage: 'linear-gradient(to right, black 60%, transparent 97%)', filter: 'sepia(0.18) saturate(1.1) brightness(0.97) contrast(1) drop-shadow(0 24px 40px rgba(0,0,0,0.35))' }}
          />
        </motion.div>
        {/* side guardian — temple right; slides in from right on scroll */}
        <motion.div
          aria-hidden
          style={{ x: templeX, opacity: templeOpacity, rotate: templeRotate }}
          className="pointer-events-none absolute -right-2 bottom-0 z-[5] hidden md:block h-[68%] w-[190px] lg:w-[260px] xl:w-[320px] will-change-transform"
        >
          <motion.img
            src={FAQ_TEMPLE}
            alt=""
            loading="lazy"
            decoding="async"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
            className="h-full w-full object-contain object-bottom opacity-90 mix-blend-multiply"
            style={{
              maskImage: 'linear-gradient(to left, black 55%, transparent 96%)',
              WebkitMaskImage: 'linear-gradient(to left, black 55%, transparent 96%)',
              filter: 'sepia(0.55) saturate(2.4) hue-rotate(-12deg) brightness(0.96) contrast(1.05) drop-shadow(0 20px 40px rgba(0,0,0,0.35))',
            }}
          />
        </motion.div>
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 pb-20">
          <SectionLabel index="05">FAQ — Ask a question</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-italiana text-white leading-[1.05] text-[clamp(2rem,5vw,3.6rem)] max-w-[700px]"
          >
            Questions? Answered.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: 48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/70 text-[15px] leading-[1.8] max-w-[560px] mt-4 font-light"
          >
            Delivery, pricing, ownership, and how the AI receptionist behaves — the short version.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, filter: 'blur(14px)', y: 20 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-10"
          >
            <FaqAccordion />
          </motion.div>
          <p className="text-center text-white/60 text-[14px] mt-8">
            Still unsure?{' '}
            <a href="#contact" className="text-white font-semibold underline underline-offset-4 hover:text-[#2B0E02] transition-colors">
              Ask directly →
            </a>
          </p>
        </div>
      </section>

      {/* ================= CONTACT / GET IN TOUCH ================= */}
      <section id="contact" className="relative w-full bg-[#F26522] font-manrope">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 pb-20">
          <SectionLabel index="06">Contact — Get in touch</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-italiana text-white leading-[1.05] text-[clamp(2rem,5vw,3.6rem)] max-w-[700px]"
          >
            Let’s build something that makes you money.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: 48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/70 text-[15px] leading-[1.8] max-w-[560px] mt-4 font-light"
          >
            Tell me about your project. I reply within 24 hours.
          </motion.p>

          <div className="mt-10 grid lg:grid-cols-2 gap-5">
            <motion.form
              onSubmit={submit}
              initial={{ opacity: 0, x: -48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#FFF6E9] rounded-2xl p-6 sm:p-8 space-y-4 text-[#331507]"
            >
              <div>
                <label className="text-[12px] font-semibold">Your name</label>
                <input name="name" required placeholder="e.g. Sara Benali" className="mt-1.5 w-full bg-white border border-[#331507]/15 rounded-xl px-4 py-3 text-[14px] outline-none focus:border-[#F26522]" />
              </div>
              <div>
                <label className="text-[12px] font-semibold">Email or WhatsApp</label>
                <input name="contact" required placeholder="you@email.com" className="mt-1.5 w-full bg-white border border-[#331507]/15 rounded-xl px-4 py-3 text-[14px] outline-none focus:border-[#F26522]" />
              </div>
              <div>
                <label className="text-[12px] font-semibold">I&apos;m interested in</label>
                <select
                  name="service"
                  value={contactService}
                  onChange={(e) => setContactService(e.target.value)}
                  className="mt-1.5 w-full bg-white border border-[#331507]/15 rounded-xl px-4 py-3 text-[14px] outline-none focus:border-[#F26522]"
                >
                  <option value="Website Build ($290 — 1 week)">Website Build ($290 · 1 week delivery)</option>
                  <option value="Website + AI (Base Package $490 — 2 weeks)">Website + AI (Base Package $490 · 2 weeks)</option>
                  <option value="Custom Omnichannel AI (WhatsApp + IG + Gmail)">Custom Omnichannel AI (WhatsApp + IG + Gmail + CRM)</option>
                  <option value="AI Receptionist ($390 setup + $49/mo)">AI Voice Receptionist ($390 setup + $49/mo)</option>
                  <option value="Full Web App & AI Platform">Full Web App & AI Platform</option>
                  <option value="General Inquiry / Other">General Inquiry / Other</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="text-[12px] font-semibold">Target Channels / Features (optional)</label>
                  <span className="text-[11px] text-[#331507]/55 font-normal">Tap to tag</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {[
                    'WhatsApp Bot',
                    'Instagram DMs',
                    'Gmail Triage',
                    'Google Calendar',
                    'CRM / Notion Sync',
                    'AI Voice Phone',
                  ].map((ch) => {
                    const active = selectedChannels.includes(ch)
                    return (
                      <button
                        type="button"
                        key={ch}
                        onClick={() => toggleChannel(ch)}
                        className={`text-[11px] px-3 py-1 rounded-full border transition-all cursor-pointer ${
                          active
                            ? 'bg-[#F26522] text-white border-[#F26522] font-medium shadow-sm'
                            : 'bg-white/70 text-[#331507]/75 border-[#331507]/15 hover:border-[#331507]/40 hover:bg-white'
                        }`}
                      >
                        {active ? `✓ ${ch}` : `+ ${ch}`}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="text-[12px] font-semibold">Project details & goals</label>
                <textarea
                  name="msg"
                  rows={4}
                  value={contactMsg}
                  onChange={(e) => setContactMsg(e.target.value)}
                  placeholder="What does your business do, and what specific results or systems are you aiming to build?"
                  className="mt-1.5 w-full bg-white border border-[#331507]/15 rounded-xl px-4 py-3 text-[14px] outline-none focus:border-[#F26522]"
                />
              </div>

              <div className="pt-2 space-y-2.5">
                <Magnetic className="block">
                  <button
                    type="submit"
                    className="group w-full bg-[#331507] text-white rounded-full pl-5 pr-2 py-2.5 flex items-center justify-between hover:bg-[#2B0E02] transition-colors"
                  >
                    <span className="text-[13px] font-medium pl-1">Send inquiry via Email</span>
                    <span className="w-8 h-8 bg-white rounded-full grid place-items-center">
                      <Send size={14} className="text-[#331507]" />
                    </span>
                  </button>
                </Magnetic>
                <a
                  href={`https://wa.me/213560684042?text=${encodeURIComponent(
                    `Hi Youcef! I'm interested in: ${contactService}${
                      selectedChannels.length ? `\nChannels: ${selectedChannels.join(', ')}` : ''
                    }${contactMsg ? `\nDetails: ${contactMsg}` : ''}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#25D366]/15 text-[#0d7348] hover:bg-[#25D366]/25 border border-[#25D366]/30 rounded-full py-2.5 px-4 flex items-center justify-center gap-2 text-[13px] font-semibold transition-colors"
                >
                  <MessageCircle size={15} /> Or Send Instantly via WhatsApp
                </a>
              </div>
              {toast && <div className="text-[13px] font-medium text-green-800 bg-green-50 border border-green-200 rounded-xl px-4 py-3">{toast}</div>}
            </motion.form>
            <motion.div
              initial={{ opacity: 0, x: 48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5"
            >
              <div className="rounded-2xl border border-white/25 p-6">
                <div className="text-[13px] text-white/70">Email</div>
                <a href="mailto:youcefbounabi@gmail.com" className="text-white text-[18px] font-semibold">youcefbounabi@gmail.com</a>
              </div>
              <div className="rounded-2xl border border-white/25 p-6">
                <div className="text-[13px] text-white/70">WhatsApp</div>
                <a href="https://wa.me/213560684042" target="_blank" rel="noreferrer" className="text-white text-[18px] font-semibold hover:text-[#FFF6E9]/80 transition-colors">+213 560 68 40 42</a>
                <div className="text-[12px] text-white/50 mt-1">Tap to chat — replies within 24 hours</div>
              </div>
              <a
                href={CV_PATH}
                download="Youcef-Bounabi-CV.pdf"
                className="group rounded-2xl bg-[#FFF6E9] text-[#331507] p-6 flex items-center justify-between gap-4 hover:bg-white transition-colors"
              >
                <span>
                  <span className="text-[13px] text-[#331507]/60">Prefer to skim? Grab</span>
                  <span className="block text-[18px] font-semibold">My CV — download PDF</span>
                  <span className="block text-[12px] text-[#331507]/55 mt-1">Full-stack • C# / .NET • AI automation</span>
                </span>
                <span className="w-11 h-11 shrink-0 rounded-full bg-[#331507] text-white grid place-items-center transition-transform duration-300 group-hover:translate-y-0.5">
                  <FileDown size={18} />
                </span>
              </a>
              <div className="rounded-2xl bg-[#2B0E02] text-white p-6">
                <div className="font-italiana text-[24px]">Direct & fast.</div>
                <p className="text-[13px] text-white/70 mt-2 leading-relaxed">Clear fixed quote. Loom video updates. Two weeks of free fixes after launch. EN / FR / AR.</p>
              </div>
              <div className="flex items-center justify-between text-[12px] text-white/50 px-1">
                <span>© 2026 Youcef.dev</span>
                <a href="#services" className="hover:text-white">Back to top ↑</a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER — Zoom Transition into Rembrandt + Footer Wordmark ================= */}
      <section className="relative w-full bg-[#F26522] flex flex-col font-manrope">
        <LogoZoomTransition imgRef={imgRef} vidRef={vidRef} showVideo={showVideo} />
        <FooterWordmark />
      </section>
    </motion.div>
    </>
  )
}
