import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

export type SwarmBox = { x: number; y: number; w: number; h: number; word: string }

/*
 * Live "machine vision" overlay: boxes anchored to key objects in the art,
 * trembling in place while confidence numbers flicker. Each box carries a
 * mosaic patch sampled from the painting itself (cover-fit math, no CORS
 * needed since pixels are never read back).
 */
export default function TrackingSwarm({
  imgRef,
  boxes,
  bias = [0.5, 0.5],
  pairs = [[0, 3], [1, 4], [2, 6]],
}: {
  imgRef: RefObject<HTMLImageElement | null>
  boxes: SwarmBox[]
  bias?: [number, number]
  pairs?: [number, number][]
}) {
  const trackRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = trackRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const off = document.createElement('canvas')
    off.width = 12
    off.height = 12
    const octx = off.getContext('2d')
    if (!octx) return
    let raf = 0
    let last = 0
    const rnd = (a: number, b: number) => a + Math.random() * (b - a)

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      if (now - last < 100) return
      last = now
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (!w || !h) return
      if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
        canvas.width = Math.floor(w * dpr)
        canvas.height = Math.floor(h * dpr)
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      const img = imgRef.current
      const canSample = !!img && img.complete && img.naturalWidth > 0
      let scale = 0
      let ox = 0
      let oy = 0
      if (canSample && img) {
        scale = Math.max(w / img.naturalWidth, h / img.naturalHeight)
        ox = (w - img.naturalWidth * scale) * bias[0]
        oy = (h - img.naturalHeight * scale) * bias[1]
      }

      const centers: { x: number; y: number }[] = []
      boxes.forEach((b) => {
        if (Math.random() < 0.06) return // occasional flicker
        const cx = b.x * w + rnd(-4, 4)
        const cy = b.y * h + rnd(-4, 4)
        const bw = b.w + rnd(-3, 3)
        const bh = b.h + rnd(-3, 3)
        const x = cx - bw / 2
        const y = cy - bh / 2
        centers.push({ x: cx, y: cy })

        if (canSample && img && scale > 0) {
          const mw = bw * 0.52
          const mh = bh * 0.5
          const mx = cx - mw / 2
          const my = cy - mh / 2
          const sx = (mx - ox) / scale
          const sy = (my - oy) / scale
          const sw = mw / scale
          const sh = mh / scale
          if (sx > 0 && sy > 0 && sx + sw < img.naturalWidth && sy + sh < img.naturalHeight) {
            octx.drawImage(img, sx, sy, sw, sh, 0, 0, 12, 12)
            ctx.imageSmoothingEnabled = false
            ctx.drawImage(off, 0, 0, 12, 12, mx, my, mw, mh)
            ctx.imageSmoothingEnabled = true
          }
        }

        ctx.strokeStyle = 'rgba(255,255,255,0.65)'
        ctx.lineWidth = 1
        ctx.strokeRect(x, y, bw, bh)

        const label = `${b.word} ${Math.random().toFixed(4)}`
        ctx.font = '9px ui-monospace, Menlo, monospace'
        const tw = ctx.measureText(label).width
        ctx.fillStyle = 'rgba(0,0,0,0.45)'
        ctx.fillRect(x, y - 17, tw + 10, 15)
        ctx.fillStyle = 'rgba(255,255,255,0.95)'
        ctx.fillText(label, x + 5, y - 5)

        ctx.fillStyle = 'rgba(255,255,255,0.85)'
        ctx.fillText(`${Math.floor(rnd(0, 9))}.${Math.floor(rnd(1000, 9999))}`, x + 2, y + bh + 13)
      })

      ctx.strokeStyle = 'rgba(255,255,255,0.4)'
      ctx.lineWidth = 1
      pairs.forEach(([a, c]) => {
        if (centers[a] && centers[c]) {
          ctx.beginPath()
          ctx.moveTo(centers[a].x, centers[a].y)
          ctx.lineTo(centers[c].x, centers[c].y)
          ctx.stroke()
        }
      })
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [imgRef, boxes, bias, pairs])

  return <canvas ref={trackRef} className="absolute inset-0 z-[2] w-full h-full pointer-events-none" />
}
