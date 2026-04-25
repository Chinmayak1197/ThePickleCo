import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const PRODUCTS = [
  { name: 'Keri Pickle',         hindi: 'KERI NO ACHAAR',     desc: 'Fresh keri chunks in cold-pressed mustard oil with 12 traditional spices.', price: '₹ 280', bg: 'linear-gradient(135deg,#fff3e0,#ffe0b2)', emoji: '🥭' },
  { name: 'Green Chilli Pickle', hindi: 'HARI MIRCH KA ACHAAR', desc: 'Bold and fiery. Fresh green chillies stuffed with fennel, fenugreek, and mustard seeds.', price: '₹ 220', bg: 'linear-gradient(135deg,#fce4ec,#ffccbc)', emoji: '🌶️' },
  { name: 'Mixed Vegetable',     hindi: 'MIX SABZI KA ACHAAR', desc: 'Carrot, cauliflower, turnip and chilli slow-cured in a tangy spiced oil blend.', price: '₹ 240', bg: 'linear-gradient(135deg,#e8f5e9,#dcedc8)', emoji: '🫙' },
  { name: 'Garlic Pickle',       hindi: 'LAHSUN KA ACHAAR',   desc: 'Whole garlic cloves marinated in spiced vinegar for 21 days. Aged and bold.', price: '₹ 300', bg: 'linear-gradient(135deg,#e3f2fd,#f3e5f5)', emoji: '🧄' },
  { name: 'Lemon Pickle',        hindi: 'NIMBU KA ACHAAR',    desc: 'Whole lemons sun-dried and packed with black salt, turmeric, and red chilli.', price: '₹ 200', bg: 'linear-gradient(135deg,#fffff0,#fffacd)', emoji: '🍋' },
]

function Card({ p, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      style={{
        background: '#fff', borderRadius: 22, overflow: 'hidden',
        boxShadow: '0 4px 28px rgba(0,0,0,0.06)', cursor: 'pointer',
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -10, boxShadow: '0 18px 50px rgba(0,0,0,0.13)' }}
    >
      <div style={{ height: 190, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 72, background: p.bg }}>
        {p.emoji}
      </div>
      <div style={{ padding: '22px' }}>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 19, fontWeight: 700, color: '#0C2416', marginBottom: 4 }}>{p.name}</div>
        <div style={{ fontSize: 11, color: '#bbb', letterSpacing: '2px', marginBottom: 10 }}>{p.hindi}</div>
        <div style={{ fontSize: 13, color: '#777', lineHeight: 1.65, marginBottom: 14 }}>{p.desc}</div>
        <div style={{ fontSize: 17, fontWeight: 700, color: '#2D7A50' }}>
          {p.price} <small style={{ fontSize: 11, color: '#bbb', fontWeight: 400 }}>/ 500g jar</small>
        </div>
      </div>
    </motion.div>
  )
}

export default function Products() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="products" style={{ padding: '110px 48px', textAlign: 'center', background: '#FFF8E7' }}>
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
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,5vw,52px)', fontWeight: 700, color: '#0C2416', lineHeight: 1.15, marginBottom: 14 }}>
          Every Jar, A Masterpiece
        </h2>
        <p style={{ fontSize: 16, color: '#777', lineHeight: 1.75, maxWidth: 480, margin: '0 auto 64px' }}>
          Made with hand-picked keri, stone-ground spices, and a recipe crafted with love in Nidhi's Kitchen.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gap: 28, maxWidth: 1100, margin: '0 auto', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))' }}>
        {PRODUCTS.map((p, i) => <Card key={p.name} p={p} index={i} />)}
      </div>
    </section>
  )
}
