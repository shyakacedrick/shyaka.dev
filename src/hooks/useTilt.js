import { useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion'
import { useCallback } from 'react'

/**
 * Mouse-tracking 3D tilt hook.
 * Returns rotateX/Y MotionValues driven by cursor position + a moving glare gradient.
 *
 * @param {number} strength  Max rotation in degrees (default 12)
 */
export function useTilt(strength = 12) {
  // Normalised cursor position (0–1 range, 0.5 = centre)
  const rawX = useMotionValue(0.5)
  const rawY = useMotionValue(0.5)

  const springConfig = { damping: 20, stiffness: 260, mass: 0.5 }

  // Tilt axes
  const rotateX = useSpring(
    useTransform(rawY, [0, 1], [strength, -strength]),
    springConfig
  )
  const rotateY = useSpring(
    useTransform(rawX, [0, 1], [-strength, strength]),
    springConfig
  )

  // Glare highlight that follows the cursor
  const glareX = useTransform(rawX, [0, 1], ['0%', '100%'])
  const glareY = useTransform(rawY, [0, 1], ['0%', '100%'])
  const glareOpacity = useSpring(
    useTransform(rawX, [0, 0.5, 1], [0.18, 0.0, 0.18]),
    springConfig
  )
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.14) 0%, transparent 62%)`

  const onMouseMove = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect()
      rawX.set((e.clientX - rect.left) / rect.width)
      rawY.set((e.clientY - rect.top) / rect.height)
    },
    [rawX, rawY]
  )

  const onMouseLeave = useCallback(() => {
    rawX.set(0.5)
    rawY.set(0.5)
  }, [rawX, rawY])

  return { rotateX, rotateY, glare, glareOpacity, onMouseMove, onMouseLeave }
}
