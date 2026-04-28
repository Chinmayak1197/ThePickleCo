import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { damping: 28, stiffness: 600 })
  const springY = useSpring(y, { damping: 28, stiffness: 600 })

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const over = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) setHovered(true)
      else setHovered(false)
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [visible, x, y])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null

  return (
    <>
      {/* Outer ring */}
      <motion.div
        style={{
          x: springX, y: springY,
          translateX: '-50%', translateY: '-50%',
          position: 'fixed', top: 0, left: 0, zIndex: 9999,
          pointerEvents: 'none',
          width: hovered ? 48 : 32,
          height: hovered ? 48 : 32,
          border: `2px solid ${hovered ? '#F4A300' : 'rgba(244,163,0,0.6)'}`,
          borderRadius: '50%',
          opacity: visible ? 1 : 0,
          transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease',
        }}
      />
      {/* Inner dot */}
      <motion.div
        style={{
          x, y,
          translateX: '-50%', translateY: '-50%',
          position: 'fixed', top: 0, left: 0, zIndex: 9999,
          pointerEvents: 'none',
          width: 5, height: 5,
          background: '#F4A300',
          borderRadius: '50%',
          opacity: visible ? 1 : 0,
        }}
      />
    </>
  )
}
