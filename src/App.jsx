import Nav from './components/Nav'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
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
      <Nav />
      <Hero />
      <Ticker />
      <Products />
      <Order />
      <Story />
      <Testimonials />
      <Feedback />
      <Footer />
    </>
  )
}
