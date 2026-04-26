import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Story() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="story" className="section-pad" style={{
      background: '#0C2416', color: '#fff',
      padding: '80px 24px',
    }}>
      <div className="story-flex" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 64, flexWrap: 'wrap', maxWidth: 1100, margin: '0 auto',
      }}>
        <motion.div ref={ref}
          style={{ maxWidth: 490, flex: '1 1 300px' }}
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{
            display: 'inline-block', background: 'rgba(244,163,0,0.13)', color: '#FFD166',
            fontSize: 10, fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase',
            padding: '6px 18px', borderRadius: 100, marginBottom: 14,
          }}>Our Story</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(26px,5vw,52px)', fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: 14 }}>
            Made with Love.<br />Served with Pride.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, lineHeight: 1.85, marginBottom: 16 }}>
            In 2023, Nidhi Khamesra started making keri achaar in her kitchen — the same way she'd watched it made growing up. Hand-cut keri pieces, cold-pressed mustard oil, freshly ground spices.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, lineHeight: 1.85 }}>
            What started as jars for family and friends quickly grew into something bigger. Today, Acchar By Nidhi delivers across India — no preservatives, no shortcuts, just real homemade achaar.
          </p>

          <div className="stats-row" style={{ display: 'flex', gap: 36, marginTop: 40, flexWrap: 'wrap' }}>
            {[['2023','Est. Year'],['5','Varieties'],['50+','Orders Placed']].map(([val, label]) => (
              <motion.div key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <strong style={{ display: 'block', fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px,6vw,44px)', fontWeight: 900, color: '#F4A300', lineHeight: 1 }}>{val}</strong>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', letterSpacing: '2px', textTransform: 'uppercase' }}>{label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
