import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import styles from './Background.module.css'

/**
 * Draws a subtle animated dot-grid on canvas that slowly drifts.
 * Tinted by the CSS accent color so it adapts to both themes.
 */
const Background = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    const SPACING = 36
    const RADIUS = 1.2
    let offset = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Read accent color from CSS variable so it adapts to theme
      const accent = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-accent').trim()

      ctx.fillStyle = accent
      ctx.globalAlpha = 0.18

      const cols = Math.ceil(canvas.width / SPACING) + 2
      const rows = Math.ceil(canvas.height / SPACING) + 2
      const ox = (offset % SPACING)

      for (let c = -1; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const x = c * SPACING + ox
          const y = r * SPACING
          ctx.beginPath()
          ctx.arc(x, y, RADIUS, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      ctx.globalAlpha = 1
      offset += 0.18
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className={styles.wrapper} aria-hidden="true">
      {/* Dot grid canvas */}
      <canvas ref={canvasRef} className={styles.canvas} />

      {/* Large ambient gradient blobs */}
      <motion.div
        className={styles.blob1}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={styles.blob2}
        animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      {/* Thin horizontal scan line */}
      <motion.div
        className={styles.scanLine}
        animate={{ top: ['-2%', '102%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear', repeatDelay: 5 }}
      />
    </div>
  )
}

export default Background
