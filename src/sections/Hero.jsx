import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

function LineReveal({ children, delay = 0, style = {} }) {
  return (
    <div style={{ overflow: 'hidden', ...style }}>
      <motion.div
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease: [0.76, 0, 0.24, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}

function MagneticButton({ children, href }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    setPos({ x: (e.clientX - cx) * 0.35, y: (e.clientY - cy) * 0.35 })
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      whileTap={{ scale: 0.95 }}
      style={{
        display: 'inline-block',
        background: '#F4A300', color: '#0C2416',
        fontWeight: 700, fontSize: 13, letterSpacing: '2px',
        textTransform: 'uppercase', textDecoration: 'none',
        padding: '16px 44px', borderRadius: 100,
        boxShadow: '0 8px 32px rgba(244,163,0,0.45)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <motion.span
        style={{ position: 'relative', zIndex: 1 }}
        whileHover={{ letterSpacing: '3px' }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.span>
      <motion.div
        initial={{ scale: 0, x: '-50%', y: '-50%' }}
        whileHover={{ scale: 3 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 60, height: 60, borderRadius: '50%',
          background: '#FFD166', zIndex: 0,
        }}
      />
    </motion.a>
  )
}

export default function Hero() {
  const [textPhase, setTextPhase] = useState(0)
  const videoRef   = useRef(null)
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({ target: sectionRef })
  const videoScale   = useTransform(scrollYProgress, [0, 1],    [1, 1.15])
  const videoOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])
  const textY        = useTransform(scrollYProgress, [0, 1],    [0, -80])

  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    vid.play().catch(() => {})
    const timers = [
      setTimeout(() => setTextPhase(1), 400),
      setTimeout(() => setTextPhase(2), 700),
      setTimeout(() => setTextPhase(3), 1600),
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
          radial-gradient(ellipse 65% 55% at 50% 50%, transparent 25%, rgba(0,0,0,0.25) 100%),
          linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 20%, transparent 55%, rgba(0,0,0,0.9) 100%)
        `,
      }} />

      {/* Brand text */}
      <motion.div style={{
        position: 'absolute', zIndex: 10, y: textY,
        bottom: 100, left: 0, right: 0,
        textAlign: 'center', padding: '0 24px',
      }}>
        {textPhase >= 1 && (
          <LineReveal delay={0} style={{ marginBottom: 14 }}>
            <span style={{
              display: 'inline-block',
              background: 'rgba(244,163,0,0.12)', border: '1px solid rgba(244,163,0,0.35)',
              color: '#FFD166', fontSize: 10, fontWeight: 700,
              letterSpacing: '4px', textTransform: 'uppercase',
              padding: '6px 16px', borderRadius: 100,
            }}>
              Handcrafted · All Natural · Since 2023
            </span>
          </LineReveal>
        )}

        {textPhase >= 2 && (
          <>
            <LineReveal delay={0.05} style={{ marginBottom: 6 }}>
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(40px,11vw,120px)',
                fontWeight: 900, color: '#fff', lineHeight: 1,
                textShadow: '0 4px 40px rgba(0,0,0,0.5)',
              }}>
                Acchar By <em style={{ fontStyle: 'normal', color: '#F4A300' }}>Nidhi</em>
              </h1>
            </LineReveal>

            <LineReveal delay={0.18} style={{ marginBottom: 32 }}>
              <p style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: 'clamp(16px,4vw,30px)',
                color: 'rgba(255,255,255,0.65)',
              }}>
                Straight from Nidhi's Kitchen
              </p>
            </LineReveal>
          </>
        )}

        {textPhase >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <MagneticButton href="#order">Order Now</MagneticButton>
          </motion.div>
        )}
      </motion.div>

      {/* Scroll hint */}
      {textPhase >= 3 && (
        <motion.div
          style={{
            position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
            zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            color: 'rgba(255,255,255,0.3)', fontSize: 10, letterSpacing: '3px',
            textTransform: 'uppercase', fontFamily: 'Lato, sans-serif', fontWeight: 700,
          }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <span>Scroll</span>
          <motion.div
            style={{
              width: 1, height: 40,
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)',
            }}
            animate={{ scaleY: [0, 1, 0], originY: 0 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </section>
  )
}
