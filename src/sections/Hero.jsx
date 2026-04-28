import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

export default function Hero() {
  const [textPhase, setTextPhase] = useState(0)
  const videoRef   = useRef(null)
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({ target: sectionRef })
  const videoScale   = useTransform(scrollYProgress, [0, 1],    [1, 1.1])
  const videoOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    vid.play().catch(() => {})
    const timers = [
      setTimeout(() => setTextPhase(1), 600),
      setTimeout(() => setTextPhase(2), 1200),
      setTimeout(() => setTextPhase(3), 2000),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <section ref={sectionRef} id="hero" style={{
      position: 'relative', width: '100%', height: '100vh',
      background: '#000', overflow: 'hidden',
    }}>
      {/* Fullscreen video */}
      <motion.div style={{ position: 'absolute', inset: 0, scale: videoScale, opacity: videoOpacity }}>
        <video
          ref={videoRef}
          autoPlay muted loop playsInline
          poster="/mango_poster.jpg"
          preload="auto"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <source src="/mango_mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
          <source src="/mango_ai.mp4"     type="video/mp4" />
        </video>
      </motion.div>

      {/* Vignette overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 65% 55% at 50% 50%, transparent 25%, rgba(0,0,0,0.3) 100%),
          linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, transparent 18%, transparent 65%, rgba(0,0,0,0.85) 100%)
        `,
      }} />

      {/* Brand text */}
      <div style={{
        position: 'absolute', zIndex: 10,
        bottom: 90, left: 0, right: 0,
        textAlign: 'center', padding: '0 24px',
      }}>
        <AnimatePresence>
          {textPhase >= 1 && (
            <motion.div key="badge"
              style={{
                display: 'inline-block',
                background: 'rgba(244,163,0,0.12)', border: '1px solid rgba(244,163,0,0.35)',
                color: '#FFD166', fontSize: 10, fontWeight: 700,
                letterSpacing: '3px', textTransform: 'uppercase',
                padding: '6px 16px', borderRadius: 100, marginBottom: 14,
              }}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Handcrafted · All Natural · Since 2023
            </motion.div>
          )}

          {textPhase >= 2 && (
            <motion.div key="headline">
              <motion.h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(36px,10vw,108px)',
                  fontWeight: 900, color: '#fff', lineHeight: 1.05,
                  textShadow: '0 4px 40px rgba(0,0,0,0.6), 0 0 80px rgba(244,163,0,0.15)',
                  marginBottom: 8, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 0.25em',
                }}
              >
                {['Acchar', 'By'].map((word, i) => (
                  <motion.span key={word}
                    initial={{ opacity: 0, y: 40, rotateX: -20 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    style={{ display: 'inline-block' }}
                  >{word}</motion.span>
                ))}
                <motion.em
                  initial={{ opacity: 0, y: 40, rotateX: -20 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  style={{ fontStyle: 'normal', color: '#F4A300', display: 'inline-block' }}
                >Nidhi</motion.em>
              </motion.h1>
              <motion.p
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: 'clamp(16px,4vw,32px)',
                  color: 'rgba(255,255,255,0.75)', marginBottom: 24,
                }}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Straight from Nidhi's Kitchen
              </motion.p>
            </motion.div>
          )}

          {textPhase >= 3 && (
            <motion.a key="cta" href="#order"
              style={{
                display: 'inline-block',
                background: '#F4A300', color: '#0C2416',
                fontWeight: 700, fontSize: 13, letterSpacing: '2px',
                textTransform: 'uppercase', textDecoration: 'none',
                padding: '14px 36px', borderRadius: 100,
                boxShadow: '0 6px 28px rgba(244,163,0,0.5)',
              }}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7 }}
              whileHover={{ background: '#FFD166', y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              Order Now
            </motion.a>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll hint */}
      <AnimatePresence>
        {textPhase >= 3 && (
          <motion.div key="scroll"
            style={{
              position: 'absolute', bottom: 26, left: '50%', transform: 'translateX(-50%)',
              zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              color: 'rgba(255,255,255,0.3)', fontSize: 10, letterSpacing: '3px',
              textTransform: 'uppercase', fontFamily: 'Lato, sans-serif', fontWeight: 700,
            }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <span>Scroll</span>
            <motion.div
              style={{
                width: 16, height: 16,
                borderRight: '2px solid rgba(255,255,255,0.3)',
                borderBottom: '2px solid rgba(255,255,255,0.3)',
                rotate: 45,
              }}
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
