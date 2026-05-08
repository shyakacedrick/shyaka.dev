import { motion } from 'framer-motion'
import { useInView, useCountUp } from '../../hooks/useAnimation'
import styles from './Stats.module.css'

const statsData = [
  { id: 1, value: 6,  suffix: '+', label: 'Years Experience' },
  { id: 2, value: 80, suffix: '+', label: 'Projects Delivered' },
  { id: 3, value: 30, suffix: '+', label: 'Happy Clients' },
  { id: 4, value: 12, suffix: '+', label: 'Design Awards' },
]

const StatCard = ({ stat, index, inView }) => {
  const count = useCountUp(stat.value, 1200, inView)
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className={styles.value}>
        {String(count).padStart(2, '0')}{stat.suffix}
      </span>
      <span className={styles.label}>{stat.label}</span>
    </motion.div>
  )
}

const Stats = () => {
  const [ref, inView] = useInView()

  return (
    <section className={styles.stats} ref={ref}>
      <div className={styles.grid}>
        {statsData.map((stat, i) => (
          <StatCard key={stat.id} stat={stat} index={i} inView={inView} />
        ))}
      </div>
    </section>
  )
}

export default Stats
