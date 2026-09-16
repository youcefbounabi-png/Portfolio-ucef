import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Sparkles } from 'lucide-react'

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Discovery',
    desc: 'Understanding your goals, audience, and constraints before touching a single pixel.',
  },
  {
    num: '02',
    title: 'Concept & Design',
    desc: 'Visual direction, interaction design, and prototyping. You see it before I build it.',
  },
  {
    num: '03',
    title: 'Development',
    desc: 'Pixel-perfect implementation with performance and attention to detail built in.',
  },
  {
    num: '04',
    title: 'Launch & Beyond',
    desc: 'Deployment, testing, and support. I don\'t disappear after the handoff.',
  },
]

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  })

  // The star moves from top to bottom of the line
  const starY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section 
      ref={containerRef}
      id="process"
      className="relative w-full font-manrope pt-20 pb-40 overflow-hidden"
    >
      {/* Background Starry/Dust Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[20%] left-[10%] w-[2px] h-[2px] bg-[#F26522] rounded-full shadow-[0_0_10px_2px_#F26522]" />
        <div className="absolute top-[40%] right-[20%] w-[1.5px] h-[1.5px] bg-white rounded-full opacity-60" />
        <div className="absolute top-[60%] left-[30%] w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_5px_1px_white] opacity-30" />
        <div className="absolute top-[80%] right-[15%] w-[3px] h-[3px] bg-[#F26522] rounded-full shadow-[0_0_12px_3px_#F26522] opacity-80" />
        <div className="absolute top-[10%] right-[40%] w-[1px] h-[1px] bg-white rounded-full opacity-40" />
      </div>

      {/* Ambient Orange Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#F26522]/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-16 md:gap-0">
        
        {/* Left Column: Heading & CTA */}
        <div className="w-full md:w-[45%] flex flex-col items-center md:items-end text-center md:text-right md:pr-16 lg:pr-24 pt-10 md:pt-32">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.7 }}
            className="font-italiana text-white text-[3.5rem] sm:text-[4rem] lg:text-[5rem] leading-[1.05]"
          >
            A process built around clarity and craft.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-8 text-white/70 text-[14px] sm:text-[15px] font-light max-w-[320px] leading-relaxed"
          >
            No surprises, no handoff chaos. Just a clear path from the first conversation to a product that works.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-10"
          >
            <a 
              href="#pricing"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-white/20 text-white/90 text-[13px] tracking-wide hover:bg-white hover:text-[#0B0604] transition-colors duration-300 backdrop-blur-sm"
            >
              Let's build something
            </a>
          </motion.div>
        </div>

        {/* Central Divider & Star */}
        <div className="hidden md:flex relative w-[2px] bg-gradient-to-b from-transparent via-white/10 to-transparent flex-shrink-0">
          <motion.div 
            style={{ top: starY }}
            className="absolute left-1/2 -translate-x-1/2 w-10 h-10 -mt-5 flex items-center justify-center text-[#F26522] drop-shadow-[0_0_15px_rgba(242,101,34,0.8)]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
              <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" />
            </svg>
          </motion.div>
        </div>

        {/* Right Column: Steps */}
        <div className="w-full md:w-[55%] flex flex-col gap-16 sm:gap-24 md:pl-16 lg:pl-24 pt-10 md:pt-32">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div 
              key={step.num}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.5, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="relative group"
            >
              {/* Mobile Star Indicator (hidden on desktop since it has the center line) */}
              <div className="absolute -left-8 top-1 md:hidden text-[#F26522] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 drop-shadow-[0_0_10px_rgba(242,101,34,0.8)]">
                  <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" />
                </svg>
              </div>

              <span className="text-white/30 text-[13px] font-mono tracking-widest">{step.num}</span>
              <h3 className="mt-3 font-italiana text-white/90 text-[2.5rem] sm:text-[3rem] leading-none transition-colors duration-500 group-hover:text-white group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                {step.title}
              </h3>
              <p className="mt-4 text-white/50 text-[14px] sm:text-[15px] font-light max-w-[340px] leading-relaxed transition-colors duration-500 group-hover:text-white/80">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
