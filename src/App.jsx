import { useState, useEffect } from 'react'
import Nav from './components/Nav'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Intro from './components/Intro'
import Hero from './sections/Hero'
import Ticker from './sections/Ticker'
import Products from './sections/Products'
import Order from './sections/Order'
import Story from './sections/Story'
import Testimonials from './sections/Testimonials'
import Feedback from './sections/Feedback'
import Footer from './sections/Footer'
import './App.css'

export default function App() {
  const [introDone, setIntroDone] = useState(false)

  useEffect(() => {
    document.body.style.overflow = introDone ? '' : 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [introDone])

  return (
    <>
      <Intro onDone={() => setIntroDone(true)} />
      <CustomCursor />
      <ScrollProgress />
      {/* Grain overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9990, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        opacity: 0.025,
      }} />

      <div style={{ opacity: introDone ? 1 : 0, transition: 'opacity 0.4s ease' }}>
        <Nav />
        <Hero />
        <Ticker />
        <Products />
        <Order />
        <Story />
        <Testimonials />
        <Feedback />
        <Footer />
      </div>
    </>
  )
}
