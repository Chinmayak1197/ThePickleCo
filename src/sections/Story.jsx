import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

function LineReveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <div ref={ref} style={{ overflow: 'hidden', ...style }}>
      <motion.div
        initial={{ y: '110%' }}
        animate={inView ? { y: 0 } : {}}
        transition={{ duration: 0.9, delay, ease: [0.76, 0, 0.24, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default function Story() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-60px' })

  return (
    <section ref={sectionRef} id="story" className="section-pad" style={{
      background: '#0C2416', color: '#fff',
      padding: '100px 24px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Subtle parallax background texture */}
      <motion.div style={{
        position: 'absolute', inset: '-10%', y: bgY, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 60% at 80% 50%, rgba(45,122,79,0.18) 0%, transparent 70%)',
      }} />

      <div className="story-flex" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 64, flexWrap: 'wrap', maxWidth: 1100, margin: '0 auto', position: 'relative',
      }}>
        <div style={{ maxWidth: 520, flex: '1 1 300px' }}>
          <LineReveal delay={0}>
            <div style={{
              display: 'inline-block', background: 'rgba(244,163,0,0.13)', color: '#FFD166',
              fontSize: 10, fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase',
              padding: '6px 18px', borderRadius: 100, marginBottom: 14,
            }}>Our Story</div>
          </LineReveal>

          <LineReveal delay={0.08}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,5vw,56px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: 6 }}>
              Made with Love.
            </h2>
          </LineReveal>
          <LineReveal delay={0.14} style={{ marginBottom: 28 }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,5vw,56px)', fontWeight: 700, color: '#F4A300', lineHeight: 1.1 }}>
              Served with Pride.
            </h2>
          </LineReveal>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15, lineHeight: 1.9, marginBottom: 16 }}
          >
            In 2023, Nidhi Khamesra started making keri achaar in her kitchen — the same way she'd watched it made growing up from her Mom. Hand-cut keri pieces, cold-pressed mustard oil, freshly ground spices.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.32 }}
            style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15, lineHeight: 1.9 }}
          >
            What started as jars for family and friends quickly grew into something bigger. Today, Acchar By Nidhi delivers across India — no preservatives, no shortcuts, just real homemade achaar.
          </motion.p>

          <div ref={statsRef} className="stats-row" style={{ display: 'flex', gap: 40, marginTop: 48, flexWrap: 'wrap' }}>
            {[['2023','Est. Year'],['2','Varieties'],['50+','Orders Placed']].map(([val, label], i) => (
              <motion.div key={label}
                initial={{ opacity: 0, y: 40 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.14, ease: [0.16, 1, 0.3, 1] }}
              >
                <strong style={{ display: 'block', fontFamily: "'Playfair Display',serif", fontSize: 'clamp(36px,6vw,52px)', fontWeight: 900, color: '#F4A300', lineHeight: 1 }}>{val}</strong>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '2.5px', textTransform: 'uppercase', marginTop: 4, display: 'block' }}>{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
