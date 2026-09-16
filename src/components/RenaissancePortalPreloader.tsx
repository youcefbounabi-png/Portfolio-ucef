import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

const LOGO_PATH =
  'M60 120C26.8629 120 0 93.1371 0 60V0C22.5654 0 42.2213 12.4569 52.4662 30.8691C38.4788 34.2089 28.0787 46.7902 28.0787 61.8006V63.1443C28.0787 79.9648 41.7146 93.6006 58.5353 93.6006H59.8789L59.8785 61.8006C59.8785 79.3633 74.1159 93.6006 91.6787 93.6006L91.6787 61.8006C91.6787 44.2783 77.5071 30.0661 60 30.0008L60 0H62.5352C94.2722 0 120 25.7279 120 57.4648V60C120 93.1371 93.1371 120 60 120Z'

interface PortalPreloaderProps {
  onBurnProgress?: (progress: number) => void
  onComplete: () => void
}

const TOTAL_BURN_FRAMES = 25
const FRAME_W = 960
const FRAME_H = 720
const COLS = 5
const ROWS = 5

export function RenaissancePortalPreloader({ onBurnProgress, onComplete }: PortalPreloaderProps) {
  // 0 = Initial black + DaVinci Geometric Lines + Youcef Monogram / Youcef.dev
  // 1 = Spark ignition
  // 2 = Burning paper tearing & expanding into hero
  // 3 = Finished
  const [phase, setPhase] = useState<number>(0)
  const [isAssetsLoaded, setIsAssetsLoaded] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)
  const identityRef = useRef<HTMLDivElement | null>(null)
  const maskSheetRef = useRef<HTMLImageElement | null>(null)
  const emberSheetRef = useRef<HTMLImageElement | null>(null)

  const onBurnProgressRef = useRef(onBurnProgress)
  onBurnProgressRef.current = onBurnProgress
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  // Preload the two ultra-compact sprite sheets (mask_sheet: 84KB, ember_sheet: 605KB)
  useEffect(() => {
    let loaded = 0
    const checkDone = () => {
      loaded++
      if (loaded >= 2) setIsAssetsLoaded(true)
    }

    const mImg = new Image()
    mImg.src = '/burn/mask_sheet.webp?v=7'
    mImg.onload = checkDone
    mImg.onerror = checkDone
    maskSheetRef.current = mImg

    const eImg = new Image()
    eImg.src = '/burn/ember_sheet.webp?v=7'
    eImg.onload = checkDone
    eImg.onerror = checkDone
    emberSheetRef.current = eImg
  }, [])

  // Optimized Direct Canvas Render Function — capped DPR prevents mobile GPU fill-rate throttling
  const drawCanvas = (frame: number, progress: number, isDone: boolean) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    // Cap DPR at 1.75 on mobile (avoids rendering 4K buffers on 3x retina phones)
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75)
    const width = window.innerWidth
    const height = window.innerHeight
    const targetW = Math.round(width * dpr)
    const targetH = Math.round(height * dpr)

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW
      canvas.height = targetH
    }

    ctx.save()
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, width, height)

    if (isDone || frame >= TOTAL_BURN_FRAMES) {
      ctx.restore()
      return
    }

    // 1. Draw solid pitch black paper
    const canvasAlpha = progress > 0.95 ? Math.max(0, (1 - progress) / 0.05) : 1
    ctx.globalAlpha = canvasAlpha
    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, width, height)

    // 2. Punch the ragged hole and draw sizzling incandescent white rim
    if (frame >= 0 && frame < TOTAL_BURN_FRAMES) {
      const maskImg = maskSheetRef.current
      const emberImg = emberSheetRef.current

      const scale = Math.max(width / FRAME_W, height / FRAME_H)
      const drawW = FRAME_W * scale
      const drawH = FRAME_H * scale
      const drawX = (width - drawW) / 2
      const drawY = (height - drawH) / 2

      const c = frame % COLS
      const r = Math.floor(frame / COLS)
      const sx = c * FRAME_W
      const sy = r * FRAME_H

      if (maskImg && maskImg.complete && maskImg.naturalWidth > 0) {
        ctx.globalCompositeOperation = 'destination-out'
        ctx.globalAlpha = 1
        ctx.drawImage(maskImg, sx, sy, FRAME_W, FRAME_H, drawX, drawY, drawW, drawH)
      }

      if (emberImg && emberImg.complete && emberImg.naturalWidth > 0) {
        ctx.globalCompositeOperation = 'source-over'
        ctx.globalAlpha = 1
        ctx.drawImage(emberImg, sx, sy, FRAME_W, FRAME_H, drawX, drawY, drawW, drawH)

        ctx.globalCompositeOperation = 'screen'
        ctx.globalAlpha = 0.92
        ctx.drawImage(emberImg, sx, sy, FRAME_W, FRAME_H, drawX, drawY, drawW, drawH)
      }
    }

    ctx.restore()
  }

  // Initial draw and window resize handling
  useEffect(() => {
    drawCanvas(-1, 0, false)
    const handleResize = () => drawCanvas(-1, 0, false)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isAssetsLoaded])

  // Sequence progression — runs entirely in rAF with zero React re-renders during tear
  useEffect(() => {
    if (!isAssetsLoaded) return

    onBurnProgressRef.current?.(0)

    // 1. Blueprint screen sits quietly, sparks ignite at 650ms
    const sparkTimer = setTimeout(() => {
      setPhase(1)
      drawCanvas(0, 0, false)
    }, 650)

    // 2. Dynamic tearing runs for 1050ms
    const burnTimer = setTimeout(() => {
      setPhase(2)

      const burnStart = performance.now()
      const burnDuration = 1050

      let raf = 0
      const tick = (now: number) => {
        const elapsed = now - burnStart
        const rawProgress = Math.min(elapsed / burnDuration, 1)
        const easedProgress = 1 - Math.pow(1 - rawProgress, 2.2)

        onBurnProgressRef.current?.(easedProgress)

        // Dissolve blueprint lines and text smoothly
        const contentOpacity = easedProgress > 0 ? Math.max(0, 1 - easedProgress * 3.5) : 1
        if (svgRef.current) svgRef.current.style.opacity = String(contentOpacity)
        if (identityRef.current) identityRef.current.style.opacity = String(contentOpacity)

        const frameIdx = Math.min(
          Math.floor(rawProgress * TOTAL_BURN_FRAMES),
          TOTAL_BURN_FRAMES - 1
        )

        drawCanvas(frameIdx, easedProgress, false)

        if (rawProgress < 1) {
          raf = requestAnimationFrame(tick)
        } else {
          drawCanvas(TOTAL_BURN_FRAMES, 1, true)
          onBurnProgressRef.current?.(1)
          setTimeout(() => {
            setPhase(3)
            onCompleteRef.current()
          }, 60)
        }
      }
      raf = requestAnimationFrame(tick)

      return () => cancelAnimationFrame(raf)
    }, 750)

    return () => {
      clearTimeout(sparkTimer)
      clearTimeout(burnTimer)
    }
  }, [isAssetsLoaded])

  if (phase === 3) return null

  return (
    <div className="fixed inset-0 z-[999] overflow-hidden select-none pointer-events-none will-change-transform">
      {/* ================= CANVAS: BLACK PAPER + BURNING PAPER CUTOUT + EMBER RIM ================= */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block pointer-events-none z-10 will-change-transform"
      />

      {/* ================= DAVINCI GEOMETRIC DRAFTING LINES (NO "X" RAYS, NO CENTRAL BOX) ================= */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-15 will-change-transform"
        viewBox="0 0 1600 1200"
        preserveAspectRatio="xMidYMid slice"
        style={{
          opacity: 1,
          transition: 'opacity 0.25s ease-out',
        }}
      >
        <defs>
          <filter id="draftGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Horizontal Construction Axis with architectural left tick mark */}
        <motion.path
          d="M 367 338 L 1234 338"
          stroke="rgba(255, 255, 255, 0.65)"
          strokeWidth="1.2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Left vertical tick mark */}
        <motion.line
          x1="367"
          y1="328"
          x2="367"
          y2="348"
          stroke="rgba(255, 255, 255, 0.85)"
          strokeWidth="1.2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        />

        {/* 2. Upper Left Stepped Caliper Bracket */}
        <motion.path
          d="M 367 338 L 444 338 M 423 338 L 423 394 L 367 394 M 424 373 L 458 373 M 458 339 L 458 385"
          stroke="rgba(255, 255, 255, 0.5)"
          strokeWidth="1.2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* 3. Sweeping DaVinci Drafting Compass Arc in Upper Right Quadrant */}
        <motion.path
          d="M 1283 60 A 483 483 0 0 1 1025 548"
          stroke="rgba(255, 255, 255, 0.6)"
          strokeWidth="1.2"
          fill="none"
          filter="url(#draftGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* 4. Lower Right Stepped Perspective Drafting Lines */}
        <motion.path
          d="M 995 722 L 1599 722 M 1235 722 L 1235 1009 M 1144 813 L 1235 813 M 1143 722 L 1143 868 M 995 869 L 1235 869"
          stroke="rgba(255, 255, 255, 0.45)"
          strokeWidth="1.2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.95, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>

      {/* ================= PURE IDENTITY: YOUCEF LOGO + YOUCEF.DEV ================= */}
      <div
        ref={identityRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none will-change-transform"
        style={{
          opacity: 1,
          transition: 'opacity 0.25s ease-out',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center text-center gap-4"
        >
          {/* Prominent Youcef Monogram Logo with Warm Orange Gradient & Glow */}
          <div className="relative flex items-center justify-center">
            {/* Ambient warm orange radiant bloom */}
            <div className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(242,101,34,0.4)_0%,rgba(242,101,34,0.15)_50%,transparent_75%)] blur-xl pointer-events-none animate-pulse" />

            <svg
              width={76}
              height={76}
              viewBox="0 0 120 120"
              fill="none"
              className="relative z-10 filter drop-shadow-[0_0_20px_rgba(242,101,34,0.7)] drop-shadow-[0_0_40px_rgba(242,101,34,0.35)] drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            >
              <defs>
                <linearGradient id="logoWarmOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="35%" stopColor="#FFF2E8" />
                  <stop offset="70%" stopColor="#FF8542" />
                  <stop offset="100%" stopColor="#F26522" />
                </linearGradient>
              </defs>
              <path fillRule="evenodd" clipRule="evenodd" d={LOGO_PATH} fill="url(#logoWarmOrangeGrad)" />
            </svg>
            {/* Subtle celestial breathing halo with warm orange tint */}
            <span className="absolute -inset-3 rounded-full border border-[#F26522]/40 shadow-[0_0_16px_rgba(242,101,34,0.3)] animate-pulse pointer-events-none" />
          </div>

          {/* Youcef.dev Typography */}
          <div className="flex flex-col items-center mt-1">
            <h1 className="font-manrope font-bold text-white tracking-[0.24em] text-[24px] sm:text-[28px] md:text-[32px] uppercase drop-shadow-[0_2px_20px_rgba(242,101,34,0.35)]">
              YOUCEF.DEV
            </h1>
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.3em] text-[#FF9E66]/90 uppercase mt-1">
              WEB &amp; AI STUDIO
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
