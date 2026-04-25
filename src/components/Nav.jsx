import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 48px',
        background: scrolled ? 'rgba(0,0,0,0.92)' : 'linear-gradient(to bottom, rgba(0,0,0,0.55), transparent)',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        boxShadow: scrolled ? '0 2px 28px rgba(0,0,0,0.5)' : 'none',
        transition: 'background 0.4s, box-shadow 0.4s',
      }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <a href="#" style={{
        fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700,
        color: '#fff', textDecoration: 'none',
      }}>
        Acchar By <em style={{ fontStyle: 'normal', color: '#F4A300' }}>Nidhi</em>
      </a>
      <ul style={{ display: 'flex', gap: 32, listStyle: 'none' }}>
        {[['Products','#products'],['Order','#order'],['Our Story','#story'],['Contact','#contact']].map(([label, href]) => (
          <li key={label}>
            <a href={href} style={{
              color: 'rgba(255,255,255,0.75)', textDecoration: 'none',
              fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase',
            }}
              onMouseEnter={e => e.target.style.color = '#F4A300'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.75)'}
            >{label}</a>
          </li>
        ))}
      </ul>
    </motion.nav>
  )
}
