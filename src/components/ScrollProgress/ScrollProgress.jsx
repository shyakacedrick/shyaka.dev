import { motion, useScroll, useTransform } from 'framer-motion'
import styles from './ScrollProgress.module.css'

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  const dotY = useTransform(scrollYProgress, [0, 1], [14, 166])

  return (
    <div className={styles.scrollProgress} aria-hidden="true">
      <svg className={styles.svg} viewBox="0 0 32 180" fill="none">
        <path className={styles.track} d="M16 14V166" />
        <motion.path
          className={styles.active}
          d="M16 14V166"
          style={{ pathLength: scrollYProgress }}
        />
        <circle className={styles.cap} cx="16" cy="14" r="3" />
        <circle className={styles.cap} cx="16" cy="166" r="3" />
        <motion.circle className={styles.dot} cx="16" cy={dotY} r="4" />
      </svg>
    </div>
  )
}

export default ScrollProgress
