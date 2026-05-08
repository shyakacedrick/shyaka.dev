import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import servicesData from '../../services/services'
import styles from './Services.module.css'

/* ─── helpers ─── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

/* ─── Deliverable pill ─── */
const Pill = ({ label, i }) => (
  <motion.span
    className={styles.pill}
    initial={{ opacity: 0, scale: 0.85, y: 8 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.35, delay: i * 0.055, ease: [0.22, 1, 0.36, 1] }}
  >
    {label}
  </motion.span>
)

/* ─── Single service row ─── */
const ServiceRow = ({ service, index, isActive, onToggle }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })

  return (
    <motion.div
      ref={ref}
      className={`${styles.row} ${isActive ? styles.rowActive : ''}`}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onToggle()}
      aria-expanded={isActive}
    >
      {/* Top row: number + title + icon + toggle */}
      <div className={styles.rowHeader}>
        <span className={styles.serviceNum}>{service.id}</span>

        <div className={styles.titleBlock}>
          <h3 className={styles.serviceTitle}>{service.title}</h3>
          <span className={styles.serviceTagline}>{service.tagline}</span>
        </div>

        <motion.span
          className={styles.serviceIcon}
          animate={isActive ? { scale: 1.2, color: 'var(--color-accent)' } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {service.icon}
        </motion.span>

        <motion.div
          className={styles.toggleBtn}
          animate={{ rotate: isActive ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <span />
          <span />
        </motion.div>
      </div>

      {/* Expandable body */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            className={styles.rowBody}
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.bodyInner}>
              {/* Description */}
              <p className={styles.serviceDesc}>{service.description}</p>

              {/* Deliverables */}
              <div className={styles.deliverables}>
                <span className={styles.delLabel}>What you get</span>
                <div className={styles.pillGrid}>
                  {service.deliverables.map((d, i) => (
                    <Pill key={d} label={d} i={i} />
                  ))}
                </div>
              </div>

              {/* CTA */}
              <motion.a
                href="mailto:hello@portfolio.dev"
                className={styles.rowCta}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                onClick={(e) => e.stopPropagation()}
              >
                Start a project
                <motion.span
                  className={styles.ctaArrow}
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  →
                </motion.span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom divider — animated on active */}
      <motion.div
        className={styles.rowLine}
        animate={{ scaleX: isActive ? 1 : 1, backgroundColor: isActive ? 'var(--color-accent)' : 'var(--color-border)' }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  )
}

/* ─── Main section ─── */
const Services = () => {
  const [activeId, setActiveId] = useState(null)

  const toggle = (id) => setActiveId((prev) => (prev === id ? null : id))

  return (
    <section className={styles.services} id="services">

      {/* Header */}
      <div className={styles.header}>
        <motion.div className={styles.sectionLabel} {...fadeUp(0)}>
          <span className={styles.labelLine} />
          What I Do
        </motion.div>

        <motion.h2 className={styles.heading} {...fadeUp(0.07)}>
          Services
          <br />
          <span className={styles.headingSub}>built around you</span>
        </motion.h2>

        <motion.p className={styles.intro} {...fadeUp(0.14)}>
          A focused set of disciplines, delivered end-to-end or as standalone engagements.
          From first sketch to final deployment.
        </motion.p>
      </div>

      {/* Big background number */}
      <div className={styles.bgNumber} aria-hidden="true">
        {activeId ?? '00'}
      </div>

      {/* Service rows */}
      <div className={styles.list}>
        {servicesData.map((svc, i) => (
          <ServiceRow
            key={svc.id}
            service={svc}
            index={i}
            isActive={activeId === svc.id}
            onToggle={() => toggle(svc.id)}
          />
        ))}
      </div>

      {/* Bottom CTA banner */}
      <motion.div className={styles.ctaBanner} {...fadeUp(0.1)}>
        <span className={styles.ctaBannerText}>Have a project in mind?</span>
        <a href="mailto:hello@portfolio.dev" className={styles.ctaBannerBtn}>
          Let's Talk
          <span>↗</span>
        </a>
      </motion.div>
    </section>
  )
}

export default Services
