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
            
          </g>

          {/* Left margin architectural caliper ticks */}
          <g transform="translate(48, 220)" opacity="0.4">
            {[0, 30, 60, 90, 120, 150, 180, 210].map((y) => (
              <line key={y} x1="0" y1={y} x2={y % 60 === 0 ? "16" : "8"} y2={y} stroke="white" strokeWidth={y % 60 === 0 ? "1.2" : "0.6"} />
            ))}
            
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
          className="w-full h-full opacity-60 md:opacity-80 transition-opacity duration-500"
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <filter id="dvGlowWork" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Subtle architectural vertical gridlines aligned with standard 12-col margins */}
          <line x1="120" y1="40" x2="120" y2="860" stroke="white" strokeWidth="0.9" strokeDasharray="4 8" opacity="0.6" />
          <line x1="1320" y1="40" x2="1320" y2="860" stroke="white" strokeWidth="0.9" strokeDasharray="4 8" opacity="0.6" />

          {/* Animated Leonardo celestial compass quadrant in upper right — rotating with degree ticks */}
          <g transform="translate(1180, 160)" opacity="0.85">
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '0px 0px' }}
            >
              <circle cx="0" cy="0" r="180" stroke="white" strokeWidth="1.2" strokeDasharray="4 8" fill="none" opacity="0.7" />
              <circle cx="0" cy="0" r="110" stroke="white" strokeWidth="1" fill="none" opacity="0.8" />
              <circle cx="0" cy="0" r="68" stroke="white" strokeWidth="0.8" strokeDasharray="2 6" fill="none" opacity="0.6" />

              {/* Quadrant tick marks */}
              {[0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330].map((deg) => (
                <line
                  key={deg}
                  x1="0"
                  y1="-180"
                  x2="0"
                  y2={deg % 45 === 0 ? "-166" : "-172"}
                  stroke="rgba(255, 255, 255, 0.7)"
                  strokeWidth={deg % 45 === 0 ? "1.4" : "0.8"}
                  transform={`rotate(${deg} 0 0)`}
                />
              ))}
            </motion.g>

            {/* Counter-rotating inscribed sacred geometry */}
            <motion.g
              animate={{ rotate: -360 }}
              transition={{ duration: 160, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '0px 0px' }}
              opacity="0.55"
            >
              <rect x="-78" y="-78" width="156" height="156" stroke="white" strokeWidth="0.9" fill="none" />
              <rect x="-78" y="-78" width="156" height="156" stroke="white" strokeWidth="0.9" fill="none" transform="rotate(45 0 0)" />
            </motion.g>

            {/* Compass radial axes */}
            <line x1="0" y1="0" x2="180" y2="0" stroke="white" strokeWidth="1" opacity="0.8" />
            <line x1="0" y1="0" x2="0" y2="180" stroke="white" strokeWidth="1" opacity="0.8" />
            <circle cx="0" cy="0" r="4" fill="white" filter="url(#dvGlowWork)" />
            
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
          className="w-full h-full opacity-55 md:opacity-75 transition-opacity duration-500"
          viewBox="0 0 1440 1000"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <filter id="dvGlowCap" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Animated Leonardo Wireframe Polyhedron Geometry in Upper Left (Pacioli 1498) */}
          <g transform="translate(180, 180)" opacity="0.85">
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '60px 70px' }}
            >
              <polygon
                points="60,10 110,40 110,100 60,130 10,100 10,40"
                stroke="white"
                strokeWidth="1.2"
                fill="none"
              />
              <polygon
                points="60,30 90,50 90,90 60,110 30,90 30,50"
                stroke="white"
                strokeWidth="0.8"
                strokeDasharray="3 5"
                fill="none"
              />
              <line x1="60" y1="10" x2="60" y2="30" stroke="white" strokeWidth="0.8" />
              <line x1="110" y1="40" x2="90" y2="50" stroke="white" strokeWidth="0.8" />
              <line x1="110" y1="100" x2="90" y2="90" stroke="white" strokeWidth="0.8" />
              <line x1="60" y1="130" x2="60" y2="110" stroke="white" strokeWidth="0.8" />
              <line x1="10" y1="100" x2="30" y2="90" stroke="white" strokeWidth="0.8" />
              <line x1="10" y1="40" x2="30" y2="50" stroke="white" strokeWidth="0.8" />
            </motion.g>

            {/* Inner counter-rotating core */}
            <motion.circle
              cx="60"
              cy="70"
              r="24"
              stroke="white"
              strokeWidth="0.8"
              strokeDasharray="2 4"
              fill="none"
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '60px 70px' }}
            />
            <circle cx="60" cy="70" r="3" fill="white" filter="url(#dvGlowCap)" />

            
          </g>

          {/* Right margin technical radar coordinate with animated rotating sweep */}
          <g transform="translate(1240, 420)" opacity="0.85">
            <circle cx="70" cy="70" r="70" stroke="white" strokeWidth="1" strokeDasharray="4 8" />
            <circle cx="70" cy="70" r="44" stroke="white" strokeWidth="1.2" />
            <circle cx="70" cy="70" r="22" stroke="white" strokeWidth="0.8" strokeDasharray="2 4" />
            <line x1="70" y1="0" x2="70" y2="140" stroke="white" strokeWidth="0.8" opacity="0.7" />
            <line x1="0" y1="70" x2="140" y2="70" stroke="white" strokeWidth="0.8" opacity="0.7" />

            {/* Rotating radar sweep ray */}
            <motion.line
              x1="70"
              y1="70"
              x2="140"
              y2="70"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              filter="url(#dvGlowCap)"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '70px 70px' }}
            />

            
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
          className="w-full h-full opacity-45 md:opacity-65 transition-opacity duration-500"
          viewBox="0 0 1440 800"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Top bracket framing */}
          <g transform="translate(180, 60)" opacity="0.8">
            <path d="M 0 20 L 0 0 L 20 0" stroke="white" strokeWidth="1.5" fill="none" />
            <line x1="30" y1="0" x2="1050" y2="0" stroke="white" strokeWidth="1" strokeDasharray="4 8" />
            <path d="M 1060 0 L 1080 0 L 1080 20" stroke="white" strokeWidth="1.5" fill="none" />
            
          </g>
        </svg>
      </div>
    )
  }

  return null
}

/**
 * Da Vinci "Never Miss Another Call" Technical Blueprint Lines
 * An authentic Leonardo da Vinci acoustic paraboloid and soundwave construction diagram
 * featuring a scroll-driven reveal effect that draws into view as the user scrolls into the section!
 */
export function DaVinciNeverMissCallWatermark({
  scrollProgress,
  className = '',
}: {
  scrollProgress?: any
  className?: string
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 select-none overflow-hidden flex items-center justify-center ${className}`}
    >
      <svg
        className="w-full max-w-[1200px] h-[520px] overflow-visible opacity-70 sm:opacity-90"
        viewBox="0 0 1200 520"
        fill="none"
      >
        <defs>
          <filter id="dvCallGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Rotating Acoustic Geometry Ring centered on the text */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 180, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '600px 240px' }}
        >
          {/* Main outer proportion circle */}
          <circle cx="600" cy="240" r="230" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.2" strokeDasharray="6 10" />
          <circle cx="600" cy="240" r="142" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="1" />
          <circle cx="600" cy="240" r="88" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.8" strokeDasharray="3 6" />

          {/* Degree radial ticks */}
          {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345].map((deg) => (
            <line
              key={deg}
              x1="600"
              y1="10"
              x2="600"
              y2={deg % 45 === 0 ? "24" : "18"}
              stroke="rgba(255, 255, 255, 0.7)"
              strokeWidth={deg % 45 === 0 ? "1.4" : "0.8"}
              transform={`rotate(${deg} 600 240)`}
            />
          ))}

          
        </motion.g>

        {/* 2. Counter-rotating Inscribed Sacred Polygon */}
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 240, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '600px 240px' }}
          opacity="0.4"
        >
          <polygon points="600,98 723,169 723,311 600,382 477,311 477,169" stroke="white" strokeWidth="1" fill="none" />
          <polygon points="600,98 723,169 723,311 600,382 477,311 477,169" stroke="white" strokeWidth="0.8" strokeDasharray="4 6" fill="none" transform="rotate(30 600 240)" />
        </motion.g>

        {/* 3. Horizontal & Vertical Caliper Alignment Axes */}
        <line x1="80" y1="240" x2="1120" y2="240" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.2" strokeDasharray="8 8" />
        <line x1="80" y1="225" x2="80" y2="255" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1.8" />
        <line x1="1120" y1="225" x2="1120" y2="255" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1.8" />

        {/* Center acoustic crosshair */}
        <line x1="580" y1="240" x2="620" y2="240" stroke="#FFFFFF" strokeWidth="2" filter="url(#dvCallGlow)" />
        <line x1="600" y1="220" x2="600" y2="260" stroke="#FFFFFF" strokeWidth="2" filter="url(#dvCallGlow)" />

        {/* 4. Sweeping Leonardo Acoustic Paraboloids with Breathing Wave Motion */}
        <motion.path
          d="M 280 140 Q 600 80 920 140"
          stroke="rgba(255, 255, 255, 0.6)"
          strokeWidth="1.4"
          fill="none"
          animate={{ d: ['M 280 140 Q 600 80 920 140', 'M 280 150 Q 600 60 920 150', 'M 280 140 Q 600 80 920 140'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M 320 340 Q 600 400 880 340"
          stroke="rgba(255, 255, 255, 0.6)"
          strokeWidth="1.4"
          fill="none"
          animate={{ d: ['M 320 340 Q 600 400 880 340', 'M 320 330 Q 600 420 880 330', 'M 320 340 Q 600 400 880 340'] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />

        
      </svg>
    </div>
  )
}
