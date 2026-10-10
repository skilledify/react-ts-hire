import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function FilterSelect({ config, value, onChange }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  return (
    <div ref={rootRef} className="relative px-5 py-4 md:px-8">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full cursor-pointer flex-col items-start text-left"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="flex items-center gap-1.5 text-base text-[#858585]">
          {config.label}
          <motion.svg
            width="10"
            height="7"
            viewBox="0 0 9 6"
            fill="none"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="text-[#858585]"
          >
            <path
              d="M4.5 5.75a.7.7 0 0 0 .53-.24l3.75-4.06a.75.75 0 1 0-1.06-1.06L4.5 3.79 1.28.39A.75.75 0 1 0 .22 1.45l3.75 4.06a.7.7 0 0 0 .53.24Z"
              fill="currentColor"
            />
          </motion.svg>
        </span>
        <span className="mt-1 max-w-full truncate text-lg font-semibold capitalize text-ink">
          {value}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 6, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="absolute inset-x-0 top-full z-30 overflow-hidden rounded-md bg-white shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
          >
            {config.options.map((option, i) => (
              <motion.li
                key={option}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * i, duration: 0.2 }}
              >
                <button
                  type="button"
                  role="option"
                  aria-selected={option === value}
                  onClick={() => {
                    onChange(option)
                    setOpen(false)
                  }}
                  className={`block w-full cursor-pointer px-4 py-2.5 text-left text-base capitalize transition-colors hover:bg-mist/70 ${
                    option === value ? 'text-ink' : 'text-ink/80'
                  }`}
                >
                  {option}
                </button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
