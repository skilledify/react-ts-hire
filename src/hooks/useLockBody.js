import { useEffect } from 'react'

/**
 * Locks body scrolling while `locked` is true (mobile menu, modals).
 */
export default function useLockBody(locked) {
  useEffect(() => {
    if (!locked) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [locked])
}
