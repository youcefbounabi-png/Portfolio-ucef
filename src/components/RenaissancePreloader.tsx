import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const LOGO_PATH =
  'M60 120C26.8629 120 0 93.1371 0 60V0C22.5654 0 42.2213 12.4569 52.4662 30.8691C38.4788 34.2089 28.0787 46.7902 28.0787 61.8006V63.1443C28.0787 79.9648 41.7146 93.6006 58.5353 93.6006H59.8789L59.8785 61.8006C59.8785 79.3633 74.1159 93.6006 91.6787 93.6006L91.6787 61.8006C91.6787 44.2783 77.5071 30.0661 60 30.0008L60 0H62.5352C94.2722 0 120 25.7279 120 57.4648V60C120 93.1371 93.1371 120 60 120Z'

interface PreloaderProps {
  onComplete: () => void
}

export function RenaissancePreloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  // Fluid simulated progression with realistic easing
  useEffect(() => {
    const start = performance.now()
    const duration = 2200 // 2.2 seconds for cinematic pacing

    let raf = 0
    const tick = (now: number) => {
      const elapsed = now - start
      const t = Math.min(elapsed / duration, 1)
      // Custom ease: rapid early progression, thoughtful pause, finish
      const eased = t < 0.6 ? (t / 0.6) * 0.72 : 0.72 + Math.pow((t - 0.6) / 0.4, 1.4) * 0.28
      const current = Math.floor(eased * 100)

      setProgress(current)

      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setProgress(100)
        setTimeout(() => {
          setIsFinished(true)
          setTimeout(() => onCompleteRef.current(), 700) // Let exit animation finish before unmounting
        }, 280)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="renaissance-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.06,
            filter: 'blur(10px)',
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#F26522] overflow-hidden select-none"
        >
          {/* Subtle celestial vignette */}
          <div className="absolute inset-0 bg-radial from-transparent via-black/10 to-black/35 pointer-events-none" />

          {/* Machine Vision Corner HUD Brackets */}
          <div className="absolute inset-6 md:inset-10 pointer-events-none flex flex-col justify-between">
            <div className="flex justify-between items-start text-white/50 text-[11px] font-mono tracking-widest uppercase">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 border-t-2 border-l-2 border-white/70 inline-block" />
                <span>SYS // LAT 36.75°N</span>
              </div>
              <div className="flex items-center gap-2 text-right">
                <span>RENAISSANCE × AI</span>
                <span className="w-2.5 h-2.5 border-t-2 border-r-2 border-white/70 inline-block" />
              </div>
            </div>
            <div className="flex justify-between items-end text-white/50 text-[11px] font-mono tracking-widest uppercase">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 border-b-2 border-l-2 border-white/70 inline-block" />
                <span>FLORENTIA · MMXXVI</span>
              </div>
              <div className="flex items-center gap-2 text-right">
                <span>YOUCEF.DEV</span>
                <span className="w-2.5 h-2.5 border-b-2 border-r-2 border-white/70 inline-block" />
              </div>
            </div>
          </div>

          {/* Center Stage: Renaissance Astrolabe + Vector Logo */}
          <div className="relative flex items-center justify-center w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[460px] md:h-[460px]">
            {/* Ambient Celestial Glow */}
            <motion.div
              animate={{ scale: [0.95, 1.15, 0.95], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-200/30 via-[#FFF6E9]/20 to-transparent blur-[80px] pointer-events-none"
            />

            {/* The Astrolabe SVG */}
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full drop-shadow-[0_12px_40px_rgba(0,0,0,0.25)]"
            >
              <defs>
                <path
                  id="astrolabeTextRing"
                  d="M 200, 200 m -164, 0 a 164,164 0 1,1 328,0 a 164,164 0 1,1 -328,0"
                />
              </defs>

              {/* 1. Cardinal Axis Crosshairs */}
              <line x1="200" y1="20" x2="200" y2="380" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 5" />
              <line x1="20" y1="200" x2="380" y2="200" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 5" />
              <line x1="73" y1="73" x2="327" y2="327" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="2 6" />
              <line x1="73" y1="327" x2="327" y2="73" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="2 6" />

              {/* 2. Outer Graduated Astronomical Circle */}
              <circle
                cx="200"
                cy="200"
                r="184"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
              />

              {/* Rotating Dashed Epicycle Ring */}
              <g>
                <circle
                  cx="200"
                  cy="200"
                  r="174"
                  fill="none"
                  stroke="rgba(255,255,255,0.45)"
                  strokeWidth="1.2"
                  strokeDasharray="4 8"
                />
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 200 200"
                  to="360 200 200"
                  dur="45s"
                  repeatCount="indefinite"
                />
              </g>

              {/* Inscription text around the astrolabe */}
              <text className="font-mono text-[8px] tracking-[0.38em] fill-white/65 uppercase">
                <textPath href="#astrolabeTextRing" startOffset="0%">
                  ✦ ARTIFICIUM ET MACHINA ✦ SACRA GEOMETRIA ✦ MMXXVI ✦ YOUCEF.DEV ✦
                </textPath>
              </text>

              {/* 3. Middle Rotating Cardinal Ring with degree ticks */}
              <g>
                <circle
                  cx="200"
                  cy="200"
                  r="144"
                  fill="none"
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="1"
                />
                {Array.from({ length: 24 }).map((_, i) => (
                  <line
                    key={i}
                    x1="200"
                    y1="56"
                    x2="200"
                    y2={i % 2 === 0 ? '66' : '62'}
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth={i % 6 === 0 ? 1.8 : 1}
                    transform={`rotate(${i * 15} 200 200)`}
                  />
                ))}
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="360 200 200"
                  to="0 200 200"
                  dur="60s"
                  repeatCount="indefinite"
                />
              </g>

              {/* 4. Sacred Geometry: Intersecting Squares & Armillary Ellipses */}
              <g>
                <rect
                  x="134"
                  y="134"
                  width="132"
                  height="132"
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.2"
                  transform="rotate(45 200 200)"
                />
                <rect
                  x="134"
                  y="134"
                  width="132"
                  height="132"
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.2"
                />
                <ellipse
                  cx="200"
                  cy="200"
                  rx="122"
                  ry="48"
                  fill="none"
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="1.2"
                  transform="rotate(30 200 200)"
                />
                <ellipse
                  cx="200"
                  cy="200"
                  rx="122"
                  ry="48"
                  fill="none"
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="1.2"
                  transform="rotate(-30 200 200)"
                />
              </g>

              {/* 5. Machine Vision Tracking Brackets Around Center Monogram */}
              <path
                d="M 158 174 L 158 158 L 174 158"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              <path
                d="M 226 158 L 242 158 L 242 174"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              <path
                d="M 158 226 L 158 242 L 174 242"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              <path
                d="M 226 242 L 242 242 L 242 226"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2"
              />

              {/* Central Micro Crosshair */}
              <line x1="194" y1="200" x2="206" y2="200" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.8" />
              <line x1="200" y1="194" x2="200" y2="206" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.8" />

              {/* 6. Dynamic Scanning Circular Progress Meter */}
              <circle
                cx="200"
                cy="200"
                r="96"
                fill="none"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="2"
              />
              <circle
                cx="200"
                cy="200"
                r="96"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={603}
                strokeDashoffset={603 - (603 * progress) / 100}
                transform="rotate(-90 200 200)"
              />
            </svg>

            {/* 7. Centerpiece: Youcef's Monogram Centered Flawlessly via DOM */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="drop-shadow-[0_4px_18px_rgba(0,0,0,0.35)]"
              >
                <svg
                  width={58}
                  height={58}
                  viewBox="0 0 120 120"
                  fill="none"
                  shapeRendering="geometricPrecision"
                >
                  <path fillRule="evenodd" clipRule="evenodd" d={LOGO_PATH} fill="white" />
                </svg>
              </motion.div>
            </div>
          </div>

          {/* Progression Telemetry & Typographic Counter */}
          <div className="relative mt-8 flex flex-col items-center text-center">
            <div className="flex items-baseline gap-1">
              <span className="font-italiana text-[clamp(2.8rem,7vw,4.5rem)] text-white leading-none tracking-tight">
                {String(progress).padStart(2, '0')}
              </span>
              <span className="font-italiana text-[1.4rem] text-white/70 leading-none">
                %
              </span>
            </div>

            <p className="mt-3 text-white/80 font-mono text-[11px] tracking-[0.28em] uppercase flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              {progress < 40
                ? 'INITIALIZING RENAISSANCE GEOMETRY'
                : progress < 80
                ? 'CONVERGING MACHINE INTELLIGENCE'
                : 'SYNTHESIS COMPLETE · ENTERING'}
            </p>

            {/* Micro Progress Track */}
            <div className="mt-4 w-48 h-[2px] bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
