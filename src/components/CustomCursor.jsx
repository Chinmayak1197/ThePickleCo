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
    <motion.div
      style={{
        x: springX, y: springY,
        translateX: '-50%', translateY: '-50%',
        position: 'fixed', top: 0, left: 0, zIndex: 9999,
        pointerEvents: 'none',
        opacity: visible ? 1 : 0,
        scale: hovered ? 1.4 : 1,
        transition: 'opacity 0.3s, scale 0.2s',
        rotate: 30,
      }}
    >
      <svg width="28" height="44" viewBox="0 0 28 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Main pickle body */}
        <ellipse cx="14" cy="22" rx="11" ry="19" fill="#4a8c3f"/>
        {/* Highlight */}
        <ellipse cx="14" cy="22" rx="9" ry="17" fill="#5aa64e"/>
        {/* Bumps */}
        <circle cx="9"  cy="14" r="2.2" fill="#3d7a34"/>
        <circle cx="18" cy="11" r="1.8" fill="#3d7a34"/>
        <circle cx="7"  cy="22" r="2"   fill="#3d7a34"/>
        <circle cx="19" cy="19" r="2.2" fill="#3d7a34"/>
        <circle cx="11" cy="30" r="2"   fill="#3d7a34"/>
        <circle cx="19" cy="29" r="1.8" fill="#3d7a34"/>
        <circle cx="13" cy="20" r="1.5" fill="#3d7a34"/>
        {/* Top cap */}
        <ellipse cx="14" cy="4"  rx="5"  ry="2.5" fill="#2d5c26"/>
        {/* Bottom cap */}
        <ellipse cx="14" cy="40" rx="5"  ry="2.5" fill="#2d5c26"/>
        {/* Shine */}
        <ellipse cx="10" cy="16" rx="2"  ry="5"   fill="rgba(255,255,255,0.18)" transform="rotate(-10 10 16)"/>
      </svg>
    </motion.div>
  )
}
