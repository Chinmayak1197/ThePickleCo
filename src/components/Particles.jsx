import { useEffect, useRef } from 'react'

const N = 70

export default function Particles({ phase }) {
  const canvasRef = useRef(null)
  const partsRef = useRef(
    Array.from({ length: N }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.4 + Math.random() * 1.4,
      vx: (Math.random() - 0.5) * 0.00012,
      vy: -0.00008 - Math.random() * 0.00018,
      a: 0.06 + Math.random() * 0.28,
      c: Math.random() < 0.55 ? [80, 220, 20] : [244, 163, 0],
    }))
  )
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    const ctx = canvas.getContext('2d')

    function resize() {
      canvas.width  = window.innerWidth  * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width  = window.innerWidth  + 'px'
      canvas.style.height = window.innerHeight + 'px'
    }
    resize()
    window.addEventListener('resize', resize)

    function loop() {
      const W = canvas.width  / dpr
      const H = canvas.height / dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, W, H)

      partsRef.current.forEach(p => {
        p.y += p.vy; p.x += p.vx
        if (p.y < -0.02) p.y = 1.02
        if (p.x < -0.01) p.x = 1.01
        if (p.x >  1.01) p.x = -0.01
        ctx.beginPath()
        ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.c[0]},${p.c[1]},${p.c[2]},${p.a})`
        ctx.fill()
      })

      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}
    />
  )
}
