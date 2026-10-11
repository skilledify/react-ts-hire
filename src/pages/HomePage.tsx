import Hero from '../components/Hero'
import FeaturedIn from '../components/FeaturedIn'
import Popular from '../components/Popular'
import Why from '../components/Why'
import Reviews from '../components/Reviews'
import Gallery from '../components/Gallery'
import Begin from '../components/Begin'

/** Главная страница: композиция секций лендинга. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedIn />
      <Popular />
      <Why />
      <Reviews />
      <Gallery />
      <Begin />
    </>
  )
}
