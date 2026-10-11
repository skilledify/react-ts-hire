import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import Breadcrumbs from './Breadcrumbs'
import { asset } from '../constants/global.constants'
interface PageHeroProps {
  title: string
  subtitle?: string
  children?: ReactNode
}
export default function PageHero({ title, subtitle, children }: PageHeroProps) {
  return (
    <section className="relative bg-ink-soft pt-10 md:pt-14 pb-16 md:pb-24 overflow-hidden">
      <motion.img
        src={asset('/img/hero-deco.svg')}
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 0.35, x: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="hidden xl:block right-0 -bottom-32 z-0 absolute h-[420px] pointer-events-none select-none"
      />
      <div className="z-10 relative mx-auto px-4 max-w-[1450px]">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Breadcrumbs />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-semibold text-[clamp(1.9rem,1.18rem+3.45vw,4.25rem)] capitalize leading-[1.26]"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-[680px] text-mist text-lg leading-[1.7]"
          >
            {subtitle}
          </motion.p>
        )}
        {children}
      </div>
    </section>
  )
}
