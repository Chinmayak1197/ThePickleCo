export default function Footer() {
  return (
    <footer id="contact" style={{ background: '#060e09', padding: '64px 48px 32px', textAlign: 'center' }}>
      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 6 }}>
        Acchar By <em style={{ fontStyle: 'normal', color: '#F4A300' }}>Nidhi</em>
      </div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 36 }}>
        Straight from Nidhi's Kitchen
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 28, flexWrap: 'wrap', marginBottom: 36 }}>
        {[['Products','#products'],['Order','#order'],['Our Story','#story'],['+91 99866 18363','tel:+919986618363'],['WhatsApp','https://wa.me/919986618363']].map(([label, href]) => (
          <a key={label} href={href}
            style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: 13, letterSpacing: 1 }}
            onMouseEnter={e => e.target.style.color = '#F4A300'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}
          >{label}</a>
        ))}
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 24, fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>
        © 2025 Acchar By Nidhi · Nidhi Khamesra · All Natural · No Preservatives · Made with 🥭 & ❤️
      </div>
    </footer>
  )
}
