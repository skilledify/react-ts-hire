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
    <section id="home" className="relative pt-6 pb-16 md:pb-28">
      {}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.img
          src={asset('/img/hero-deco.svg')}
          alt=""
          aria-hidden="true"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="hidden xl:block right-0 -bottom-40 z-0 absolute h-[500px] select-none"
        />
        <motion.img
          src={asset('/img/hero-deco.svg')}
          alt=""
          aria-hidden="true"
          className="hidden xl:hidden md:block right-0 -bottom-24 z-0 absolute h-72 select-none"
        />
      </div>
      <div className="z-10 relative items-start gap-10 grid lg:grid-cols-2 mx-auto px-4 max-w-[1450px]">
        <div className="w-full">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-semibold text-[clamp(1.9rem,1.18rem+3.45vw,4.25rem)] capitalize leading-[1.26]"
          >
            Perfect way to buy and sell a home
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-[18px] max-w-[620px] text-mist text-lg leading-[1.7]"
          >
            Diam vitae, nec mattis lectus quam pretium amet facilisis. Urna, massa
            aliqua dui pellentesque. Ac, gravida in eget non amet eget purus non.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="lg:justify-self-end w-full"
        >
          <img
            src={asset('/img/hero.jpg')}
            alt="Modern family house"
            className="w-full h-[420px] md:h-[520px] object-center object-cover"
          />
        </motion.div>
        {}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="z-20 relative grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_165px] lg:col-span-2 bg-white shadow-[0_20px_60px_rgba(18,27,37,0.25)] -mt-4 lg:-mt-24 rounded-[2px] lg:w-[880px]"
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
                className="relative bg-accent px-4 py-4 w-full h-full overflow-hidden font-medium text-white text-xl capitalize transition-colors duration-200 hover:bg-accent-dark cursor-pointer disabled:cursor-wait"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {searching ? (
                    <motion.span
                      key="spinner"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      className="flex justify-center items-center gap-2"
                    >
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
                        className="block border-2 border-white/40 border-t-white rounded-full w-4 h-4"
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
