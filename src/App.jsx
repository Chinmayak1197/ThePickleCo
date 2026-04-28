import Nav from './components/Nav'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import ScrollBanner from './components/ScrollBanner'
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
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9990, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        opacity: 0.025,
      }} />
      <Nav />
      <Hero />
      <Ticker />
      <Products />
      <ScrollBanner text="Handcrafted with Love" direction={1}  bg="#0C2416" color="#F4A300" />
      <Order />
      <ScrollBanner text="No Preservatives · All Natural · Since 2023" direction={-1} bg="#FFF8E7" color="#2D7A50" />
      <Story />
      <ScrollBanner text="Straight from Nidhi's Kitchen" direction={1} bg="#0C2416" color="rgba(255,255,255,0.15)" />
      <Testimonials />
      <Feedback />
      <Footer />
    </>
  )
}
