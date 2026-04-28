import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ScrollBanner({ text, direction = 1, bg = '#0C2416', color = '#F4A300' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], [direction * -120, direction * 120])

  const repeated = Array(6).fill(text).join('  ·  ') + '  ·  '

  return (
    <div ref={ref} style={{
      background: bg, padding: '20px 0', overflow: 'hidden',
      borderTop: `1px solid ${color}22`, borderBottom: `1px solid ${color}22`,
    }}>
      <motion.div style={{ x, whiteSpace: 'nowrap', willChange: 'transform' }}>
        <span style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(28px, 5vw, 52px)',
          fontWeight: 900, color, letterSpacing: '-0.01em',
          textTransform: 'uppercase', opacity: 0.9,
        }}>
          {repeated}
        </span>
      </motion.div>
    </div>
  )
}
