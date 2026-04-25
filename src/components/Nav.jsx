import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [['Products','#products'],['Order','#order'],['Our Story','#story'],['Contact','#contact']]

  return (
    <>
      <motion.nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 24px',
          background: scrolled || menuOpen ? 'rgba(0,0,0,0.95)' : 'linear-gradient(to bottom, rgba(0,0,0,0.55), transparent)',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          boxShadow: scrolled ? '0 2px 28px rgba(0,0,0,0.5)' : 'none',
          transition: 'background 0.4s, box-shadow 0.4s',
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <a href="#" style={{
          fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700,
          color: '#fff', textDecoration: 'none',
        }}>
          Acchar By <em style={{ fontStyle: 'normal', color: '#F4A300' }}>Nidhi</em>
        </a>

        {/* Desktop links */}
        <ul className="nav-links" style={{ display: 'flex', gap: 32, listStyle: 'none' }}>
          {links.map(([label, href]) => (
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

        {/* Hamburger button — mobile only */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          style={{
            display: 'none', background: 'none', border: 'none', cursor: 'pointer',
            padding: 4, flexDirection: 'column', gap: 5,
          }}
          className="hamburger"
          aria-label="Menu"
        >
          <span style={{ display: 'block', width: 24, height: 2, background: '#fff', borderRadius: 2, transition: 'transform 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
          <span style={{ display: 'block', width: 24, height: 2, background: '#fff', borderRadius: 2, opacity: menuOpen ? 0 : 1, transition: 'opacity 0.3s' }} />
          <span style={{ display: 'block', width: 24, height: 2, background: '#fff', borderRadius: 2, transition: 'transform 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
        </button>
      </motion.nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            style={{
              position: 'fixed', top: 56, left: 0, right: 0, zIndex: 199,
              background: 'rgba(0,0,0,0.97)', backdropFilter: 'blur(14px)',
              display: 'flex', flexDirection: 'column', padding: '16px 0 24px',
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {links.map(([label, href]) => (
              <a key={label} href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  color: 'rgba(255,255,255,0.8)', textDecoration: 'none',
                  fontSize: 14, fontWeight: 700, letterSpacing: '2px',
                  textTransform: 'uppercase', padding: '14px 28px',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
              >{label}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
