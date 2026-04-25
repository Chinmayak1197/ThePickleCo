import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const REVIEWS = [
  { text: '"Superb aachar by Nidhi — delicious one, highly recommended. Thank you for the aachar ❤️"', author: 'Verified Customer', loc: 'Verified Customer' },
  { text: '"Tried aam ka achaar by Nidhi Raaj Khamesra today — very very tasty achaar. Highly recommended. Thank you so much Nidhi! Will keep coming back for more 🤗"', author: 'Verified Customer', loc: 'Verified Customer' },
  { text: '"Tastes exactly like homemade. The keri chunks are so chunky and full of flavour — just like Nani used to make!"', author: 'Priya S.', loc: 'Pune, Maharashtra' },
  { text: '"Ordered the garlic pickle and keri achaar together. Both are incredible. Nidhi responds fast on WhatsApp too!"', author: 'Rajan M.', loc: 'Jaipur, Rajasthan' },
  { text: '"No preservatives, packed properly, delivered fast. The keri pickle is authentic and spicy — exactly what I wanted."', author: 'Anita K.', loc: 'Bengaluru, Karnataka' },
]

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="testi" style={{ padding: '100px 48px', textAlign: 'center', background: '#FFF8E7' }}>
      <motion.div ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <div style={{
          display: 'inline-block', background: 'rgba(45,122,79,0.12)', color: '#2D7A50',
          fontSize: 10, fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase',
          padding: '6px 18px', borderRadius: 100, marginBottom: 14,
        }}>Reviews</div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,5vw,52px)', fontWeight: 700, color: '#0C2416', lineHeight: 1.15, marginBottom: 14 }}>
          What People Are Saying
        </h2>
        <p style={{ fontSize: 16, color: '#777', lineHeight: 1.75, maxWidth: 440, margin: '0 auto 60px' }}>
          From Gujarat to Delhi, Nidhi's achaar is becoming a household favourite.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gap: 24, maxWidth: 900, margin: '0 auto', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))' }}>
        {REVIEWS.map((r, i) => (
          <motion.div key={i}
            style={{
              background: '#fff', borderRadius: 18, padding: '28px 24px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)', textAlign: 'left',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ y: -5, boxShadow: '0 12px 36px rgba(0,0,0,0.1)' }}
          >
            <div style={{ color: '#F4A300', fontSize: 14, letterSpacing: '2px', marginBottom: 14 }}>★★★★★</div>
            <p style={{ fontSize: 14, color: '#555', lineHeight: 1.75, fontStyle: 'italic', marginBottom: 20 }}>{r.text}</p>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0C2416' }}>{r.author}</div>
            <div style={{ fontSize: 11, color: '#bbb' }}>{r.loc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
