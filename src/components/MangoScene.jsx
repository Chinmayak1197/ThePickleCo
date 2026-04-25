import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion'
import Particles from './Particles'
import SpiceBurst from './SpiceBurst'
import OilThread from './OilThread'
import JarScene from './JarScene'

// ── Phase timings (seconds) ──────────────────────────────────────
// Phase 0: 0–4s  → mango floats in, spotlight, slow Y rotation
// Phase 1: 4–7s  → knife slices, mango splits into chunks
// Phase 2: 7–11s → dry chunky cubes tumble, settle
// Phase 3: 11–16s→ spice explosion: chilli, turmeric, mustard seeds
// Phase 4: 16–19s→ thin mustard oil thread pours
// Phase 5: 19–24s→ chunks swirl + pack into glass jar
// Phase 6: 24–32s→ jar 360° rotation, label fades in, hold

const PHASE_DURATIONS = [4, 3, 4, 5, 3, 5, 8]

function usePhase(autoAdvance = true) {
  const [phase, setPhase] = useState(0)
  const timerRef = useRef(null)

  useEffect(() => {
    if (!autoAdvance) return
    const dur = PHASE_DURATIONS[phase]
    if (dur === undefined) return
    timerRef.current = setTimeout(() => {
      setPhase(p => Math.min(p + 1, PHASE_DURATIONS.length))
    }, dur * 1000)
    return () => clearTimeout(timerRef.current)
  }, [phase, autoAdvance])

  return phase
}

export default function MangoScene() {
  const phase = usePhase()
  const [showKnife, setShowKnife] = useState(false)
  const [showChunks, setShowChunks] = useState(false)
  const [showSpices, setShowSpices] = useState(false)
  const [showOil, setShowOil] = useState(false)
  const [showJar, setShowJar] = useState(false)

  useEffect(() => {
    if (phase >= 1) setShowKnife(true)
    if (phase >= 2) setShowChunks(true)
    if (phase >= 3) setShowSpices(true)
    if (phase >= 4) setShowOil(true)
    if (phase >= 5) setShowJar(true)
  }, [phase])

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#000' }}>
      {/* Cinematic spotlight */}
      <motion.div
        style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'radial-gradient(ellipse 50% 60% at 50% 40%, rgba(30,90,8,0.55) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
        animate={{ opacity: phase >= 5 ? 0.4 : 1 }}
        transition={{ duration: 2 }}
      />

      {/* Ambient particles always on */}
      <Particles phase={phase} />

      {/* ── Phase 0: Floating Mango ── */}
      <AnimatePresence>
        {phase < 2 && (
          <MangoHero phase={phase} showKnife={showKnife} />
        )}
      </AnimatePresence>

      {/* ── Phase 2+: Mango Chunks ── */}
      <AnimatePresence>
        {showChunks && phase < 5 && (
          <ChunkField phase={phase} spiced={phase >= 3} oiled={phase >= 4} />
        )}
      </AnimatePresence>

      {/* ── Phase 3: Spice Burst ── */}
      <AnimatePresence>
        {showSpices && phase < 5 && (
          <SpiceBurst phase={phase} />
        )}
      </AnimatePresence>

      {/* ── Phase 4: Oil thread ── */}
      <AnimatePresence>
        {showOil && phase < 5 && (
          <OilThread />
        )}
      </AnimatePresence>

      {/* ── Phase 5+: Jar scene ── */}
      <AnimatePresence>
        {showJar && (
          <JarScene phase={phase} />
        )}
      </AnimatePresence>

      {/* Phase label (subtle) */}
      <PhaseLabel phase={phase} />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// MANGO HERO: SVG mango with multi-layer glow, float, Y-rotation
// ─────────────────────────────────────────────────────────────────
function MangoHero({ phase, showKnife }) {
  const [rotY, setRotY] = useState(0)
  const rafRef = useRef(null)
  const startRef = useRef(null)

  useEffect(() => {
    function loop(ts) {
      if (!startRef.current) startRef.current = ts
      const t = (ts - startRef.current) / 1000
      setRotY(Math.cos(t * 0.55))
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const scaleX = Math.abs(rotY)
  const facingRight = rotY >= 0

  return (
    <motion.div
      style={{
        position: 'absolute', left: '50%', top: '42%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}
      initial={{ opacity: 0, y: -120, scale: 0.6 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.4, y: 60 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Float wrapper */}
      <motion.div
        animate={{ y: [0, -28, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 3.8, ease: 'easeInOut', repeat: Infinity }}
      >
        {/* Y-axis spin (scaleX drive) */}
        <motion.div style={{ scaleX, transformOrigin: 'center center' }}>
          <MangoSVG facingRight={facingRight} />
        </motion.div>
      </motion.div>

      {/* Ground shadow */}
      <motion.div
        style={{
          width: 130, height: 20, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(60,200,20,0.3) 0%, transparent 70%)',
          marginTop: -8,
        }}
        animate={{ scaleX: [1, 0.65, 1], opacity: [0.7, 0.3, 0.7] }}
        transition={{ duration: 3.8, ease: 'easeInOut', repeat: Infinity }}
      />

      {/* Knife */}
      <AnimatePresence>
        {showKnife && (
          <KnifeSlice />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────
// MANGO SVG — hand-crafted teardrop with layered fills
// ─────────────────────────────────────────────────────────────────
function MangoSVG({ facingRight }) {
  const id = 'mg'
  const flip = facingRight ? 1 : -1

  return (
    <svg width="200" height="280" viewBox="-100 -160 200 220"
      style={{
        filter: `
          drop-shadow(0 0 40px rgba(80,220,20,0.5))
          drop-shadow(0 0 100px rgba(40,160,10,0.22))
          drop-shadow(0 30px 60px rgba(0,0,0,0.9))
        `,
        overflow: 'visible',
      }}
    >
      <defs>
        {/* Key-light gradient */}
        <radialGradient id={`${id}-body`} cx={facingRight ? '30%' : '70%'} cy="28%" r="65%" gradientUnits="userSpaceOnUse"
          fx={facingRight ? -30 : 30} fy={-80} fr={4} cx2={20} cy2={10} r2={220}>
          <stop offset="0%"   stopColor="#d6ff52" />
          <stop offset="12%"  stopColor="#96e01e" />
          <stop offset="38%"  stopColor="#4aac0e" />
          <stop offset="66%"  stopColor="#1e6005" />
          <stop offset="100%" stopColor="#071f01" />
        </radialGradient>
        {/* Subsurface warmth */}
        <radialGradient id={`${id}-sub`} cx="50%" cy="60%" r="55%">
          <stop offset="0%"   stopColor="rgba(200,255,40,0.14)" />
          <stop offset="100%" stopColor="rgba(200,255,40,0)" />
        </radialGradient>
        {/* Rim fill light */}
        <radialGradient id={`${id}-rim`} cx={facingRight ? '80%' : '20%'} cy="65%" r="45%">
          <stop offset="0%"   stopColor="rgba(100,255,30,0.22)" />
          <stop offset="100%" stopColor="rgba(100,255,30,0)" />
        </radialGradient>
        {/* Primary specular */}
        <radialGradient id={`${id}-spec`} cx={facingRight ? '28%' : '72%'} cy="22%" r="22%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.96)" />
          <stop offset="40%"  stopColor="rgba(255,255,255,0.4)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        {/* Secondary specular */}
        <radialGradient id={`${id}-spec2`} cx={facingRight ? '38%' : '62%'} cy="38%" r="28%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.28)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <clipPath id={`${id}-clip`}>
          <path d={MANGO_PATH} />
        </clipPath>
      </defs>

      {/* Body */}
      <path d={MANGO_PATH} fill={`url(#${id}-body)`} />
      <path d={MANGO_PATH} fill={`url(#${id}-sub)`} />
      <path d={MANGO_PATH} fill={`url(#${id}-rim)`} />
      {/* Fresnel edge */}
      <path d={MANGO_PATH} fill="none"
        stroke={facingRight ? 'rgba(140,255,60,0.3)' : 'rgba(80,200,30,0.2)'}
        strokeWidth="2" />
      {/* Speculars */}
      <path d={MANGO_PATH} fill={`url(#${id}-spec)`} />
      <path d={MANGO_PATH} fill={`url(#${id}-spec2)`} />

      {/* Surface veins */}
      <g clipPath={`url(#${id}-clip)`} opacity="0.35">
        <path d="M -18,-120 Q -25,10 -18,72" fill="none" stroke="rgba(15,55,4,0.5)" strokeWidth="1.2" />
        <path d="M 30,-110 Q 22,20 15,70" fill="none" stroke="rgba(15,55,4,0.5)" strokeWidth="1.2" />
      </g>

      {/* Stem */}
      <path d={`M 0,-152 Q ${-4 * flip},-172 ${-3 * flip},-186`}
        fill="none" stroke="#5c2a08" strokeWidth="7" strokeLinecap="round" />

      {/* Leaves */}
      <LeafLeft flip={flip} />
      <LeafRight flip={flip} />
    </svg>
  )
}

const MANGO_PATH = `
  M 0,-152
  C 108,-114  112,-5   100,50
  C 82,88     38,100   0,100
  C -38,100  -82,88  -100,50
  C -112,-5  -108,-114  0,-152
  Z
`

function LeafLeft({ flip }) {
  return (
    <g>
      <path d={`M 0,-152 C ${-22*flip},-170 ${-48*flip},-174 ${-52*flip},-156 C ${-38*flip},-154 ${-18*flip},-150 0,-152 Z`}
        fill="#1a7a12" />
      <path d={`M 0,-152 L ${-48*flip},-160`}
        fill="none" stroke="rgba(10,50,5,0.6)" strokeWidth="1" />
    </g>
  )
}

function LeafRight({ flip }) {
  return (
    <g>
      <path d={`M 0,-152 C ${18*flip},-166 ${40*flip},-168 ${44*flip},-154 C ${30*flip},-152 ${14*flip},-150 0,-152 Z`}
        fill="#135510" />
    </g>
  )
}

// ─────────────────────────────────────────────────────────────────
// KNIFE — slices down through mango
// ─────────────────────────────────────────────────────────────────
function KnifeSlice() {
  return (
    <motion.div
      style={{
        position: 'absolute',
        top: -200,
        left: '50%',
        transformOrigin: 'top center',
        zIndex: 20,
      }}
      initial={{ y: -300, rotate: -15, opacity: 0 }}
      animate={{ y: [null, 80, 80, -400], rotate: [-15, -8, -8, -20], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 2.8, times: [0, 0.35, 0.75, 1], ease: 'easeInOut' }}
      exit={{ opacity: 0 }}
    >
      <svg width="60" height="320" viewBox="0 0 60 320"
        style={{ filter: 'drop-shadow(0 0 18px rgba(200,220,255,0.7)) drop-shadow(0 4px 12px rgba(0,0,0,0.9))' }}>
        {/* Blade */}
        <path d="M 30,0 L 52,280 L 30,310 L 8,280 Z"
          fill="url(#blade-grad)" />
        {/* Edge reflection */}
        <path d="M 30,0 L 36,280 L 30,310"
          fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
        {/* Handle */}
        <rect x="18" y="0" width="24" height="52" rx="4"
          fill="#3a2010" />
        <rect x="22" y="4" width="4" height="44" rx="2"
          fill="rgba(255,200,120,0.3)" />
        <defs>
          <linearGradient id="blade-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#8090a0" />
            <stop offset="40%"  stopColor="#d8e8f8" />
            <stop offset="55%"  stopColor="#f0f8ff" />
            <stop offset="100%" stopColor="#6070a0" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────
// CHUNK FIELD — 9 mango chunks scatter then settle
// ─────────────────────────────────────────────────────────────────
const CHUNK_DEFS = [
  { id: 0, rx: -160, ry: -80,  rot: -35, delay: 0    },
  { id: 1, rx:  160, ry: -60,  rot:  28, delay: 0.06 },
  { id: 2, rx: -90,  ry:  80,  rot: -18, delay: 0.12 },
  { id: 3, rx:  100, ry:  100, rot:  42, delay: 0.18 },
  { id: 4, rx: -40,  ry: -120, rot:  10, delay: 0.04 },
  { id: 5, rx:  40,  ry: -100, rot: -22, delay: 0.10 },
  { id: 6, rx: -130, ry:  30,  rot:  55, delay: 0.08 },
  { id: 7, rx:  130, ry:  20,  rot: -48, delay: 0.14 },
  { id: 8, rx:  0,   ry:  130, rot:  5,  delay: 0.16 },
]

const SETTLED = [
  { x: -130, y: 80 }, { x: -50, y: 100 }, { x: 40, y: 90 }, { x: 130, y: 75 },
  { x: -90,  y: 140},{ x:  10, y: 150 }, { x: 100, y: 135 },
  { x: -30,  y: 65 }, { x: 70, y: 120 },
]

function ChunkField({ phase, spiced, oiled }) {
  return (
    <div style={{ position: 'absolute', left: '50%', top: '50%', width: 0, height: 0, zIndex: 15 }}>
      {CHUNK_DEFS.map((c, i) => (
        <MangoChunk key={c.id} def={c} settled={SETTLED[i]} phase={phase} spiced={spiced} oiled={oiled} />
      ))}
    </div>
  )
}

function MangoChunk({ def, settled, phase, spiced, oiled }) {
  const exitY = phase >= 5 ? -300 : 0

  return (
    <motion.div
      style={{ position: 'absolute', left: 0, top: 0, transformOrigin: 'center' }}
      initial={{ x: 0, y: -200, rotate: 0, opacity: 0, scale: 0.2 }}
      animate={{
        x: settled.x,
        y: settled.y,
        rotate: def.rot,
        opacity: 1,
        scale: 1,
      }}
      exit={{ y: -350, opacity: 0, scale: 0.3, transition: { duration: 1.2, ease: 'easeIn' } }}
      transition={{ duration: 1.1, delay: def.delay, type: 'spring', stiffness: 180, damping: 22 }}
    >
      <ChunkSVG spiced={spiced} oiled={oiled} seed={def.id} />
    </motion.div>
  )
}

function ChunkSVG({ spiced, oiled, seed }) {
  const s = seed * 37
  const w = 44 + (s % 16)
  const h = 36 + ((s * 3) % 12)
  const id = `ck-${seed}`

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}
      style={{
        filter: oiled
          ? 'drop-shadow(0 0 6px rgba(180,140,0,0.5)) drop-shadow(0 2px 8px rgba(0,0,0,0.7))'
          : 'drop-shadow(0 2px 8px rgba(0,0,0,0.7))',
        overflow: 'visible',
      }}
    >
      <defs>
        <radialGradient id={`${id}-g`} cx="35%" cy="30%" r="65%">
          <stop offset="0%"   stopColor={oiled ? '#e8f060' : '#d6f040'} />
          <stop offset="45%"  stopColor={oiled ? '#90d010' : '#7ab808'} />
          <stop offset="100%" stopColor={oiled ? '#1e5504' : '#1a4a04'} />
        </radialGradient>
        {/* Flesh cross-section (cut face — pale yellow) */}
        <linearGradient id={`${id}-flesh`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#f8e868" />
          <stop offset="100%" stopColor="#c8a820" />
        </linearGradient>
      </defs>

      {/* Skin side (top) */}
      <path d={`M 4,${h/2} Q ${w/2},2 ${w-4},${h/2} Q ${w-2},${h-4} ${w/2},${h-2} Q 2,${h-4} 4,${h/2} Z`}
        fill={`url(#${id}-g)`} />

      {/* Cut flesh face (bottom) */}
      <path d={`M 4,${h/2} Q ${w/2},${h*0.55} ${w-4},${h/2} Q ${w-2},${h-4} ${w/2},${h-2} Q 2,${h-4} 4,${h/2} Z`}
        fill={`url(#${id}-flesh)`} opacity="0.9" />

      {/* Cut-face highlight */}
      <path d={`M 10,${h/2+2} Q ${w/2},${h*0.52} ${w-10},${h/2+2}`}
        fill="none" stroke="rgba(255,255,200,0.5)" strokeWidth="1.2" />

      {/* Spice coating */}
      {spiced && (
        <>
          {/* Red chilli specks */}
          {[...Array(5)].map((_, k) => {
            const px = 6 + ((seed * 13 + k * 17) % (w - 12))
            const py = 4 + ((seed * 7 + k * 23) % (h/2 - 6))
            return <circle key={k} cx={px} cy={py} r="1.8" fill="rgba(200,30,10,0.85)" />
          })}
          {/* Turmeric yellow dust */}
          {[...Array(4)].map((_, k) => {
            const px = 8 + ((seed * 19 + k * 11) % (w - 16))
            const py = 3 + ((seed * 5 + k * 29) % (h/2 - 8))
            return <circle key={k} cx={px} cy={py} r="1.4" fill="rgba(220,160,0,0.7)" />
          })}
        </>
      )}

      {/* Oil gloss */}
      {oiled && (
        <path d={`M 4,${h/2} Q ${w/2},2 ${w-4},${h/2}`}
          fill="none" stroke="rgba(200,180,40,0.35)" strokeWidth="3" />
      )}
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────
// PHASE LABEL
// ─────────────────────────────────────────────────────────────────
const PHASE_NAMES = [
  '', '', '', '', '', '', 'Raw Mango Pickle'
]

function PhaseLabel({ phase }) {
  const label = PHASE_NAMES[phase] || ''
  return (
    <AnimatePresence>
      {label && (
        <motion.div
          key={label}
          style={{
            position: 'absolute', bottom: 60, left: '50%', transform: 'translateX(-50%)',
            color: '#fff', fontFamily: 'Georgia, serif', fontSize: 32, fontWeight: 700,
            letterSpacing: 6, textTransform: 'uppercase', textAlign: 'center',
            zIndex: 100, pointerEvents: 'none',
            textShadow: '0 0 40px rgba(80,220,20,0.6), 0 2px 8px rgba(0,0,0,0.9)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          {label}
          <motion.div style={{
            height: 2, background: 'linear-gradient(to right, transparent, rgba(80,220,20,0.8), transparent)',
            marginTop: 8,
          }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
