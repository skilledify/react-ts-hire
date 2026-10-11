import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { reviews } from '../data/site'
import { asset } from '../constants/global.constants'

interface ReviewArrowProps {
  direction: 'prev' | 'next'
  onClick: () => void
}

function ReviewArrow({ direction, onClick }: ReviewArrowProps) {
  const isPrev = direction === 'prev'
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? 'Previous review' : 'Next review'}
      className="group cursor-pointer px-1"
    >
      <svg
        width="23"
        height="38"
        viewBox="0 0 23 38"
        fill="none"
        className={`transition-colors duration-200 ${
          isPrev ? 'rotate-180' : ''
        } fill-white group-hover:fill-accent`}
      >
        <path d="M4.56705 38L23 19L4.56705 0L0 4.70755L13.8659 19L0 33.2924L4.56705 38Z" />
      </svg>
    </button>
  )
}

export default function Reviews() {
  const [[index, direction], setState] = useState<[number, number]>([0, 0])
  const current = reviews[index]

  const paginate = (dir: number) =>
    setState(([i]): [number, number] => [(i + dir + reviews.length) % reviews.length, dir])

  return (
    <section className="relative overflow-hidden pb-20 md:pb-40">
      <motion.img
        src={asset('/img/reviews-deco.svg')}
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -left-24 -top-40 z-0 hidden h-[1100px] select-none opacity-70 md:block"
      />

      <div className="relative z-10 mx-auto max-w-[1020px] px-4 pt-24 md:pt-44">
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          aria-hidden="true"
          className="pointer-events-none absolute left-2 top-0 select-none text-[180px] leading-none text-accent md:left-0 md:text-[260px]"
        >
          &rdquo;
        </motion.span>

        <div className="relative min-h-[340px] sm:min-h-[300px] md:min-h-[280px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.blockquote
              key={current.id}
              custom={direction}
              initial={{ opacity: 0, x: direction >= 0 ? 80 : -80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction >= 0 ? -80 : 80 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[clamp(1.25rem,1.03rem+1.09vw,2rem)] capitalize leading-[1.57]">
                {current.text}
              </p>
              <footer className="mt-10">
                <div className="text-[22px] font-semibold capitalize tracking-[0.01em]">
                  {current.name}
                </div>
                <div className="text-lg text-mist">{current.job}</div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center gap-6 sm:absolute sm:right-0 sm:bottom-0 sm:mt-0 sm:gap-7">
          <span className="hidden h-14 w-px bg-line sm:block" />
          <div className="flex items-center gap-7">
            <ReviewArrow direction="prev" onClick={() => paginate(-1)} />
            <ReviewArrow direction="next" onClick={() => paginate(1)} />
          </div>
        </div>
      </div>
    </section>
  )
}
