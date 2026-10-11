import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import Breadcrumbs from './Breadcrumbs'
import { asset } from '../constants/global.constants'

interface PageHeroProps {
  title: string
  subtitle?: string
  children?: ReactNode
}

/**
 * Hero for inner pages: breadcrumbs, animated title and optional subtitle.
 */
export default function PageHero({ title, subtitle, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-ink-soft pb-16 pt-10 md:pb-24 md:pt-14">
      <motion.img
        src={asset('/img/hero-deco.svg')}
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 0.35, x: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -bottom-32 right-0 z-0 hidden h-[420px] select-none xl:block"
      />
      <div className="relative z-10 mx-auto max-w-[1450px] px-4">
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
          className="mt-6 text-[clamp(1.9rem,1.18rem+3.45vw,4.25rem)] font-semibold capitalize leading-[1.26]"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-[680px] text-lg leading-[1.7] text-mist"
          >
            {subtitle}
          </motion.p>
        )}
        {children}
      </div>
    </section>
  )
}
