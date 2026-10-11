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
      className="group px-1 cursor-pointer"
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
    <section className="relative pb-20 md:pb-40 overflow-hidden">
      <motion.img
        src={asset('/img/reviews-deco.svg')}
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:block -top-40 -left-24 z-0 absolute opacity-70 h-[1100px] pointer-events-none select-none"
      />
      <div className="z-10 relative mx-auto px-4 pt-24 md:pt-44 max-w-[1020px]">
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          aria-hidden="true"
          className="top-0 left-2 md:left-0 absolute text-[180px] text-accent md:text-[260px] leading-none pointer-events-none select-none"
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
                <div className="font-semibold text-[22px] capitalize tracking-[0.01em]">
                  {current.name}
                </div>
                <div className="text-mist text-lg">{current.job}</div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>
        <div className="sm:right-0 sm:bottom-0 sm:absolute flex items-center gap-6 sm:gap-7 mt-8 sm:mt-0">
          <span className="hidden sm:block bg-line w-px h-14" />
          <div className="flex items-center gap-7">
            <ReviewArrow direction="prev" onClick={() => paginate(-1)} />
            <ReviewArrow direction="next" onClick={() => paginate(1)} />
          </div>
        </div>
      </div>
    </section>
  )
}
