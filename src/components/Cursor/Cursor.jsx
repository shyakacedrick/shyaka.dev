import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import styles from './Cursor.module.css'

const Cursor = () => {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)

  // Large ring — laggy spring for smooth trail
  const springX = useSpring(cursorX, { stiffness: 80, damping: 18, mass: 0.5 })
  const springY = useSpring(cursorY, { stiffness: 80, damping: 18, mass: 0.5 })

  // Small dot — snappy, near-instant
  const dotSpringX = useSpring(dotX, { stiffness: 300, damping: 25 })
  const dotSpringY = useSpring(dotY, { stiffness: 300, damping: 25 })

  const isHoveringRef = useRef(false)

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      dotX.set(e.clientX)
      dotY.set(e.clientY)
    }

    const onEnter = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) {
        isHoveringRef.current = true
        document.documentElement.setAttribute('data-cursor-hover', 'true')
      }
    }
    const onLeave = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) {
        isHoveringRef.current = false
        document.documentElement.removeAttribute('data-cursor-hover')
      }
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', onEnter)
    window.addEventListener('mouseout', onLeave)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', onEnter)
      window.removeEventListener('mouseout', onLeave)
    }
  }, [cursorX, cursorY, dotX, dotY])

  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        className={styles.ring}
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      />
      {/* Snappy dot */}
      <motion.div
        className={styles.dot}
        style={{ x: dotSpringX, y: dotSpringY, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  )
}

export default Cursor
