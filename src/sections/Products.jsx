import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const PRODUCTS = [
  { name: 'Keri Pickle',  hindi: 'KERI ACHAAR',  desc: 'Fresh keri chunks in cold-pressed mustard oil with 12 traditional spices.', price: '₹ 450', bg: 'linear-gradient(135deg,#fff3e0,#ffe0b2)', img: '/keri_jar.png' },
  { name: 'Lemon Pickle', hindi: 'NIMBU KA ACHAAR', desc: 'Whole lemons sun-dried and packed with black salt, turmeric, and red chilli.', price: '₹ 400', bg: 'linear-gradient(135deg,#fffff0,#fffacd)', img: '/lemon_jar.png' },
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
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, boxShadow: '0 18px 50px rgba(0,0,0,0.13)' }}
    >
      <motion.div
        style={{ height: 240, background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
        initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
        animate={inView ? { clipPath: 'inset(0% 0% 0% 0%)' } : {}}
        transition={{ duration: 0.9, delay: index * 0.1 + 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <img src={p.img} alt={p.name} style={{ height: '100%', width: 'auto', objectFit: 'contain' }} />
      </motion.div>
      <div style={{ padding: '18px' }}>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 700, color: '#0C2416', marginBottom: 3 }}>{p.name}</div>
        <div style={{ fontSize: 10, color: '#bbb', letterSpacing: '2px', marginBottom: 8 }}>{p.hindi}</div>
        <div style={{ fontSize: 13, color: '#777', lineHeight: 1.6, marginBottom: 12 }}>{p.desc}</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#2D7A50' }}>
          {p.price} <small style={{ fontSize: 11, color: '#bbb', fontWeight: 400 }}>/ 500g + shipping</small>
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

      <div className="products-grid" style={{ display: 'grid', gap: 20, maxWidth: 1100, margin: '0 auto', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))' }}>
        {PRODUCTS.map((p, i) => <Card key={p.name} p={p} index={i} />)}
      </div>
    </section>
  )
}
