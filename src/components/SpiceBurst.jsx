import { motion, AnimatePresence } from 'framer-motion'

// Chilli powder burst — 20 red particles explode outward
function ChilliCloud({ count = 22 }) {
  return (
    <div style={{ position: 'absolute', left: '50%', top: '50%', width: 0, height: 0, zIndex: 25 }}>
      {Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * 2 * Math.PI + Math.random() * 0.4
        const dist  = 90 + Math.random() * 140
        const tx    = Math.cos(angle) * dist
        const ty    = Math.sin(angle) * dist
        const size  = 6 + Math.random() * 18
        const delay = Math.random() * 0.3

        return (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: size, height: size,
              borderRadius: '50%',
              background: `rgba(${180 + Math.floor(Math.random()*60)}, ${20 + Math.floor(Math.random()*30)}, 5, 0.9)`,
              left: -size/2, top: -size/2,
            }}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
            animate={{ x: tx, y: ty, scale: [0, 1.4, 0.8, 0], opacity: [1, 0.9, 0.6, 0] }}
            transition={{ duration: 2.2, delay, ease: 'easeOut' }}
          />
        )
      })}
    </div>
  )
}

// Turmeric cloud — soft yellow puffs
function TurmericCloud({ count = 14 }) {
  return (
    <div style={{ position: 'absolute', left: '48%', top: '48%', width: 0, height: 0, zIndex: 24 }}>
      {Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * 2 * Math.PI + 0.8
        const dist  = 60 + Math.random() * 100
        const tx    = Math.cos(angle) * dist
        const ty    = Math.sin(angle) * dist
        const size  = 28 + Math.random() * 40
        const delay = 0.2 + Math.random() * 0.4

        return (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: size, height: size,
              borderRadius: '50%',
              background: 'rgba(230, 160, 0, 0.55)',
              filter: 'blur(8px)',
              left: -size/2, top: -size/2,
            }}
            initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
            animate={{ x: tx, y: ty, scale: [0, 1.2, 1.5, 0], opacity: [0, 0.8, 0.5, 0] }}
            transition={{ duration: 3.5, delay, ease: 'easeOut' }}
          />
        )
      })}
    </div>
  )
}

// Mustard seeds — tiny yellow dots bouncing
function MustardSeeds({ count = 30 }) {
  return (
    <div style={{ position: 'absolute', left: '50%', top: '50%', width: 0, height: 0, zIndex: 26 }}>
      {Array.from({ length: count }, (_, i) => {
        const angle = Math.random() * 2 * Math.PI
        const dist  = 80 + Math.random() * 160
        const tx    = Math.cos(angle) * dist
        const ty    = Math.sin(angle) * dist
        const ty2   = ty + 60 + Math.random() * 80 // bounce down
        const size  = 4 + Math.random() * 4
        const delay = 0.4 + Math.random() * 0.6

        return (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: size, height: size,
              borderRadius: '50%',
              background: '#d4a800',
              left: -size/2, top: -size/2,
              boxShadow: '0 0 3px rgba(220,180,0,0.6)',
            }}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
            animate={{
              x: [0, tx * 0.5, tx, tx * 0.95],
              y: [0, ty * 0.4 - 40, ty, ty2],
              opacity: [0, 1, 1, 0.8, 0],
              scale: [0, 1, 1, 0.8],
            }}
            transition={{ duration: 2.8, delay, ease: 'easeOut' }}
          />
        )
      })}
    </div>
  )
}

// Whole spices — star anise, fenugreek seeds (as shapes)
function WholeSpices() {
  const spices = [
    { symbol: '✦', color: '#8b4513', size: 22, tx: -120, ty: -60, delay: 0.5 },
    { symbol: '✦', color: '#6b3410', size: 18, tx:  110, ty: -50, delay: 0.7 },
    { symbol: '✦', color: '#7a3a0e', size: 24, tx: -80,  ty:  90, delay: 0.6 },
    { symbol: '✦', color: '#5c2a08', size: 16, tx:  130, ty:  70, delay: 0.8 },
    { symbol: '◆',  color: '#c8a800', size: 10, tx: -50,  ty: -90, delay: 0.45 },
    { symbol: '◆',  color: '#b89600', size:  8, tx:  60,  ty: -80, delay: 0.65 },
    { symbol: '◆',  color: '#d4b000', size: 11, tx: -30,  ty: 110, delay: 0.55 },
  ]

  return (
    <div style={{ position: 'absolute', left: '50%', top: '50%', width: 0, height: 0, zIndex: 27 }}>
      {spices.map((sp, i) => (
        <motion.span
          key={i}
          style={{
            position: 'absolute', color: sp.color,
            fontSize: sp.size, lineHeight: 1,
            left: -sp.size/2, top: -sp.size/2,
            textShadow: '0 0 8px rgba(180,120,0,0.5)',
          }}
          initial={{ x: 0, y: 0, scale: 0, rotate: 0, opacity: 0 }}
          animate={{
            x: sp.tx, y: sp.ty,
            scale: [0, 1.3, 1],
            rotate: [0, 360 + (i % 2 === 0 ? 180 : -90)],
            opacity: [0, 1, 1],
          }}
          transition={{ duration: 2.4, delay: sp.delay, ease: 'easeOut' }}
        >
          {sp.symbol}
        </motion.span>
      ))}
    </div>
  )
}

export default function SpiceBurst({ phase }) {
  return (
    <>
      <ChilliCloud />
      <TurmericCloud />
      <MustardSeeds />
      <WholeSpices />
    </>
  )
}
