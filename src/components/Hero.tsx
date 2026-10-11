import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { filterConfig } from '../data/site'
import { asset } from '../constants/global.constants'
import FilterSelect from './FilterSelect'

export default function Hero() {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(filterConfig.map((c) => [c.key, c.options[0]])) as Record<
      string,
      string
    >,
  )
  const [searching, setSearching] = useState(false)

  const handleSearch = () => {
    setSearching(true)
    window.setTimeout(() => setSearching(false), 1600)
  }

  return (
    <section id="home" className="relative pb-16 pt-6 md:pb-28">
      {/* Decorative rotated squares — wrapped in their own clipping layer so the
          hero-deco art is cut at the section edge WITHOUT clipping the open
          FilterSelect dropdowns (which must overflow past the section bottom). */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.img
          src={asset('/img/hero-deco.svg')}
          alt=""
          aria-hidden="true"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -bottom-40 right-0 z-0 hidden h-[500px] select-none xl:block"
        />
        <motion.img
          src={asset('/img/hero-deco.svg')}
          alt=""
          aria-hidden="true"
          className="absolute -bottom-24 right-0 z-0 hidden h-72 select-none md:block xl:hidden"
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1450px] items-start gap-10 px-4 lg:grid-cols-2">
        <div className="w-full">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(1.9rem,1.18rem+3.45vw,4.25rem)] font-semibold capitalize leading-[1.26]"
          >
            Perfect way to buy and sell a home
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-[18px] max-w-[620px] text-lg leading-[1.7] text-mist"
          >
            Diam vitae, nec mattis lectus quam pretium amet facilisis. Urna, massa
            aliqua dui pellentesque. Ac, gravida in eget non amet eget purus non.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full lg:justify-self-end"
        >
          <img
            src={asset('/img/hero.jpg')}
            alt="Modern family house"
            className="h-[420px] w-full object-cover object-center md:h-[520px]"
          />
        </motion.div>

        {/* Search filter — spans both columns, overlapping the hero bottom */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 -mt-4 grid grid-cols-1 rounded-[2px] bg-white shadow-[0_20px_60px_rgba(18,27,37,0.25)] sm:grid-cols-3 lg:col-span-2 lg:-mt-24 lg:w-[880px] lg:grid-cols-[1fr_1fr_1fr_165px]"
        >
            {filterConfig.map((config, i) => (
              <div
                key={config.key}
                className={`border-mist/60 ${i > 0 ? 'border-t sm:border-t-0 sm:border-l' : ''}`}
              >
                <FilterSelect
                  config={config}
                  value={values[config.key]}
                  onChange={(v) => setValues((prev) => ({ ...prev, [config.key]: v }))}
                />
              </div>
            ))}
            <div className="p-2">
              <button
                type="button"
                onClick={handleSearch}
                disabled={searching}
                className="relative h-full w-full cursor-pointer overflow-hidden bg-accent px-4 py-4 text-xl font-medium capitalize text-white transition-colors duration-200 hover:bg-accent-dark disabled:cursor-wait"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {searching ? (
                    <motion.span
                      key="spinner"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
                        className="block h-4 w-4 rounded-full border-2 border-white/40 border-t-white"
                      />
                      Searching…
                    </motion.span>
                  ) : (
                    <motion.span
                      key="search"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                    >
                      Search
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </motion.div>
      </div>
    </section>
  )
}
