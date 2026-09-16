import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useScroll } from 'motion/react'

const TOTAL_BURN_FRAMES = 25
const FRAME_W = 960
const FRAME_H = 720
const COLS = 5

let sharedMaskImg: HTMLImageElement | null = null
let sharedEmberImg: HTMLImageElement | null = null

function loadSharedBurnAssets() {
  if (typeof window === 'undefined') return { maskImg: null, emberImg: null }
  if (!sharedMaskImg) {
    sharedMaskImg = new Image()
    sharedMaskImg.src = '/burn/mask_sheet.webp?v=7'
  }
  if (!sharedEmberImg) {
    sharedEmberImg = new Image()
    sharedEmberImg.src = '/burn/ember_sheet.webp?v=7'
  }
  return { maskImg: sharedMaskImg, emberImg: sharedEmberImg }
}

interface ScrollBurnTransitionProps {
  /** The color of the paper being burned away (e.g. '#F26522' or '#0B0604') */
  burnColor: string
  /** Background layer revealed underneath the burning hole */
  underlay: ReactNode
  /** Overall container height to control scroll duration, e.g. '140vh' */
  height?: string
  className?: string
}

export function ScrollBurnTransition({
  burnColor,
  underlay,
  height = '140vh',
  className = '',
}: ScrollBurnTransitionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [assetsReady, setAssetsReady] = useState(false)

  // Track scroll through the pinned container: 0 at start, 1 when finished
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Preload and verify burn sprite sheets
  useEffect(() => {
    const { maskImg, emberImg } = loadSharedBurnAssets()
    if (!maskImg || !emberImg) return

    let loaded = 0
    const check = () => {
      loaded++
      if (loaded >= 2 || (maskImg.complete && emberImg.complete)) {
        setAssetsReady(true)
      }
    }

    if (maskImg.complete && emberImg.complete) {
      setAssetsReady(true)
    } else {
      maskImg.onload = check
      maskImg.onerror = check
      emberImg.onload = check
      emberImg.onerror = check
    }
  }, [])

  // Canvas render loop driven by scroll progression
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let rafId = 0

    const render = () => {
      const progress = Math.max(0, Math.min(scrollYProgress.get(), 1))

      const dpr = window.devicePixelRatio || 1
      const width = window.innerWidth
      const height = window.innerHeight

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr
        canvas.height = height * dpr
      }

      ctx.save()
      ctx.scale(dpr, dpr)
      ctx.clearRect(0, 0, width, height)

      // If fully burned, clear completely
      if (progress >= 0.99) {
        ctx.restore()
        return
      }

      // 1. Solid paper layer (dissolves cleanly at very end: 0.92 -> 0.99)
      const paperAlpha = progress > 0.92 ? Math.max(0, (0.99 - progress) / 0.07) : 1
      ctx.globalAlpha = paperAlpha
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = burnColor
      ctx.fillRect(0, 0, width, height)

      // 2. Punch the burning hole and overlay incandescent sizzling embers
      if (progress > 0) {
        const { maskImg, emberImg } = loadSharedBurnAssets()

        // Map progress across frames 0 to 24
        const normalizedProg = Math.min(progress / 0.92, 1)
        const frameIdx = Math.min(Math.floor(normalizedProg * TOTAL_BURN_FRAMES), TOTAL_BURN_FRAMES - 1)

        const c = frameIdx % COLS
        const r = Math.floor(frameIdx / COLS)
        const sx = c * FRAME_W
        const sy = r * FRAME_H

        // Cover scaling to fill the entire viewport
        const scale = Math.max(width / FRAME_W, height / FRAME_H)
        const drawW = FRAME_W * scale
        const drawH = FRAME_H * scale
        const drawX = (width - drawW) / 2
        const drawY = (height - drawH) / 2

        if (maskImg && maskImg.complete && maskImg.naturalWidth > 0) {
          // Punch organic hole through paper
          ctx.globalCompositeOperation = 'destination-out'
          ctx.globalAlpha = 1
          ctx.drawImage(maskImg, sx, sy, FRAME_W, FRAME_H, drawX, drawY, drawW, drawH)
        }

        if (emberImg && emberImg.complete && emberImg.naturalWidth > 0) {
          // Sizzling incandescent embers along burning rim
          ctx.globalCompositeOperation = 'source-over'
          ctx.globalAlpha = paperAlpha
          ctx.drawImage(emberImg, sx, sy, FRAME_W, FRAME_H, drawX, drawY, drawW, drawH)

          // Additive glow bloom pass for intense incandescent burning edge
          ctx.globalCompositeOperation = 'screen'
          ctx.globalAlpha = 0.95 * paperAlpha
          ctx.drawImage(emberImg, sx, sy, FRAME_W, FRAME_H, drawX, drawY, drawW, drawH)
        }
      }

      ctx.restore()
    }

    // Subscribe to Framer Motion scroll changes
    const unsubscribe = scrollYProgress.on('change', () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(render)
    })

    // Initial render
    render()

    const handleResize = () => render()
    window.addEventListener('resize', handleResize)

    return () => {
      unsubscribe()
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', handleResize)
    }
  }, [burnColor, assetsReady])

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ height }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden select-none">
        {/* Underlay revealed underneath the burning hole */}
        <div className="absolute inset-0 w-full h-full z-0">
          {underlay}
        </div>

        {/* Canvas with burning paper and sizzling glowing embers */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />
      </div>
    </div>
  )
}
