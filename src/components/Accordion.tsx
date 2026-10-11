import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Faq } from '../data/site'

interface AccordionProps {
  items: Faq[]
}

/**
 * FAQ accordion: only one item open at a time, animated with AnimatePresence.
 */
export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="mx-auto max-w-[900px]">
      {items.map((item, i) => {
        const open = openIndex === i
        return (
          <motion.div
            key={item.question}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            className="border-b border-line"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              className="flex w-full cursor-pointer items-center justify-between gap-4 py-6 text-left"
            >
              <span className="text-lg font-medium md:text-xl">{item.question}</span>
              <motion.span
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ duration: 0.3 }}
                className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent text-accent"
              >
                <span className="absolute h-[14px] w-[2px] bg-accent" />
                <span className="absolute h-[2px] w-[14px] bg-accent" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 pr-10 text-lg leading-[1.7] text-mist">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}
