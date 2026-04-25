import { motion } from 'framer-motion'

// Thin golden mustard oil thread pouring from top
export default function OilThread() {
  return (
    <div style={{
      position: 'absolute', left: '50%', top: 0,
      transform: 'translateX(-50%)',
      zIndex: 30, pointerEvents: 'none',
      width: 10, height: '80vh',
    }}>
      {/* Thread body — grows downward */}
      <motion.div
        style={{
          position: 'absolute', top: 0, left: '50%',
          transform: 'translateX(-50%)',
          width: 3,
          background: 'linear-gradient(to bottom, rgba(200,160,0,0.9), rgba(180,130,0,0.6), rgba(160,110,0,0))',
          borderRadius: 2,
          boxShadow: '0 0 6px rgba(200,160,0,0.5)',
          transformOrigin: 'top center',
        }}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: '72vh', opacity: [0, 1, 1, 0.6] }}
        transition={{ duration: 2.4, ease: 'easeIn' }}
        exit={{ opacity: 0 }}
      />

      {/* Droplet that forms at bottom and falls */}
      {[0, 0.6, 1.2, 1.8, 2.4].map((delay, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute', left: '50%', transform: 'translateX(-50%)',
            width: 6 + i, height: 8 + i,
            borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
            background: 'rgba(190,150,0,0.9)',
            boxShadow: '0 0 4px rgba(200,160,0,0.6)',
          }}
          initial={{ top: '30%', opacity: 0, scaleY: 1 }}
          animate={{ top: '85%', opacity: [0, 1, 1, 0], scaleY: [1, 1.3, 1, 1.6] }}
          transition={{ duration: 1.4, delay: 1.0 + delay, ease: 'easeIn' }}
        />
      ))}

      {/* Oil sheen on chunks (glow overlay) */}
      <motion.div
        style={{
          position: 'fixed', left: '30%', top: '40%',
          width: '40vw', height: '30vh',
          background: 'radial-gradient(ellipse, rgba(180,150,0,0.12) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 28,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0.5] }}
        transition={{ duration: 2, delay: 1.5 }}
        exit={{ opacity: 0 }}
      />
    </div>
  )
}
