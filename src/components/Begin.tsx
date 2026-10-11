import { motion } from 'framer-motion'
import { Link } from 'react-router'
import Reveal from './Reveal'
import { AppRoutes } from '../constants/global.constants'
const wavePaths = [
  { d: 'M-104 48C-3.02255 72.5207 219.946 210.45 304 566', opacity: 0.58 },
  { d: 'M-58 2C42.9774 26.5207 265.946 164.45 350 520', opacity: 0.47 },
  { d: 'M-148 98C-47.0226 122.521 189.5 282 251.5 616', opacity: 0.9 },
]
export default function Begin() {
  return (
    <section id="begin" className="relative py-20 md:py-40 overflow-hidden">
      {}
      <svg
        className="hidden md:block -bottom-64 left-0 z-0 absolute h-[620px] pointer-events-none select-none"
        width="352"
        height="617"
        viewBox="0 0 352 617"
        fill="none"
        aria-hidden="true"
      >
        {wavePaths.map((wave, i) => (
          <motion.path
            key={i}
            d={wave.d}
            opacity={wave.opacity}
            stroke="#63b59f"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: i * 0.25, ease: 'easeInOut' }}
          />
        ))}
      </svg>
      {}
      <svg
        className="hidden md:block -top-10 right-0 z-0 absolute pointer-events-none select-none"
        width="75"
        height="182"
        viewBox="0 0 75 182"
        fill="none"
        aria-hidden="true"
      >
        {[
          { x: 3.5, y: 3.5 },
          { x: 25.5, y: 43.5 },
          { x: 47.5, y: 83.5 },
        ].map((rect, i) => (
          <motion.rect
            key={i}
            x={rect.x}
            y={rect.y}
            width="83"
            height="95"
            fill="#63b59f"
            stroke="#121B25"
            strokeWidth="7"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </svg>
      <div className="z-10 relative flex md:flex-row flex-col justify-between items-center gap-10 mx-auto px-4 max-w-[1240px] md:text-left text-center">
        <Reveal className="md:flex-1">
          <h2 className="font-semibold text-[clamp(1.875rem,1.18rem+3.45vw,4.25rem)] capitalize leading-[1.26]">
            Let’s simply begin with hire.
          </h2>
        </Reveal>
        <Reveal delay={0.15} className="md:flex-1">
          <p className="text-mist text-lg leading-[1.7]">
            Neque, vestibulum sed varius magna et at. Eu, adipiscing morbi augue
            justo. Nibh laoreet volutpat quis velit. Blandit aliquam donec sed morbi
            congue eget lorem viverra porta id lobortis.
          </p>
          <motion.span
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block mt-12"
          >
            <Link
              to={AppRoutes.CONTACT_PAGE}
              className="bg-accent px-10 md:px-[42px] py-5 md:py-[22px] font-medium text-white text-xl md:text-2xl capitalize transition-colors duration-200 hover:bg-accent-dark"
            >
              Get Started
            </Link>
          </motion.span>
        </Reveal>
      </div>
    </section>
  )
}
