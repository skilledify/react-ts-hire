import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView } from 'framer-motion'
interface AnimatedNumberProps {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  format?: (value: number) => string
  className?: string
}
const defaultFormat = (value: number) => Math.round(value).toLocaleString('en-US')
export default function AnimatedNumber({
  value,
  prefix,
  suffix,
  duration = 1.6,
  format = defaultFormat,
  className,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [display, setDisplay] = useState(() => format(0))
  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(format(latest)),
    })
    return () => controls.stop()
  }, [inView, value, duration, format])
  return (
    <motion.span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </motion.span>
  )
}
