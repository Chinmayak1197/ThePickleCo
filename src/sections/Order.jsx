import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const WA_ICON = (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

export default function Order() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="order" className="section-pad" style={{
      background: 'linear-gradient(135deg, #0c2416 0%, #1a4330 50%, #0c2416 100%)',
      padding: '80px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(244,163,0,0.12) 0%, transparent 60%)',
      }} />

      <motion.div ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{ position: 'relative', zIndex: 2 }}
      >
        <div style={{
          display: 'inline-block', background: 'rgba(244,163,0,0.13)', color: '#FFD166',
          fontSize: 10, fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase',
          padding: '6px 18px', borderRadius: 100, marginBottom: 14,
        }}>Order Now</div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(26px,5vw,52px)', fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: 14 }}>
          Ready to Order?
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, maxWidth: 460, margin: '0 auto 40px', padding: '0 16px' }}>
          Fresh batches made to order. Call or WhatsApp Nidhi directly — we deliver across India.
        </p>

        <motion.div
          className="order-card"
          style={{
            display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 24,
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(244,163,0,0.2)',
            borderRadius: 28, padding: '40px 40px', backdropFilter: 'blur(10px)',
            maxWidth: 440, width: '100%',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div style={{ fontSize: 48 }}>🫙</div>
          <div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
              Nidhi Khamesra
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Founder · Acchar By Nidhi
            </div>
          </div>

          <motion.div
            style={{
              display: 'flex', alignItems: 'center', gap: 14, width: '100%', justifyContent: 'center',
              background: 'rgba(244,163,0,0.1)', border: '1px solid rgba(244,163,0,0.3)',
              borderRadius: 14, padding: '14px 20px', cursor: 'pointer',
            }}
            onClick={() => window.location = 'tel:+917016102930'}
            whileHover={{ background: 'rgba(244,163,0,0.18)', borderColor: 'rgba(244,163,0,0.5)' }}
          >
            <div>
              <div className="order-phone-num" style={{ fontSize: 20, fontWeight: 700, color: '#F4A300', letterSpacing: 1 }}>+91 70161 02930</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '2px', textTransform: 'uppercase', marginTop: 2 }}>Call to Order</div>
            </div>
          </motion.div>

          <motion.a
            href="https://wa.me/917016102930?text=Hi%20Nidhi!%20I%20want%20to%20order%20Acchar%20%F0%9F%A5%AD"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: '#25D366', color: '#fff', fontWeight: 700, fontSize: 14,
              letterSpacing: '1.5px', textTransform: 'uppercase', textDecoration: 'none',
              padding: '14px 32px', borderRadius: 100, width: '100%', justifyContent: 'center',
              boxShadow: '0 6px 24px rgba(37,211,102,0.4)',
            }}
            whileHover={{ y: -3, boxShadow: '0 10px 32px rgba(37,211,102,0.5)' }}
          >
            {WA_ICON}
            Order on WhatsApp
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}
