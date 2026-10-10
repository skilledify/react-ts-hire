import Header from './components/Header'
import Hero from './components/Hero'
import FeaturedIn from './components/FeaturedIn'
import Popular from './components/Popular'
import Why from './components/Why'
import Reviews from './components/Reviews'
import Gallery from './components/Gallery'
import Begin from './components/Begin'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <FeaturedIn />
        <Popular />
        <Why />
        <Reviews />
        <Gallery />
        <Begin />
      </main>
      <Footer />
    </div>
  )
}
