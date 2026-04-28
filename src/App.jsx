import Nav from './components/Nav'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import SectionDivider from './components/SectionDivider'
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
      <SectionDivider items={[{icon:'🥭',label:'Hand Picked'},{icon:'🫙',label:'No Preservatives'},{icon:'🌿',label:'100% Natural'},{icon:'🏠',label:'Homemade'}]} />
      <Order />
      <SectionDivider items={[{icon:'❤️',label:'Made with Love'},{icon:'✨',label:'Since 2023'},{icon:'🚚',label:'Pan India Delivery'}]} />
      <Story />
      <Testimonials />
      <Feedback />
      <Footer />
    </>
  )
}
