import { useScroll, motion } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        originX: 0,
        position: 'fixed', top: 0, left: 0, right: 0,
        height: 2, background: '#F4A300',
        zIndex: 9998, willChange: 'transform',
      }}
    />
  )
}
