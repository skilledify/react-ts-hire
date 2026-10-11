import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { SITE_META } from '../constants/global.constants'

interface AuthLayoutProps {
  title: string
  subtitle: string
  children: ReactNode
  /** Switch link at the bottom, e.g. to Login ↔ Sign Up. */
  footer: ReactNode
  /** Optional decorative benefits list shown on the left column. */
  highlights?: string[]
}

/**
 * Shared shell for the Login and Sign Up pages: a centered auth card on the
 * right and a brand/marketing column on the left (desktop only).
 */
export default function AuthLayout({
  title,
  subtitle,
  children,
  footer,
  highlights,
}: AuthLayoutProps) {
  return (
    <section className="relative overflow-hidden bg-ink py-16 md:py-24">
      <div className="mx-auto grid max-w-[1450px] items-center gap-12 px-4 lg:grid-cols-2 lg:gap-16">
        {/* Brand / marketing column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block"
        >
          <Link to="/" aria-label="Hire — home page">
            <img src="/img/logo.svg" alt="Hire" className="h-12 w-auto" />
          </Link>
          <h2 className="mt-8 text-[clamp(1.75rem,1.3rem+2.2vw,3rem)] font-semibold capitalize leading-[1.2]">
            {SITE_META.TAGLINE}
          </h2>
          <p className="mt-5 max-w-[520px] text-lg leading-[1.7] text-mist">
            {SITE_META.DESCRIPTION}
          </p>
          {highlights && highlights.length > 0 && (
            <ul className="mt-8 grid gap-4">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-lg text-cream">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-sm text-accent">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </motion.div>

        {/* Auth card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-[520px] border border-line bg-ink-soft p-6 md:p-10"
        >
          <div className="lg:hidden">
            <Link to="/" aria-label="Hire — home page" className="inline-block">
              <img src="/img/logo.svg" alt="Hire" className="h-10 w-auto" />
            </Link>
          </div>
          <h1 className="mt-6 text-[clamp(1.75rem,1.4rem+1.6vw,2.5rem)] font-semibold capitalize lg:mt-0">
            {title}
          </h1>
          <p className="mt-3 text-lg leading-[1.7] text-mist">{subtitle}</p>

          <div className="mt-8">{children}</div>

          <div className="mt-8 border-t border-line pt-6 text-center text-lg text-mist">
            {footer}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
