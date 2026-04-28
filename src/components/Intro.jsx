import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Intro({ onDone }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400)
    const t2 = setTimeout(() => setPhase(2), 1600)
    const t3 = setTimeout(() => { setPhase(3); onDone?.() }, 2400)
    return () => [t1, t2, t3].forEach(clearTimeout)
  }, [onDone])

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            background: '#0C2416',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <div style={{ textAlign: 'center', overflow: 'hidden' }}>
            <motion.div
              initial={{ y: '100%' }}
              animate={phase >= 1 ? { y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(32px, 8vw, 80px)',
                fontWeight: 900, color: '#fff',
                letterSpacing: '-0.02em',
              }}
            >
              Acchar By <em style={{ fontStyle: 'normal', color: '#F4A300' }}>Nidhi</em>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: 'clamp(14px, 3vw, 22px)',
                color: 'rgba(255,255,255,0.5)', marginTop: 8,
              }}
            >
              Straight from Nidhi's Kitchen
            </motion.div>
          </div>

          {/* Gold line that fills */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={phase >= 1 ? { scaleX: 1 } : {}}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: 3, background: '#F4A300',
              originX: 0,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
