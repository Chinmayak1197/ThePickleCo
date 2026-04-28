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
      }}
    >
      <svg width="30" height="40" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Jar lid */}
        <rect x="7" y="2" width="16" height="5" rx="2" fill="#c8860a"/>
        <rect x="5" y="5" width="20" height="3" rx="1.5" fill="#F4A300"/>
        {/* Jar body */}
        <rect x="4" y="8" width="22" height="26" rx="4" fill="#e8f5e0"/>
        {/* Achaar filling */}
        <rect x="4" y="16" width="22" height="18" rx="0" fill="#c8860a" opacity="0.85"/>
        <rect x="4" y="20" width="22" height="14" rx="0" fill="#b87333" opacity="0.7"/>
        {/* Mango chunks */}
        <rect x="8"  y="22" width="5" height="4" rx="1.5" fill="#F4A300" opacity="0.9"/>
        <rect x="16" y="24" width="5" height="4" rx="1.5" fill="#FFD166" opacity="0.9"/>
        <rect x="10" y="28" width="4" height="3" rx="1"   fill="#F4A300" opacity="0.8"/>
        {/* Jar shine */}
        <rect x="7" y="9" width="3" height="14" rx="1.5" fill="rgba(255,255,255,0.25)"/>
        {/* Jar outline */}
        <rect x="4" y="8" width="22" height="26" rx="4" stroke="#2D7A50" strokeWidth="1.2" fill="none"/>
        {/* Bottom */}
        <rect x="6" y="34" width="18" height="2" rx="1" fill="#2D7A50" opacity="0.4"/>
      </svg>
    </motion.div>
  )
}
