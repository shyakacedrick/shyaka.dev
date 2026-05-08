import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useAnimation'
import styles from './Work.module.css'

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

const ProjectCard = ({ project, index }) => {
  return (
    <motion.article
      className={styles.card}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      custom={index}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
    >
      <div className={styles.cardHeader}>
        <span className={styles.category}>{project.category}</span>
        <span className={styles.year}>{project.year}</span>
      </div>

      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.description}>{project.description}</p>

      <div className={styles.footer}>
        <div className={styles.techList}>
          {project.tech.map((t) => (
            <span key={t} className={styles.techTag}>{t}</span>
          ))}
        </div>
        <a href="#" className={styles.viewLink} aria-label={`View ${project.title}`}>
          View →
        </a>
      </div>
    </motion.article>
  )
}

const Work = ({ projects }) => {
  const [ref, inView] = useInView()

  return (
    <section className={styles.work} id="work">
      <motion.div
        className={styles.header}
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className={styles.sectionTitle}>Selected Work</h2>
        <p className={styles.sectionSub}>
          A curated collection of projects built with intent and craft.
        </p>
      </motion.div>

      <div className={styles.grid}>
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}

export default Work
