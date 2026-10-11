import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, NavLink } from 'react-router'
import { navLinks } from '../data/site'
import useLockBody from '../hooks/useLockBody'
import { AppRoutes, asset } from '../constants/global.constants'
import { useAuth } from '../context/AuthContext'
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
      className="lg:hidden z-[60] relative flex flex-col justify-center items-center gap-[7px] border border-accent/40 hover:border-accent rounded-full w-10 h-10 transition-colors cursor-pointer shrink-0"
    >
      <motion.span
        animate={open ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
        className="block bg-cream w-5 h-[2px]"
        transition={{ duration: 0.3 }}
      />
      <motion.span
        animate={open ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
        className="block bg-cream w-5 h-[2px]"
        transition={{ duration: 0.2 }}
      />
      <motion.span
        animate={open ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
        className="block bg-cream w-5 h-[2px]"
        transition={{ duration: 0.3 }}
      />
    </button>
  )
}
export default function Header() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  useLockBody(open)
  return (
    <header className="z-50 relative">
      <div className="flex justify-between items-center gap-2 sm:gap-5 mx-auto px-4 py-5 md:py-8 max-w-[1450px]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="shrink-0"
        >
          <Link to={AppRoutes.HOME_PAGE} aria-label="Hire — home page">
            <img src={asset('/img/logo.svg')} alt="Hire" className="w-auto h-9 md:h-12" />
          </Link>
        </motion.div>
        {}
        <motion.nav
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden lg:flex items-center gap-8 xl:gap-12"
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
          className="flex items-center gap-1.5 sm:gap-2 shrink-0"
        >
          {user ? (
            <>
              <span className="hidden md:inline text-mist text-base">
                Hi, {user.name}
              </span>
              <button
                type="button"
                onClick={logout}
                className="hover:bg-accent px-2.5 sm:px-5 py-[9px] sm:py-[10px] border-2 border-accent font-medium text-cream hover:text-white text-sm sm:text-base whitespace-nowrap transition-colors duration-200 cursor-pointer"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to={AppRoutes.LOGIN_PAGE}
                className="hover:bg-accent px-2.5 sm:px-5 py-[9px] sm:py-[10px] border-2 border-accent font-medium text-cream hover:text-white text-sm sm:text-base whitespace-nowrap transition-colors duration-200 cursor-pointer"
              >
                Login
              </Link>
              <Link
                to={AppRoutes.SIGNUP_PAGE}
                className="bg-accent hover:bg-transparent px-2.5 sm:px-5 py-[9px] sm:py-[10px] border-2 border-accent font-medium text-white hover:text-cream text-sm sm:text-base whitespace-nowrap transition-colors duration-200 cursor-pointer"
              >
                Sign Up
              </Link>
            </>
          )}
        </motion.div>
        <BurgerButton open={open} onClick={() => setOpen((v) => !v)} />
      </div>
      {}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="lg:hidden z-40 fixed inset-0 bg-ink/70 backdrop-blur-sm"
            />
            <motion.nav
              key="panel"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden left-0 z-50 fixed inset-y-0 flex flex-col justify-center items-center gap-2 bg-accent px-6 sm:px-8 w-[82%] max-w-sm"
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
                      `block py-2 text-2xl font-medium capitalize transition-opacity hover:opacity-80 ${
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
                className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mt-8"
              >
                {user ? (
                  <button
                    type="button"
                    onClick={() => {
                      logout()
                      setOpen(false)
                    }}
                    className="hover:bg-white px-4 sm:px-6 py-2 border-2 border-white font-medium text-white hover:text-accent whitespace-nowrap transition-colors cursor-pointer"
                  >
                    Log out
                  </button>
                ) : (
                  <>
                    <Link
                      to={AppRoutes.LOGIN_PAGE}
                      onClick={() => setOpen(false)}
                      className="hover:bg-white px-4 sm:px-6 py-2 border-2 border-white font-medium text-white hover:text-accent whitespace-nowrap transition-colors cursor-pointer"
                    >
                      Login
                    </Link>
                    <Link
                      to={AppRoutes.SIGNUP_PAGE}
                      onClick={() => setOpen(false)}
                      className="bg-white hover:bg-transparent px-4 sm:px-6 py-2 border-2 border-white font-medium text-accent hover:text-white whitespace-nowrap transition-colors cursor-pointer"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
