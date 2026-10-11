import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { asset } from '../constants/global.constants'

const items = [
  {
    icon: asset('/img/icons/search.svg'),
    title: 'Easy to find',
    text: 'Urna, massa aliqua dui pellentesque. Ac, gravida in. Diam vitae, nec mattis lectus quam pretium amet facilisis.',
  },
  {
    icon: asset('/img/icons/price.svg'),
    title: 'Affordable Prices',
    text: 'Urna, massa aliqua dui pellentesque. Ac, gravida in. Diam vitae, nec mattis lectus quam pretium amet facilisis.',
  },
  {
    icon: asset('/img/icons/timer.svg'),
    title: 'Quickly Process',
    text: 'Urna, massa aliqua dui pellentesque. Ac, gravida in. Diam vitae, nec mattis lectus quam pretium amet facilisis.',
  },
]

export default function Why() {
  return (
    <section id="about" className="py-16 md:py-28">
      <div className="mx-auto max-w-[1450px] px-4">
        <Reveal>
          <h2 className="text-center text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] font-semibold capitalize">
            Why to choose us
          </h2>
        </Reveal>

        <div className="mt-12 flex flex-col items-center justify-between gap-12 md:flex-row md:items-start md:gap-8 lg:gap-12">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group flex max-w-[380px] flex-col items-center text-center"
            >
              <div className="relative mb-8 flex aspect-square w-[clamp(6.25rem,4.8rem+7.27vw,11.25rem)] items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-accent/12 transition-transform duration-500 group-hover:scale-110" />
                <motion.span
                  className="absolute inset-0 rounded-full bg-accent/10"
                  animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
                <img
                  src={item.icon}
                  alt=""
                  className="relative w-2/5 transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="text-[26px] font-semibold capitalize tracking-[0.01em]">
                {item.title}
              </h3>
              <p className="mt-2.5 text-lg leading-[1.7] text-mist">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
