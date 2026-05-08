import { useEffect, useRef, useState } from 'react'

/**
 * Returns true once the element has entered the viewport.
 * Unobserves after the first trigger so the animation only plays once.
 */
export const useInView = (options = {}) => {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.unobserve(el)
      }
    }, { threshold: 0.2, ...options })

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, inView]
}

/**
 * Animates a number from 0 to `target` over `duration` ms
 * once `trigger` becomes true.
 */
export const useCountUp = (target, duration = 1400, trigger = false) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!trigger) return
    let start = null
    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [trigger, target, duration])

  return count
}
