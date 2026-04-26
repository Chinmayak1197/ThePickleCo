import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const PRODUCTS = [
  {
    name: 'Keri Pickle', hindi: 'KERI ACHAAR',
    desc: 'Fresh hand-cut raw mango chunks blended with cold-pressed mustard oil and 12 traditional spices for that bold, nostalgic flavor.',
    features: ['No preservatives', 'Authentic homemade recipe', 'Rich & spicy taste'],
    tagline: 'Limited batch – made fresh every week ♡',
    price: '₹ 450', bg: 'linear-gradient(135deg,#fff3e0,#ffe0b2)', emoji: '🥭',
  },
  {
    name: 'Lemon Pickle', hindi: 'NIMBU ACHAAR',
    desc: 'Sun-matured whole lemons infused with black salt, turmeric, and red chilli — naturally fermented for deep, tangy flavor.',
    features: ['Naturally aged', 'Improves with time', 'Strong digestive benefits'],
    tagline: 'Gets tastier with time ♡',
    price: '₹ 400', bg: 'linear-gradient(135deg,#fffff0,#fffacd)', emoji: '🍋',
  },
]

function Card({ p, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      style={{
        background: '#fff', borderRadius: 22, overflow: 'hidden',
        boxShadow: '0 4px 28px rgba(0,0,0,0.06)', cursor: 'pointer',
        display: 'flex', flexDirection: 'column',
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, boxShadow: '0 18px 50px rgba(0,0,0,0.13)' }}
    >
      {/* Emoji banner */}
      <div style={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80, background: p.bg, position: 'relative' }}>
        {p.emoji}
        <div style={{
          position: 'absolute', top: 16, left: 16,
          background: '#0C2416', color: '#fff',
          fontSize: 11, fontWeight: 700, letterSpacing: '1.5px',
          padding: '5px 14px', borderRadius: 100,
        }}>{p.hindi}</div>
      </div>

      <div style={{ padding: '22px 22px 0' }}>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: '#0C2416', marginBottom: 10 }}>{p.name}</div>
        <p style={{ fontSize: 13.5, color: '#666', lineHeight: 1.7, marginBottom: 14 }}>{p.desc}</p>

        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: 7 }}>
          {p.features.map(f => (
            <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#444' }}>
              <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(45,122,79,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="#2D7A50" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: 'auto', padding: '0 22px 22px' }}>
        <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 16, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#0C2416' }}>{p.price} <span style={{ fontSize: 13, color: '#999', fontWeight: 400 }}>/ 500g</span></div>
            <div style={{ fontSize: 11, color: '#bbb', marginTop: 2 }}>+ shipping</div>
          </div>
          <motion.a
            href="#order"
            style={{
              background: '#F4A300', color: '#0C2416', fontWeight: 700, fontSize: 12,
              letterSpacing: '1.5px', textTransform: 'uppercase', textDecoration: 'none',
              padding: '10px 20px', borderRadius: 100,
            }}
            whileHover={{ background: '#FFD166' }}
          >Order</motion.a>
        </div>
        <div style={{ marginTop: 12, background: '#FFF8E7', borderRadius: 10, padding: '9px 14px', fontSize: 12, color: '#2D7A50', fontStyle: 'italic', textAlign: 'center' }}>
          {p.tagline}
        </div>
      </div>
    </motion.div>
  )
}

export default function Products() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="products" className="section-pad" style={{ padding: '80px 48px', textAlign: 'center', background: '#FFF8E7' }}>
      <motion.div ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <div style={{
          display: 'inline-block', background: 'rgba(45,122,79,0.12)', color: '#2D7A50',
          fontSize: 10, fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase',
          padding: '6px 18px', borderRadius: 100, marginBottom: 14,
        }}>Our Collection</div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(26px,5vw,52px)', fontWeight: 700, color: '#0C2416', lineHeight: 1.15, marginBottom: 14 }}>
          Every Jar, A Masterpiece
        </h2>
        <p style={{ fontSize: 15, color: '#777', lineHeight: 1.75, maxWidth: 480, margin: '0 auto 48px' }}>
          Made with hand-picked keri, stone-ground spices, and a recipe crafted with love in Nidhi's Kitchen.
        </p>
      </motion.div>

      <div className="products-grid" style={{ display: 'grid', gap: 28, maxWidth: 800, margin: '0 auto', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))' }}>
        {PRODUCTS.map((p, i) => <Card key={p.name} p={p} index={i} />)}
      </div>
    </section>
  )
}
