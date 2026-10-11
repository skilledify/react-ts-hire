import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { SITE_META, asset } from '../constants/global.constants'
interface AuthLayoutProps {
  title: string
  subtitle: string
  children: ReactNode
  footer: ReactNode
  highlights?: string[]
}
export default function AuthLayout({
  title,
  subtitle,
  children,
  footer,
  highlights,
}: AuthLayoutProps) {
  return (
    <section className="relative bg-ink py-16 md:py-24 overflow-hidden">
      <div className="items-center gap-12 lg:gap-16 grid lg:grid-cols-2 mx-auto px-4 max-w-[1450px]">
        {}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block"
        >
          <Link to="/" aria-label="Hire — home page">
            <img src={asset('/img/logo.svg')} alt="Hire" className="w-auto h-12" />
          </Link>
          <h2 className="mt-8 font-semibold text-[clamp(1.75rem,1.3rem+2.2vw,3rem)] capitalize leading-[1.2]">
            {SITE_META.TAGLINE}
          </h2>
          <p className="mt-5 max-w-[520px] text-mist text-lg leading-[1.7]">
            {SITE_META.DESCRIPTION}
          </p>
          {highlights && highlights.length > 0 && (
            <ul className="gap-4 grid mt-8">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-cream text-lg">
                  <span className="flex justify-center items-center bg-accent/15 mt-1 rounded-full w-6 h-6 text-accent text-sm shrink-0">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </motion.div>
        {}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="bg-ink-soft mx-auto p-6 md:p-10 border border-line w-full max-w-[520px]"
        >
          <div className="lg:hidden">
            <Link to="/" aria-label="Hire — home page" className="inline-block">
              <img src={asset('/img/logo.svg')} alt="Hire" className="w-auto h-10" />
            </Link>
          </div>
          <h1 className="mt-6 lg:mt-0 font-semibold text-[clamp(1.75rem,1.4rem+1.6vw,2.5rem)] capitalize">
            {title}
          </h1>
          <p className="mt-3 text-mist text-lg leading-[1.7]">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <div className="mt-8 pt-6 border-line border-t text-mist text-lg text-center">
            {footer}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
