import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function SectionDivider({ items }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref} style={{
      background: '#0C2416', padding: '28px 24px',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      gap: 'clamp(20px, 5vw, 60px)', flexWrap: 'wrap',
    }}>
      {items.map((item, i) => (
        <motion.div
          key={i}
          style={{ display: 'flex', alignItems: 'center', gap: 10 }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span style={{ fontSize: 18 }}>{item.icon}</span>
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '3px',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)',
          }}>{item.label}</span>
          {i < items.length - 1 && (
            <span style={{ marginLeft: 'clamp(20px, 5vw, 60px)', color: 'rgba(244,163,0,0.3)', fontSize: 16 }}>✦</span>
          )}
        </motion.div>
      ))}
    </div>
  )
}
