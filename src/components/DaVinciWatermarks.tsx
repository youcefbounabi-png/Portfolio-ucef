import { motion } from 'motion/react'

/**
 * Da Vinci Portrait Halo & Sacred Geometry Construction
 * Placed directly behind Youcef's portrait to frame it with intentional Renaissance engineering lines.
 */
export function DaVinciPortraitHalo({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 grid place-items-center pointer-events-none select-none overflow-visible ${className}`}
    >
      <svg
        viewBox="0 0 600 600"
        className="w-[140%] h-[140%] -translate-y-4 max-w-none overflow-visible"
        fill="none"
      >
        <defs>
          <filter id="dvHaloGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Slowly rotating concentric proportion rings with degree ticks */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 160, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '300px 300px' }}
        >
          {/* Outer circle with dashed quadrant divisions */}
          <circle
            cx="300"
            cy="300"
            r="248"
            stroke="rgba(255, 255, 255, 0.22)"
            strokeWidth="1"
            strokeDasharray="4 8"
          />

          {/* Golden ratio inner circle (248 / 1.618 = ~153) */}
          <circle
            cx="300"
            cy="300"
            r="153"
            stroke="rgba(255, 255, 255, 0.28)"
            strokeWidth="1.2"
          />

          {/* Innermost core orbit (153 / 1.618 = ~94) */}
          <circle
            cx="300"
            cy="300"
            r="94"
            stroke="rgba(255, 255, 255, 0.18)"
            strokeWidth="1"
            strokeDasharray="2 6"
          />

          {/* Major quadrant tick marks */}
          {[0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330].map((deg) => (
            <line
              key={deg}
              x1="300"
              y1="52"
              x2="300"
              y2={deg % 45 === 0 ? "40" : "46"}
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth={deg % 45 === 0 ? "1.4" : "0.8"}
              transform={`rotate(${deg} 300 300)`}
            />
          ))}

          {/* Technical degree labels */}
          <text
            x="300"
            y="32"
            textAnchor="middle"
            fill="rgba(255, 255, 255, 0.45)"
            fontSize="8"
            fontFamily="monospace"
            letterSpacing="0.1em"
          >
            000°
          </text>
          <text
            x="568"
            y="303"
            textAnchor="start"
            fill="rgba(255, 255, 255, 0.4)"
            fontSize="8"
            fontFamily="monospace"
            letterSpacing="0.1em"
          >
            090°
          </text>
          <text
            x="300"
            y="576"
            textAnchor="middle"
            fill="rgba(255, 255, 255, 0.4)"
            fontSize="8"
            fontFamily="monospace"
            letterSpacing="0.1em"
          >
            180°
          </text>
          <text
            x="32"
            y="303"
            textAnchor="end"
            fill="rgba(255, 255, 255, 0.4)"
            fontSize="8"
            fontFamily="monospace"
            letterSpacing="0.1em"
          >
            270°
          </text>
        </motion.g>

        {/* 2. Counter-rotating Da Vinci Star Heptagram / Inscribed Polygons */}
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 220, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '300px 300px' }}
          opacity={0.3}
        >
          {/* Inscribed Square rotated 45 deg */}
          <rect
            x="192"
            y="192"
            width="216"
            height="216"
            stroke="rgba(255, 255, 255, 0.35)"
            strokeWidth="1"
            fill="none"
          />
          <rect
            x="192"
            y="192"
            width="216"
            height="216"
            transform="rotate(45 300 300)"
            stroke="rgba(255, 255, 255, 0.35)"
            strokeWidth="1"
            fill="none"
          />
        </motion.g>

        {/* 3. Static Caliper Construction Axes (Passes horizontally & vertically through center) */}
        {/* Horizontal datum line */}
        <line
          x1="20"
          y1="300"
          x2="580"
          y2="300"
          stroke="rgba(255, 255, 255, 0.35)"
          strokeWidth="1"
          strokeDasharray="6 6"
        />
        {/* Left and right caliper end-brackets */}
        <line x1="20" y1="288" x2="20" y2="312" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1.5" />
        <line x1="580" y1="288" x2="580" y2="312" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1.5" />

        {/* Center Crosshair '+' */}
        <line x1="290" y1="300" x2="310" y2="300" stroke="#FFFFFF" strokeWidth="1.5" />
        <line x1="300" y1="290" x2="300" y2="310" stroke="#FFFFFF" strokeWidth="1.5" />

        {/* 4. Sweeping Compass Arc with Golden Ratio Annotation */}
        <path
          d="M 453 300 A 153 153 0 0 0 300 147"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          fill="none"
          filter="url(#dvHaloGlow)"
          opacity={0.85}
        />
        <line
          x1="300"
          y1="300"
          x2="453"
          y2="300"
          stroke="rgba(255, 255, 255, 0.7)"
          strokeWidth="1.2"
        />

        {/* Subtle technical annotation badges */}
        <g transform="translate(340, 160)">
          <text
            x="0"
            y="0"
            fill="rgba(255, 255, 255, 0.75)"
            fontSize="8.5"
            fontFamily="monospace"
            letterSpacing="0.15em"
          >
            φ = 1.61803
          </text>
          <text
            x="0"
            y="12"
            fill="rgba(255, 255, 255, 0.45)"
            fontSize="7"
            fontFamily="monospace"
            letterSpacing="0.12em"
          >
            SECTIO AUREA
          </text>
        </g>
      </svg>
    </div>
  )
}

/**
 * Da Vinci Codex Background Watermark Grid
 * Clean, architectural layout lines and sacred geometry accents placed in sections
 * to give that authentic Renaissance engineer + technical mastery vibe.
 */
export function DaVinciSectionWatermark({
  variant = 'studio',
  className = '',
}: {
  variant?: 'studio' | 'work' | 'capabilities' | 'pricing'
  className?: string
}) {
  if (variant === 'studio') {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 select-none overflow-hidden ${className}`}
      >
        <svg
          className="w-full h-full opacity-35"
          viewBox="0 0 1440 800"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Top horizontal datum axis */}
          <line x1="80" y1="120" x2="1360" y2="120" stroke="white" strokeWidth="0.8" strokeDasharray="4 8" />
          <line x1="80" y1="112" x2="80" y2="128" stroke="white" strokeWidth="1.2" />
          <line x1="1360" y1="112" x2="1360" y2="128" stroke="white" strokeWidth="1.2" />
          <text x="96" y="112" fill="white" opacity="0.6" fontSize="8" fontFamily="monospace" letterSpacing="0.2em">
            AXIS_01 // LAT 51.5074° N · LON 0.1278° W
          </text>

          {/* Right quadrant Golden Spiral Construction lines */}
          <g transform="translate(1080, 260)" opacity="0.45">
            <circle cx="120" cy="120" r="120" stroke="white" strokeWidth="0.8" strokeDasharray="3 6" />
            <circle cx="120" cy="120" r="74" stroke="white" strokeWidth="1" />
            <circle cx="120" cy="120" r="46" stroke="white" strokeWidth="0.8" />
            <line x1="0" y1="120" x2="240" y2="120" stroke="white" strokeWidth="0.8" />
            <line x1="120" y1="0" x2="120" y2="240" stroke="white" strokeWidth="0.8" />
            {/* Corner Crosshairs */}
            <path d="M -10 0 L 10 0 M 0 -10 L 0 10" stroke="white" strokeWidth="1" transform="translate(0, 0)" />
            <path d="M -10 0 L 10 0 M 0 -10 L 0 10" stroke="white" strokeWidth="1" transform="translate(240, 240)" />
            <text x="130" y="55" fill="white" opacity="0.8" fontSize="7.5" fontFamily="monospace" letterSpacing="0.15em">
              CANON PROPORTIONIS
            </text>
          </g>

          {/* Left margin architectural caliper ticks */}
          <g transform="translate(48, 220)" opacity="0.4">
            {[0, 30, 60, 90, 120, 150, 180, 210].map((y) => (
              <line key={y} x1="0" y1={y} x2={y % 60 === 0 ? "16" : "8"} y2={y} stroke="white" strokeWidth={y % 60 === 0 ? "1.2" : "0.6"} />
            ))}
            <text x="24" y="94" fill="white" opacity="0.7" fontSize="7" fontFamily="monospace" transform="rotate(90 24 94)">
              SCALE: 1.618
            </text>
          </g>
        </svg>
      </div>
    )
  }

  if (variant === 'work') {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 select-none overflow-hidden ${className}`}
      >
        <svg
          className="w-full h-full opacity-30"
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Subtle architectural vertical gridlines aligned with standard 12-col margins */}
          <line x1="120" y1="40" x2="120" y2="860" stroke="white" strokeWidth="0.7" strokeDasharray="3 7" opacity="0.4" />
          <line x1="1320" y1="40" x2="1320" y2="860" stroke="white" strokeWidth="0.7" strokeDasharray="3 7" opacity="0.4" />

          {/* Leonardo celestial compass quadrant in upper right */}
          <g transform="translate(1180, 140)" opacity="0.5">
            <path d="M 0 0 A 180 180 0 0 1 180 180" stroke="white" strokeWidth="1.2" fill="none" />
            <path d="M 0 0 A 110 110 0 0 1 110 110" stroke="white" strokeWidth="0.8" strokeDasharray="4 6" fill="none" />
            <line x1="0" y1="0" x2="180" y2="0" stroke="white" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="0" y2="180" stroke="white" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="3" fill="white" />
            <text x="12" y="32" fill="white" opacity="0.7" fontSize="7.5" fontFamily="monospace" letterSpacing="0.16em">
              FABRICA INTELLIGENTIAE
            </text>
          </g>

          {/* Lower left Leonardo caliper & coordinate frame */}
          <g transform="translate(90, 740)" opacity="0.4">
            <line x1="0" y1="0" x2="280" y2="0" stroke="white" strokeWidth="0.8" />
            <line x1="0" y1="-8" x2="0" y2="8" stroke="white" strokeWidth="1.2" />
            <line x1="280" y1="-8" x2="280" y2="8" stroke="white" strokeWidth="1.2" />
            <text x="140" y="-10" textAnchor="middle" fill="white" opacity="0.75" fontSize="7.5" fontFamily="monospace" letterSpacing="0.14em">
              [WORKS // 01 — 07] · DIVINA PROPORTIO
            </text>
          </g>
        </svg>
      </div>
    )
  }

  if (variant === 'capabilities') {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 select-none overflow-hidden ${className}`}
      >
        <svg
          className="w-full h-full opacity-25"
          viewBox="0 0 1440 1000"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Subtle Leonardo Wireframe Polyhedron Geometry in Upper Left */}
          <g transform="translate(160, 180)" opacity="0.6">
            <polygon
              points="60,10 110,40 110,100 60,130 10,100 10,40"
              stroke="white"
              strokeWidth="0.8"
              fill="none"
            />
            <polygon
              points="60,30 90,50 90,90 60,110 30,90 30,50"
              stroke="white"
              strokeWidth="0.6"
              strokeDasharray="3 5"
              fill="none"
            />
            <line x1="60" y1="10" x2="60" y2="30" stroke="white" strokeWidth="0.6" />
            <line x1="110" y1="40" x2="90" y2="50" stroke="white" strokeWidth="0.6" />
            <line x1="110" y1="100" x2="90" y2="90" stroke="white" strokeWidth="0.6" />
            <line x1="60" y1="130" x2="60" y2="110" stroke="white" strokeWidth="0.6" />
            <line x1="10" y1="100" x2="30" y2="90" stroke="white" strokeWidth="0.6" />
            <line x1="10" y1="40" x2="30" y2="50" stroke="white" strokeWidth="0.6" />
            <text x="60" y="152" textAnchor="middle" fill="white" opacity="0.8" fontSize="7" fontFamily="monospace" letterSpacing="0.15em">
              POLYHEDRA · PACIOLI 1498
            </text>
          </g>

          {/* Right margin technical radar coordinate */}
          <g transform="translate(1260, 420)" opacity="0.5">
            <circle cx="60" cy="60" r="60" stroke="white" strokeWidth="0.8" strokeDasharray="3 6" />
            <circle cx="60" cy="60" r="38" stroke="white" strokeWidth="1" />
            <line x1="60" y1="0" x2="60" y2="120" stroke="white" strokeWidth="0.7" />
            <line x1="0" y1="60" x2="120" y2="60" stroke="white" strokeWidth="0.7" />
            <text x="60" y="138" textAnchor="middle" fill="white" opacity="0.8" fontSize="7" fontFamily="monospace" letterSpacing="0.12em">
              AI TELEPHONY · &lt;600MS
            </text>
          </g>
        </svg>
      </div>
    )
  }

  if (variant === 'pricing') {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 select-none overflow-hidden ${className}`}
      >
        <svg
          className="w-full h-full opacity-35"
          viewBox="0 0 1440 800"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Top bracket framing */}
          <g transform="translate(180, 60)" opacity="0.5">
            <path d="M 0 20 L 0 0 L 20 0" stroke="white" strokeWidth="1.4" fill="none" />
            <line x1="30" y1="0" x2="1050" y2="0" stroke="white" strokeWidth="0.8" strokeDasharray="4 8" />
            <path d="M 1060 0 L 1080 0 L 1080 20" stroke="white" strokeWidth="1.4" fill="none" />
            <text x="540" y="-8" textAnchor="middle" fill="white" opacity="0.8" fontSize="7.5" fontFamily="monospace" letterSpacing="0.2em">
              TARIFARIVM · PROPORTIO MODERATA
            </text>
          </g>
        </svg>
      </div>
    )
  }

  return null
}
