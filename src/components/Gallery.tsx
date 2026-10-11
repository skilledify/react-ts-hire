import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router'
import { galleryColumns } from '../data/site'
import Reveal from './Reveal'
import { AppRoutes } from '../constants/global.constants'
interface CrossfadeSliderProps {
  images: string[]
  interval?: number
  className?: string
}
function CrossfadeSlider({
  images,
  interval = 5000,
  className = '',
}: CrossfadeSliderProps) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = window.setInterval(
      () =>
        setIndex((i) => (i + 1) % images.length),
      interval,
    )
    return () => window.clearInterval(id)
  }, [images.length, interval])
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence initial={false}>
        <motion.img
          key={images[index]}
          src={images[index]}
          alt="Interior showcase"
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.1, ease: 'easeInOut' },
            scale: { duration: interval / 1000 + 1, ease: 'linear' },
          }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
    </div>
  )
}
export default function Gallery() {
  return (
    <section
      id="gallery"
      className="bg-gradient-to-l from-ink-soft to-transparent py-16 md:py-28"
    >
      <div className="flex lg:flex-row flex-col items-center gap-14 lg:gap-16 mx-auto px-4 max-w-[1450px]">
        <div className="flex justify-center items-center gap-5 w-full lg:w-[52%]">
          <CrossfadeSlider
            images={galleryColumns[0]}
            interval={5200}
            className="w-[47%] aspect-[7/11]"
          />
          <CrossfadeSlider
            images={galleryColumns[1]}
            interval={5200}
            className="w-[47%] aspect-[7/11]"
          />
        </div>
        <div className="w-full lg:w-[42%]">
          <Reveal>
            <h2 className="lg:max-w-[520px] font-semibold text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] capitalize">
              We help people to find homes
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-[22px] text-mist text-lg leading-[1.7]">
              Mauris orci donec blandit maecenas. Orci lorem purus porttitor massa
              consectetur. Neque, vestibulum sed varius magna et at. Eu, adipiscing
              morbi augue justo. Nibh laoreet volutpat quis velit. Blandit aliquam
              donec sed morbi congue eget lorem viverra porta id lobortis.
            </p>
            <motion.span
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block mt-11"
            >
              <Link
                to={AppRoutes.CONTACT_PAGE}
                className="bg-accent px-10 md:px-[42px] py-5 md:py-[22px] font-medium text-white text-xl md:text-2xl capitalize transition-colors duration-200 hover:bg-accent-dark"
              >
                Get in touch
              </Link>
            </motion.span>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
