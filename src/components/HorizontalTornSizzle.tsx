import { useMemo } from 'react'
import { motion } from 'motion/react'

interface HorizontalTornSizzleProps {
  /** 'bottom' when placed at the bottom of a section tearing downwards;
   *  'top' when placed at the top of a section rising upwards */
  position: 'top' | 'bottom'
  /** The color of the paper being torn/burned (defaults to atelier orange #F26522) */
  paperColor?: string
  /** Class names for outer container */
  className?: string
}

// Generate an authentic deckled ragged paper tear path across 1920px width
function generateTornPaperPath(isTop: boolean, height: number = 140): {
  paperPath: string
  tearLine: string
} {
  const width = 1920
  const baseline = isTop ? 70 : 70 // Middle baseline around which the tear undulates
  const step = 14 // Sampling frequency for micro-jagged paper fibers
  const numSteps = Math.ceil(width / step)

  const points: Array<{ x: number; y: number }> = []

  // Deterministic seeded pseudorandom to avoid SSR mismatch
  let seed = 42
  const pseudoRandom = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }

  for (let i = 0; i <= numSteps; i++) {
    const x = Math.min(i * step, width)
    const normalizedX = x / width

    // Macro wave: undulating natural landscape of the tear (matching Shopify Editions screenshot)
    const macroWave =
      Math.sin(normalizedX * Math.PI * 2.2 + 0.4) * 22 +
      Math.sin(normalizedX * Math.PI * 4.8 + 1.2) * 11 +
      Math.cos(normalizedX * Math.PI * 1.5) * 14

    // Micro roughness: jagged torn fibers, tufts, and paper rip serrations
    const microRoughness = (pseudoRandom() - 0.5) * 12 + (pseudoRandom() - 0.5) * 6

    const y = Math.max(12, Math.min(height - 12, baseline + macroWave + microRoughness))
    points.push({ x, y })
  }

  // Construct tear line contour
  const tearLine = points.reduce((acc, p, idx) => {
    return idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`
  }, '')

  // Close polygon into the solid paper body
  let paperPath = tearLine
  if (isTop) {
    // Paper fills down to bottom of container
    paperPath += ` L ${width} ${height} L 0 ${height} Z`
  } else {
    // Paper fills up to top of container
    paperPath += ` L ${width} 0 L 0 0 Z`
  }

  return { paperPath, tearLine }
}

export function HorizontalTornSizzle({
  position,
  paperColor = '#F26522',
  className = '',
}: HorizontalTornSizzleProps) {
  const isTop = position === 'top'
  const height = 130

  const { paperPath, tearLine } = useMemo(
    () => generateTornPaperPath(isTop, height),
    [isTop, height]
  )

  // Floating sizzling sparks positioned along the tear line
  const emberSparks = useMemo(() => {
    let s = 1337
    const rng = () => {
      s = (s * 9301 + 49297) % 233280
      return s / 233280
    }
    return Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      x: Math.floor(rng() * 100),
      delay: rng() * 2.8,
      duration: 1.2 + rng() * 1.8,
      size: 2 + rng() * 3.5,
      driftY: (rng() - 0.5) * 26,
    }))
  }, [])

  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-visible select-none pointer-events-none ${
        isTop ? '-mt-16 sm:-mt-20 z-20' : '-mb-16 sm:-mb-20 z-20'
      } ${className}`}
      style={{ height: `${height}px` }}
    >
      <svg
        viewBox={`0 0 1920 ${height}`}
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full overflow-visible block"
      >
        <defs>
          {/* Sizzling incandescent white-hot bloom filter */}
          <filter id={`sizzleGlow-${position}`} x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur2" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur3" />
            <feMerge>
              <feMergeNode in="blur3" />
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Charred burnt ash gradient along tear boundary */}
          <linearGradient
            id={`burntAshGrad-${position}`}
            x1="0%"
            y1={isTop ? '0%' : '100%'}
            x2="0%"
            y2={isTop ? '100%' : '0%'}
          >
            <stop offset="0%" stopColor="#0B0604" stopOpacity="0.88" />
            <stop offset="35%" stopColor="#2A0B02" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#4D1504" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#4D1504" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 1. Deep Charred Burnt Ash Shadow: casts along the torn edge into the paper */}
        <path
          d={paperPath}
          fill={`url(#burntAshGrad-${position})`}
          className="opacity-95"
        />

        {/* 2. Solid Paper Body (Orange or theme color) */}
        <path
          d={paperPath}
          fill={paperColor}
        />

        {/* 3. Raw Exposed Paper Pulp / Deckled Fiber Highlight */}
        <path
          d={tearLine}
          fill="none"
          stroke="#FFEFE2"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.65"
        />

        {/* 4. Deep Charred Scorched Under-Border */}
        <path
          d={tearLine}
          fill="none"
          stroke="#1A0400"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.8"
        />

        {/* 5. Incandescent White-Hot Sizzling Core (Pulsing glowing tear line) */}
        <motion.path
          d={tearLine}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#sizzleGlow-${position})`}
          animate={{
            strokeOpacity: [0.92, 1, 0.85, 1, 0.95],
            strokeWidth: [2.0, 2.6, 2.2, 2.8, 2.1],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            filter: 'drop-shadow(0 0 5px #FFFFFF) drop-shadow(0 0 14px #FF9020) drop-shadow(0 0 28px #FF4500)',
          }}
        />

        {/* 6. Secondary Amber Hot Wire Sizzle Accent */}
        <path
          d={tearLine}
          fill="none"
          stroke="#FFB347"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray="8 14 2 10"
          strokeOpacity="0.85"
        />
      </svg>

      {/* 7. Floating Sizzling Embers & Sparks crackling along the tear boundary */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-16 pointer-events-none overflow-visible">
        {emberSparks.map((spark) => (
          <motion.div
            key={spark.id}
            className="absolute rounded-full"
            style={{
              left: `${spark.x}%`,
              top: '50%',
              width: `${spark.size}px`,
              height: `${spark.size}px`,
              backgroundColor: spark.id % 2 === 0 ? '#FFFFFF' : '#FFB238',
              boxShadow:
                spark.id % 2 === 0
                  ? '0 0 6px #FFFFFF, 0 0 12px #FF8800'
                  : '0 0 8px #FFAA22, 0 0 16px #FF3300',
            }}
            animate={{
              y: [0, spark.driftY, spark.driftY * 1.6],
              opacity: [0, 1, 0.7, 0],
              scale: [0.6, 1.4, 0.4],
            }}
            transition={{
              duration: spark.duration,
              delay: spark.delay,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>
    </div>
  )
}
