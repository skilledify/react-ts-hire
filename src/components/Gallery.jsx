import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { galleryColumns } from '../data/site'
import Reveal from './Reveal'

function CrossfadeSlider({ images, interval = 5000, className = '' }) {
  const [[index, direction], setState] = useState([0, 1])

  useEffect(() => {
    const id = window.setInterval(
      () => setState(([i, d]) => [(i + d + images.length) % images.length, d]),
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
          className="absolute inset-0 h-full w-full object-cover"
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
      <div className="mx-auto flex max-w-[1450px] flex-col items-center gap-14 px-4 lg:flex-row lg:gap-16">
        <div className="flex w-full items-center justify-center gap-5 lg:w-[52%]">
          <CrossfadeSlider
            images={galleryColumns[0]}
            interval={5200}
            className="aspect-[7/11] w-[47%]"
          />
          <CrossfadeSlider
            images={galleryColumns[1]}
            interval={5200}
            className="aspect-[7/11] w-[47%]"
          />
        </div>

        <div className="w-full lg:w-[42%]">
          <Reveal>
            <h2 className="text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] font-semibold capitalize lg:max-w-[520px]">
              We help people to find homes
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-[22px] text-lg leading-[1.7] text-mist">
              Mauris orci donec blandit maecenas. Orci lorem purus porttitor massa
              consectetur. Neque, vestibulum sed varius magna et at. Eu, adipiscing
              morbi augue justo. Nibh laoreet volutpat quis velit. Blandit aliquam
              donec sed morbi congue eget lorem viverra porta id lobortis.
            </p>
            <motion.a
              href="#begin"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="mt-11 inline-block bg-accent px-10 py-5 text-xl font-medium capitalize text-white transition-colors duration-200 hover:bg-accent-dark md:px-[42px] md:py-[22px] md:text-2xl"
            >
              Get in touch
            </motion.a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
