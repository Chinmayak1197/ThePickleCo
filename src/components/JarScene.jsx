import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'

export default function JarScene({ phase }) {
  const [jarRotY, setJarRotY] = useState(0)
  const [showLabel, setShowLabel] = useState(false)
  const rafRef = useRef(null)
  const startRef = useRef(null)

  useEffect(() => {
    if (phase < 5) return

    // Start 360° spin after pack-in (phase 6)
    let spinning = phase >= 6

    function loop(ts) {
      if (!startRef.current) startRef.current = ts
      const t = (ts - startRef.current) / 1000
      if (spinning) {
        setJarRotY(Math.cos(t * 0.7))
      }
      if (t > 3 && !showLabel) setShowLabel(true)
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [phase])

  const scaleX = Math.abs(jarRotY)

  return (
    <motion.div
      style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 50,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}
      initial={{ opacity: 0, scale: 0.3, y: 200 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Spotlight glow behind jar */}
      <div style={{
        position: 'absolute',
        width: 320, height: 320,
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(30,90,8,0.45) 0%, transparent 70%)',
        top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        filter: 'blur(20px)',
        zIndex: -1,
      }} />

      {/* Y-axis rotation wrapper */}
      <motion.div
        style={{ scaleX: phase >= 6 ? scaleX : 1, transformOrigin: 'center center' }}
        animate={phase >= 6 ? {} : { scaleX: 1 }}
      >
        <JarSVG showLabel={showLabel && phase >= 6} facingRight={jarRotY >= 0} />
      </motion.div>

      {/* Ground shadow */}
      <motion.div
        style={{
          width: 160, height: 24, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(60,200,20,0.25) 0%, transparent 70%)',
          marginTop: -12,
        }}
        animate={{ scaleX: [1, 0.7, 1] }}
        transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
      />

      {/* Brand label below jar */}
      <AnimatePresence>
        {phase >= 6 && (
          <motion.div
            style={{
              color: '#fff', fontFamily: 'Georgia, serif',
              fontSize: 28, fontWeight: 700,
              letterSpacing: 5, textTransform: 'uppercase',
              marginTop: 24, textAlign: 'center',
              textShadow: '0 0 40px rgba(80,220,20,0.6), 0 2px 8px rgba(0,0,0,0.9)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, delay: 2.5, ease: 'easeOut' }}
          >
            Raw Mango Pickle
            <motion.div style={{
              height: 1.5,
              background: 'linear-gradient(to right, transparent, rgba(80,220,20,0.8), transparent)',
              marginTop: 8,
            }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.4, delay: 3.8 }}
            />
            <motion.div style={{
              fontSize: 13, fontWeight: 400, letterSpacing: 4,
              color: 'rgba(255,255,255,0.55)', marginTop: 8,
            }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 4.5 }}
            >
              ARTISAN · HAND-CRAFTED · SINCE 2023
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────
// JAR SVG — glass clip-top jar with mango chunks visible inside
// ─────────────────────────────────────────────────────────────────
function JarSVG({ showLabel, facingRight }) {
  const id = 'jar'
  const flip = facingRight ? 1 : -1

  return (
    <svg width="220" height="300" viewBox="-110 -20 220 310"
      style={{
        filter: `
          drop-shadow(0 0 35px rgba(60,180,10,0.35))
          drop-shadow(0 20px 50px rgba(0,0,0,0.95))
        `,
        overflow: 'visible',
      }}
    >
      <defs>
        {/* Glass body gradient */}
        <linearGradient id={`${id}-glass`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="rgba(20,50,15,0.85)" />
          <stop offset="18%"  stopColor="rgba(40,100,25,0.6)" />
          <stop offset="45%"  stopColor="rgba(60,160,30,0.35)" />
          <stop offset="65%"  stopColor="rgba(40,100,25,0.55)" />
          <stop offset="100%" stopColor="rgba(15,40,10,0.9)" />
        </linearGradient>
        {/* Inner fill (pickles) */}
        <linearGradient id={`${id}-fill`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#7ab808" />
          <stop offset="40%"  stopColor="#3a7808" />
          <stop offset="100%" stopColor="#1a3a04" />
        </linearGradient>
        {/* Glass highlight */}
        <linearGradient id={`${id}-shine`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.18)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        {/* Lid gradient */}
        <linearGradient id={`${id}-lid`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"  stopColor="#c0c8d0" />
          <stop offset="50%" stopColor="#a0aab0" />
          <stop offset="100%" stopColor="#808890" />
        </linearGradient>
        <clipPath id={`${id}-body-clip`}>
          <path d={JAR_BODY} />
        </clipPath>
      </defs>

      {/* ── Jar body fill (pickle content) ── */}
      <path d={JAR_BODY} fill={`url(#${id}-fill)`} />

      {/* Chunk silhouettes inside jar */}
      <g clipPath={`url(#${id}-body-clip)`} opacity="0.7">
        {INNER_CHUNKS.map((c, i) => (
          <ellipse key={i} cx={c.x} cy={c.y} rx={c.rx} ry={c.ry}
            fill={c.fill} opacity={c.a} transform={`rotate(${c.rot},${c.x},${c.y})`} />
        ))}
      </g>

      {/* Mustard oil layer at top (translucent amber) */}
      <path d="M -72,40 Q 0,36 72,40 L 72,65 Q 0,60 -72,65 Z"
        fill="rgba(180,140,0,0.35)" />

      {/* Glass overlay */}
      <path d={JAR_BODY} fill={`url(#${id}-glass)`} />

      {/* Left rim reflection */}
      <path d="M -90,10 Q -86,100 -82,250"
        fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="6" strokeLinecap="round" />
      {/* Right rim reflection */}
      <path d="M 90,10 Q 86,100 82,250"
        fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" strokeLinecap="round" />

      {/* Top shine */}
      <path d={JAR_BODY} fill={`url(#${id}-shine)`} opacity="0.4" />

      {/* Jar outline */}
      <path d={JAR_BODY} fill="none"
        stroke={facingRight ? 'rgba(120,255,60,0.22)' : 'rgba(60,180,20,0.14)'}
        strokeWidth="1.5" />

      {/* ── Lid ── */}
      <path d="M -82,10 Q -82,-2 0,-6 Q 82,-2 82,10 L 82,28 Q 0,32 -82,28 Z"
        fill={`url(#${id}-lid)`} />
      {/* Lid shine */}
      <path d="M -75,12 Q 0,8 75,12"
        fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      {/* Clip wire */}
      <path d={`M ${-82*flip},18 Q ${-60*flip},-16 ${-20*flip},-20 Q ${20*flip},-24 ${60*flip},-12`}
        fill="none" stroke="rgba(150,160,180,0.7)" strokeWidth="2.5" strokeLinecap="round" />

      {/* ── White label ── */}
      <AnimatePresence>
        {showLabel && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            {/* Label background */}
            <rect x="-58" y="80" width="116" height="110" rx="6"
              fill="rgba(255,255,255,0.92)"
              stroke="rgba(200,200,200,0.5)" strokeWidth="1" />
            {/* Label green stripe top */}
            <rect x="-58" y="80" width="116" height="14" rx="6"
              fill="#2a6a10" />
            <rect x="-58" y="87" width="116" height="7"
              fill="#2a6a10" />
            {/* Brand name */}
            <text x="0" y="122" textAnchor="middle"
              fontFamily="Georgia, serif" fontSize="16" fontWeight="700"
              fill="#1a3a04" letterSpacing="2">Acchar By Nidhi</text>
            {/* Product */}
            <text x="0" y="142" textAnchor="middle"
              fontFamily="Georgia, serif" fontSize="11" fontWeight="400"
              fill="#3a6a10" letterSpacing="1">RAW MANGO PICKLE</text>
            {/* Divider */}
            <line x1="-40" y1="150" x2="40" y2="150"
              stroke="#2a6a10" strokeWidth="0.8" opacity="0.5" />
            {/* Weight */}
            <text x="0" y="166" textAnchor="middle"
              fontFamily="Georgia, serif" fontSize="10"
              fill="#5a7a50" letterSpacing="1">500g · NET WT</text>
            {/* Label green stripe bottom */}
            <rect x="-58" y="178" width="116" height="12" rx="0"
              fill="#2a6a10" />
            <rect x="-58" y="184" width="116" height="6" rx="0 0 6 6"
              fill="#2a6a10" />
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  )
}

const JAR_BODY = `
  M -82,10
  Q -95,60 -95,140
  Q -95,265 -72,280
  Q 0,290 72,280
  Q 95,265 95,140
  Q 95,60 82,10
  Q 0,15 -82,10
  Z
`

const INNER_CHUNKS = [
  { x: -40, y: 100, rx: 22, ry: 14, rot: -25, fill: '#8abd10', a: 0.8 },
  { x:  30, y: 110, rx: 18, ry: 12, rot:  35, fill: '#6ab008', a: 0.7 },
  { x: -15, y: 145, rx: 24, ry: 13, rot:   5, fill: '#7ab508', a: 0.75 },
  { x:  50, y: 150, rx: 16, ry: 11, rot: -40, fill: '#5a9806', a: 0.65 },
  { x: -55, y: 160, rx: 18, ry: 10, rot:  20, fill: '#6aaa06', a: 0.7 },
  { x:  10, y: 185, rx: 26, ry: 14, rot: -15, fill: '#50880a', a: 0.65 },
  { x: -35, y: 205, rx: 20, ry: 11, rot:  45, fill: '#5a9a08', a: 0.6 },
  { x:  45, y: 210, rx: 17, ry: 12, rot: -30, fill: '#488006', a: 0.55 },
  { x:  -5, y: 230, rx: 28, ry: 13, rot:  10, fill: '#406a08', a: 0.6 },
  { x: -50, y: 250, rx: 22, ry: 10, rot: -20, fill: '#4a7808', a: 0.5 },
  { x:  35, y: 255, rx: 19, ry: 11, rot:  35, fill: '#507808', a: 0.5 },
]
