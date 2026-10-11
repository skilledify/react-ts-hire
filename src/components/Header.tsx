import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, NavLink } from 'react-router'
import { navLinks } from '../data/site'
import useLockBody from '../hooks/useLockBody'
import { AppRoutes } from '../constants/global.constants'

interface BurgerButtonProps {
  open: boolean
  onClick: () => void
}

function BurgerButton({ open, onClick }: BurgerButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      className="relative z-[60] flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-[7px] rounded-full border border-accent/40 transition-colors hover:border-accent lg:hidden"
    >
      <motion.span
        animate={open ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
        className="block h-[2px] w-5 bg-cream"
        transition={{ duration: 0.3 }}
      />
      <motion.span
        animate={open ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
        className="block h-[2px] w-5 bg-cream"
        transition={{ duration: 0.2 }}
      />
      <motion.span
        animate={open ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
        className="block h-[2px] w-5 bg-cream"
        transition={{ duration: 0.3 }}
      />
    </button>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  useLockBody(open)

  return (
    <header className="relative z-50">
      <div className="mx-auto flex max-w-[1450px] items-center justify-between gap-5 px-4 py-5 md:py-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="shrink-0"
        >
          <Link to={AppRoutes.HOME_PAGE} aria-label="Hire — home page">
            <img src="/img/logo.svg" alt="Hire" className="h-10 w-auto md:h-12" />
          </Link>
        </motion.div>

        {/* Desktop nav */}
        <motion.nav
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden items-center gap-8 lg:flex xl:gap-12"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `group relative py-1 text-base font-medium capitalize transition-colors ${
                  isActive ? 'text-white' : 'text-cream hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-[3px] w-full origin-left bg-accent transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden items-center gap-2 sm:flex"
        >
          <button
            type="button"
            className="cursor-pointer border-2 border-accent px-5 py-[10px] font-medium text-cream transition-colors duration-200 hover:bg-accent hover:text-white"
          >
            Login
          </button>
          <button
            type="button"
            className="cursor-pointer border-2 border-accent bg-accent px-5 py-[10px] font-medium text-white transition-colors duration-200 hover:bg-transparent hover:text-cream"
          >
            Sign Up
          </button>
        </motion.div>

        <BurgerButton open={open} onClick={() => setOpen((v) => !v)} />
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-ink/70 backdrop-blur-sm lg:hidden"
            />
            <motion.nav
              key="panel"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 left-0 z-50 flex w-[82%] max-w-sm flex-col items-center justify-center gap-2 bg-accent px-8 lg:hidden"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block py-2 text-3xl font-medium capitalize transition-opacity hover:opacity-80 ${
                        isActive ? 'text-white underline decoration-2 underline-offset-8' : 'text-white/85'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-8 flex gap-3"
              >
                <button
                  type="button"
                  className="cursor-pointer border-2 border-white px-6 py-2 font-medium text-white transition-colors hover:bg-white hover:text-accent"
                >
                  Login
                </button>
                <button
                  type="button"
                  className="cursor-pointer border-2 border-white bg-white px-6 py-2 font-medium text-accent transition-colors hover:bg-transparent hover:text-white"
                >
                  Sign Up
                </button>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
