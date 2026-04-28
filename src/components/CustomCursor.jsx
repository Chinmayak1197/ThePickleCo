import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const velX = useRef(0)
  const velY = useRef(0)
  const lastX = useRef(0)
  const lastY = useRef(0)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { damping: 32, stiffness: 500 })
  const springY = useSpring(y, { damping: 32, stiffness: 500 })

  const scaleX = useSpring(1, { damping: 20, stiffness: 300 })
  const scaleY = useSpring(1, { damping: 20, stiffness: 300 })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const move = (e) => {
      velX.current = e.clientX - lastX.current
      velY.current = e.clientY - lastY.current
      lastX.current = e.clientX
      lastY.current = e.clientY

      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)

      // Stretch in direction of movement
      const speed = Math.sqrt(velX.current ** 2 + velY.current ** 2)
      const stretch = Math.min(1 + speed * 0.04, 1.6)
      const squeeze = Math.max(1 / stretch, 0.65)
      const angle = Math.atan2(velY.current, velX.current)
      const isHoriz = Math.abs(Math.cos(angle)) > 0.5
      scaleX.set(isHoriz ? stretch : squeeze)
      scaleY.set(isHoriz ? squeeze : stretch)
    }

    const over = (e) => {
      setHovered(!!e.target.closest('a, button, [data-cursor-hover]'))
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [visible, x, y, scaleX, scaleY])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null

  return (
    <>
      {/* Outer morphing ring */}
      <motion.div
        style={{
          x: springX, y: springY,
          translateX: '-50%', translateY: '-50%',
          scaleX, scaleY,
          position: 'fixed', top: 0, left: 0, zIndex: 9999,
          pointerEvents: 'none',
          width: hovered ? 52 : 36,
          height: hovered ? 52 : 36,
          border: `1.5px solid ${hovered ? '#F4A300' : 'rgba(244,163,0,0.7)'}`,
          borderRadius: '50%',
          opacity: visible ? 1 : 0,
          transition: 'width 0.25s ease, height 0.25s ease, border-color 0.2s ease',
          mixBlendMode: 'difference',
        }}
      />
      {/* Inner dot — snaps instantly */}
      <motion.div
        style={{
          x, y,
          translateX: '-50%', translateY: '-50%',
          position: 'fixed', top: 0, left: 0, zIndex: 9999,
          pointerEvents: 'none',
          width: hovered ? 6 : 4,
          height: hovered ? 6 : 4,
          background: '#F4A300',
          borderRadius: '50%',
          opacity: visible ? 1 : 0,
          transition: 'width 0.2s, height 0.2s',
        }}
      />
    </>
  )
}
