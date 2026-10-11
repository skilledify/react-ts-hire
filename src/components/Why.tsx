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
      <div className="mx-auto px-4 max-w-[1450px]">
        <Reveal>
          <h2 className="font-semibold text-[clamp(1.875rem,1.55rem+1.64vw,3rem)] text-center capitalize">
            Why to choose us
          </h2>
        </Reveal>
        <div className="flex md:flex-row flex-col justify-between items-center md:items-start gap-12 md:gap-8 lg:gap-12 mt-12">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col items-center max-w-[380px] text-center"
            >
              <div className="relative flex justify-center items-center mb-8 w-[clamp(6.25rem,4.8rem+7.27vw,11.25rem)] aspect-square">
                <span className="absolute inset-0 bg-accent/12 rounded-full group-hover:scale-110 transition-transform duration-500" />
                <motion.span
                  className="absolute inset-0 bg-accent/10 rounded-full"
                  animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
                <img
                  src={item.icon}
                  alt=""
                  className="relative w-2/5 group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-semibold text-[26px] capitalize tracking-[0.01em]">
                {item.title}
              </h3>
              <p className="mt-2.5 text-mist text-lg leading-[1.7]">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
