import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)

    // Make anchor links work with Lenis
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault()
        const target = document.querySelector(a.getAttribute('href'))
        if (target) lenis.scrollTo(target, { offset: -80 })
      })
    })

    return () => lenis.destroy()
  }, [])

  return null
}
