import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

export default function Feedback() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [form, setForm] = useState({ name: '', rating: 5, message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | done | error

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/xpwzgnjv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: form.name, rating: form.rating, message: form.message }),
      })
      if (res.ok) {
        setStatus('done')
        setForm({ name: '', rating: 5, message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="feedback" style={{ padding: '80px 20px', background: '#FFF8E7', textAlign: 'center' }}>
      <motion.div ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <div style={{
          display: 'inline-block', background: 'rgba(45,122,79,0.12)', color: '#2D7A50',
          fontSize: 10, fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase',
          padding: '6px 18px', borderRadius: 100, marginBottom: 14,
        }}>Share Your Experience</div>
        <h2 style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: 'clamp(26px,5vw,48px)', fontWeight: 700, color: '#0C2416',
          lineHeight: 1.15, marginBottom: 12,
        }}>
          How was the Achaar?
        </h2>
        <p style={{ fontSize: 15, color: '#777', lineHeight: 1.7, maxWidth: 420, margin: '0 auto 48px' }}>
          Your feedback means the world to Nidhi. Take 30 seconds to share your experience.
        </p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        style={{
          background: '#fff', borderRadius: 24, padding: '40px 32px',
          maxWidth: 520, margin: '0 auto',
          boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
          display: 'flex', flexDirection: 'column', gap: 20,
          textAlign: 'left',
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        {/* Name */}
        <div>
          <label style={{ fontSize: 12, fontWeight: 700, color: '#0C2416', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
            Your Name
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Priya Sharma"
            value={form.name}
            onChange={e => set('name', e.target.value)}
            style={{
              width: '100%', padding: '12px 16px', borderRadius: 10,
              border: '1.5px solid #e8e0d0', fontSize: 14, color: '#2d2d2d',
              outline: 'none', fontFamily: 'Lato, sans-serif',
              background: '#FFFDF7',
            }}
            onFocus={e => e.target.style.borderColor = '#F4A300'}
            onBlur={e => e.target.style.borderColor = '#e8e0d0'}
          />
        </div>

        {/* Star rating */}
        <div>
          <label style={{ fontSize: 12, fontWeight: 700, color: '#0C2416', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>
            Rating
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            {[1,2,3,4,5].map(star => (
              <motion.button
                key={star}
                type="button"
                onClick={() => set('rating', star)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer', padding: 2,
                  fontSize: 32, lineHeight: 1,
                  filter: star <= form.rating ? 'none' : 'grayscale(1) opacity(0.3)',
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.1 }}
              >
                ⭐
              </motion.button>
            ))}
          </div>
        </div>

        {/* Message */}
        <div>
          <label style={{ fontSize: 12, fontWeight: 700, color: '#0C2416', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
            Your Review
          </label>
          <textarea
            required
            rows={4}
            placeholder="Tell us about your experience with the achaar…"
            value={form.message}
            onChange={e => set('message', e.target.value)}
            style={{
              width: '100%', padding: '12px 16px', borderRadius: 10,
              border: '1.5px solid #e8e0d0', fontSize: 14, color: '#2d2d2d',
              outline: 'none', fontFamily: 'Lato, sans-serif', resize: 'vertical',
              background: '#FFFDF7', lineHeight: 1.7,
            }}
            onFocus={e => e.target.style.borderColor = '#F4A300'}
            onBlur={e => e.target.style.borderColor = '#e8e0d0'}
          />
        </div>

        {/* Submit */}
        <AnimatePresence mode="wait">
          {status === 'done' ? (
            <motion.div
              key="done"
              style={{
                background: 'rgba(45,122,79,0.1)', border: '1px solid rgba(45,122,79,0.3)',
                borderRadius: 12, padding: '16px', textAlign: 'center',
                color: '#1A4330', fontWeight: 700, fontSize: 15,
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              🙏 Thank you! Nidhi will read your review personally.
            </motion.div>
          ) : (
            <motion.button
              key="btn"
              type="submit"
              disabled={status === 'sending'}
              style={{
                background: status === 'sending' ? '#c8a830' : '#F4A300',
                color: '#0C2416', border: 'none', borderRadius: 100,
                padding: '14px 36px', fontSize: 13, fontWeight: 700,
                letterSpacing: '2px', textTransform: 'uppercase',
                cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                boxShadow: '0 6px 24px rgba(244,163,0,0.35)',
                alignSelf: 'center', minWidth: 200,
              }}
              whileHover={status !== 'sending' ? { y: -2, boxShadow: '0 10px 32px rgba(244,163,0,0.5)' } : {}}
              whileTap={status !== 'sending' ? { scale: 0.97 } : {}}
            >
              {status === 'sending' ? 'Sending…' : 'Submit Feedback'}
            </motion.button>
          )}
        </AnimatePresence>

        {status === 'error' && (
          <p style={{ color: '#c0392b', fontSize: 13, textAlign: 'center', marginTop: -8 }}>
            Something went wrong. Try WhatsApp instead!
          </p>
        )}
      </motion.form>
    </section>
  )
}
