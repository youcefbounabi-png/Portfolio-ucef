import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

/**
 * EditorialTransitionWorkToCapabilities
 * Monumental Act II Chapter Transition: Leaving the Atelier, Entering the Dark Forge.
 * Features an architectural vaulted portal, Roman numeral typography, and coordinate crosshairs.
 */
export function EditorialTransitionWorkToCapabilities() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Smooth editorial parallax layers
  const titleY = useTransform(scrollYProgress, [0.1, 0.7], [50, -25])
  const portalY = useTransform(scrollYProgress, [0, 1], [30, -30])
  const romanOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.1, 0.25, 0.05])

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden select-none bg-gradient-to-b from-[#F26522] via-[#B83E08] to-[#0B0604]"
    >
      {/* Editorial Chapter Prologue */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-6 md:px-12 pt-28 pb-16 text-center">
        {/* Roman Numeral Monograph Watermark in background */}
        <motion.div
          style={{ opacity: romanOpacity }}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-italiana text-white text-[clamp(9rem,24vw,22rem)] leading-none select-none"
        >
          II
        </motion.div>

        <motion.div
          style={{ y: titleY }}
          className="relative z-10 flex flex-col items-center"
        >
          {/* Act Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/[0.08] px-5 py-2 text-white/90 text-[11px] sm:text-[12px] tracking-[0.3em] uppercase backdrop-blur-md mb-5 shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>Act II</span>
            <span className="text-white/40">✦</span>
            <span>The Forge &amp; The Arsenal</span>
          </div>

          {/* Monumental Chapter Heading */}
          <h3 className="font-italiana text-white leading-[1.05] text-[clamp(2.4rem,6.5vw,5rem)] max-w-[850px] tracking-tight">
            Where classical form yields to dark machine intelligence.
          </h3>

          {/* Editorial Subtitle */}
          <p className="mt-4 text-white/75 text-[14px] sm:text-[15px] font-light max-w-[540px] leading-relaxed tracking-wide font-manrope">
            Full-stack Next.js platforms, real-time LiveKit telephony, and autonomous webhook pipelines forged with zero compromise.
          </p>

          {/* Editorial Technical Crosshairs */}
          <div className="mt-8 flex items-center gap-4 text-[10px] font-mono tracking-[0.25em] text-white/60 uppercase">
            <span>[ SYSTEMA II ]</span>
            <span className="w-8 h-px bg-white/30" />
            <span>36°45&apos;N · ARSENAL</span>
            <span className="w-8 h-px bg-white/30" />
            <span>ENTER THE FORGE ↓</span>
          </div>
        </motion.div>
      </div>

      {/* Architectural Vaulted Stone Portal (Curved Inverted Lens into Dark Forge) */}
      <motion.div
        style={{ y: portalY }}
        className="relative w-full h-[100px] sm:h-[150px] md:h-[200px] pointer-events-none -mb-1"
      >
        <svg
          viewBox="0 0 1440 220"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* Sweeping Cathedral Vault Parabolic Arch */}
          <path
            d="M 0 220 L 0 80 Q 720 220 1440 80 L 1440 220 Z"
            fill="#0B0604"
          />
          {/* Subtle glowing threshold rim */}
          <path
            d="M 0 80 Q 720 220 1440 80"
            stroke="rgba(255, 240, 215, 0.35)"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </motion.div>
    </div>
  )
}

/**
 * EditorialTransitionCapabilitiesToPricing
 * Monumental Act III Chapter Transition: Emerging from the Forge into the Dawn of Terms.
 * Features an amber sunrise horizon aperture, Roman numeral III, and sovereign acquisition manifesto.
 */
export function EditorialTransitionCapabilitiesToPricing() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const titleY = useTransform(scrollYProgress, [0.1, 0.7], [50, -25])
  const romanOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.08, 0.22, 0.05])

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden select-none bg-[#0B0604] pt-8"
    >
      {/* Editorial Chapter Prologue */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-6 md:px-12 pt-10 pb-16 text-center">
        {/* Roman Numeral Watermark */}
        <motion.div
          style={{ opacity: romanOpacity }}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-italiana text-[#FFF6E9] text-[clamp(8rem,22vw,20rem)] leading-none select-none"
        >
          III
        </motion.div>

        <motion.div
          style={{ y: titleY }}
          className="relative z-10 flex flex-col items-center"
        >
          {/* Act Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/[0.07] px-5 py-2 text-white/90 text-[11px] sm:text-[12px] tracking-[0.3em] uppercase backdrop-blur-md mb-5 shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F26522] animate-ping" />
            <span>Act III</span>
            <span className="text-white/40">✦</span>
            <span>Terms of Engagement</span>
          </div>

          {/* Monumental Chapter Heading */}
          <h3 className="font-italiana text-white leading-[1.05] text-[clamp(2.4rem,6.5vw,4.8rem)] max-w-[850px] tracking-tight">
            Transparent terms. Sovereign ownership.
          </h3>

          {/* Editorial Subtitle */}
          <p className="mt-4 text-white/75 text-[14px] sm:text-[15px] font-light max-w-[560px] leading-relaxed tracking-wide font-manrope">
            No agency runarounds, no murky hourly billables. Fixed upfront quotes, full repository intellectual property, and guaranteed turnaround.
          </p>

          {/* Editorial Crosshairs */}
          <div className="mt-8 flex items-center gap-4 text-[10px] font-mono tracking-[0.25em] text-white/60 uppercase">
            <span>[ PROTOCOL ]</span>
            <span className="w-8 h-px bg-white/30" />
            <span>ATELIER STANDARDS · MMXXVI</span>
            <span className="w-8 h-px bg-white/30" />
            <span>SCOPES &amp; TIERS ↓</span>
          </div>
        </motion.div>
      </div>

      {/* Horizon Sunrise Arch into the Venetian Fresco */}
      <div className="relative w-full h-[80px] sm:h-[130px] md:h-[170px] pointer-events-none -mb-1">
        <svg
          viewBox="0 0 1440 200"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* Inverted Sunrise Dome returning to Fresco of Pricing (#F26522) */}
          <path
            d="M 0 200 L 0 60 Q 720 200 1440 60 L 1440 200 Z"
            fill="#F26522"
          />
          <path
            d="M 0 60 Q 720 200 1440 60"
            stroke="rgba(255, 230, 160, 0.45)"
            strokeWidth="2.5"
            fill="none"
          />
        </svg>
      </div>
    </div>
  )
}
