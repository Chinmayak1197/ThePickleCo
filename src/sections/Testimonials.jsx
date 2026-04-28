import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const REVIEWS = [
  { text: '"Superb aachar by Nidhi — delicious one, highly recommended. Thank you for the aachar ❤️"', author: 'Verified Customer', loc: 'Verified Customer' },
  { text: '"Tried aam ka achaar by Nidhi Raaj Khamesra today — very very tasty achaar. Highly recommended. Thank you so much Nidhi! Will keep coming back for more 🤗"', author: 'Verified Customer', loc: 'Verified Customer' },
  { text: '"Tastes exactly like homemade. The keri chunks are so chunky and full of flavour — just like Nani used to make!"', author: 'Priya S.', loc: 'Pune, Maharashtra' },
  { text: '"Ordered the keri achaar — both are incredible. Nidhi responds fast on WhatsApp too!"', author: 'Rajan M.', loc: 'Jaipur, Rajasthan' },
  { text: '"No preservatives, packed properly, delivered fast. The keri pickle is authentic and spicy — exactly what I wanted."', author: 'Anita K.', loc: 'Bengaluru, Karnataka' },
]

function ReviewCard({ r, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const fromLeft = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      style={{
        background: '#fff', borderRadius: 20, padding: '28px 24px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)', textAlign: 'left',
        borderLeft: '3px solid #F4A300',
      }}
      initial={{ opacity: 0, x: fromLeft ? -60 : 60, y: 20 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(0,0,0,0.11)' }}
    >
      <div style={{ color: '#F4A300', fontSize: 14, letterSpacing: '2px', marginBottom: 14 }}>★★★★★</div>
      <p style={{ fontSize: 14, color: '#555', lineHeight: 1.8, fontStyle: 'italic', marginBottom: 18 }}>{r.text}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'linear-gradient(135deg, #0C2416, #2D7A50)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, color: '#F4A300', fontWeight: 700,
          flexShrink: 0,
        }}>
          {r.author[0]}
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0C2416' }}>{r.author}</div>
          <div style={{ fontSize: 11, color: '#bbb' }}>{r.loc}</div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="testi" className="section-pad" style={{ padding: '100px 20px', textAlign: 'center', background: '#FFF8E7' }}>
      <motion.div ref={ref} style={{ marginBottom: 56 }}>
        <div style={{ overflow: 'hidden', marginBottom: 14 }}>
          <motion.div
            style={{
              display: 'inline-block', background: 'rgba(45,122,79,0.12)', color: '#2D7A50',
              fontSize: 10, fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase',
              padding: '6px 18px', borderRadius: 100,
            }}
            initial={{ y: '100%' }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >Reviews</motion.div>
        </div>
        <div style={{ overflow: 'hidden', marginBottom: 14 }}>
          <motion.h2
            style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(26px,5vw,52px)', fontWeight: 700, color: '#0C2416', lineHeight: 1.15 }}
            initial={{ y: '110%' }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.76, 0, 0.24, 1] }}
          >
            What People Are Saying
          </motion.h2>
        </div>
        <motion.p
          style={{ fontSize: 15, color: '#777', lineHeight: 1.75, maxWidth: 440, margin: '0 auto', padding: '0 16px' }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          From Gujarat to Delhi, Nidhi's achaar is becoming a household favourite.
        </motion.p>
      </motion.div>

      <div className="testi-grid" style={{ display: 'grid', gap: 22, maxWidth: 960, margin: '0 auto', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))' }}>
        {REVIEWS.map((r, i) => <ReviewCard key={i} r={r} index={i} />)}
      </div>
    </section>
  )
}
