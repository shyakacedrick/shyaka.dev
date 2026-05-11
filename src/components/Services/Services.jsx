import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import servicesData from '../../services/services'
import { useTilt } from '../../hooks/useTilt'
import styles from './Services.module.css'

/* ─── helpers ─── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

/* ── Deliverable pill from your first code ── */
const Pill = ({ label }) => (
  <span className={styles.pill}>{label}</span>
)

const ServiceCard = ({ service, index, activeIndex, layoutMode, onSelect }) => {
  const offset = index - activeIndex
  const isActive = index === activeIndex
  const isMobile = layoutMode === 'mobile'
  const isTablet = layoutMode === 'tablet'
  const isLandscape = layoutMode === 'landscape'
  const spacing = isLandscape ? 170 : isMobile ? 170 : isTablet ? 220 : 260
  const sideScale = isLandscape ? 0.76 : isMobile ? 0.84 : 0.8
  const activeScale = isLandscape ? 0.96 : isMobile ? 1 : 1.1
  const hiddenThreshold = isMobile || isLandscape ? 1 : 2

  const rotateY = isMobile ? 0 : offset === 0 ? 0 : offset > 0 ? (isLandscape ? -30 : -45) : (isLandscape ? 30 : 45)
  const z = isActive ? 0 : isMobile ? -90 : isLandscape ? -110 : -200

  // rotateX-only tilt — carousel controls rotateY, so we only tilt fore/aft
  const { rotateX, glare, glareOpacity, onMouseMove, onMouseLeave } = useTilt(10)

  return (
    <motion.article
      className={`${styles.card} ${isActive ? styles.activeCard : ''}`}
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      aria-label={`Show ${service.title}`}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onSelect()
        }
      }}
      initial={false}
      animate={{
        x: offset * spacing,
        scale: isActive ? activeScale : sideScale,
        opacity: Math.abs(offset) > hiddenThreshold ? 0 : isActive ? 1 : isMobile ? 0.28 : 0.4,
        rotateY: rotateY,
        z: z,
        zIndex: isActive ? 10 : 5 - Math.abs(offset),
      }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={isActive ? {} : { y: -8 }}
      style={isActive ? { rotateX, transformPerspective: 900 } : {}}
      onMouseMove={isActive ? onMouseMove : undefined}
      onMouseLeave={isActive ? onMouseLeave : undefined}
    >
      <div className={styles.cardHeader}>
        <span className={styles.cardNum}>{service.id < 10 ? `0${service.id}` : service.id}</span>
        <div className={styles.iconWrapper}>{service.icon}</div>
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{service.title}</h3>
        <div className={styles.pillGrid}>
          {service.deliverables?.slice(0, 2).map((d) => (
            <Pill key={d} label={d} />
          ))}
        </div>

        <p className={styles.cardDesc}>{service.description}</p>

        {/* CTA from your previous code */}
        <motion.a
          href="mailto:hello@portfolio.dev"
          className={styles.rowCta}
          whileHover={{ x: 5 }}
          onClick={(event) => event.stopPropagation()}
        >
          Start a project
          <span className={styles.ctaArrow}>→</span>
        </motion.a>
      </div>
      {isActive && (
        <motion.div className={styles.glare} style={{ background: glare, opacity: glareOpacity }} />
      )}
    </motion.article>
  )
}

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [layoutMode, setLayoutMode] = useState('desktop')

  useEffect(() => {
    const updateLayoutMode = () => {
      const isLandscape = window.innerWidth > window.innerHeight && window.innerHeight <= 620

      if (isLandscape) {
        setLayoutMode('landscape')
        return
      }

      if (window.innerWidth < 640) {
        setLayoutMode('mobile')
        return
      }

      if (window.innerWidth < 960) {
        setLayoutMode('tablet')
        return
      }

      setLayoutMode('desktop')
    }

    updateLayoutMode()
    window.addEventListener('resize', updateLayoutMode)

    return () => window.removeEventListener('resize', updateLayoutMode)
  }, [])

  const next = () => setActiveIndex((prev) => (prev + 1) % servicesData.length)
  const prev = () => setActiveIndex((prev) => (prev - 1 + servicesData.length) % servicesData.length)

  return (
    <section className={styles.spaceSection}>
      {/* Visual Space Effects */}
      <div className={styles.stars} />
      <div className={styles.nebula} />

      <div className={styles.header}>
        <motion.div className={styles.sectionLabel} {...fadeUp(0)}>
          <span className={styles.labelLine} />
          Services
        </motion.div>
        <motion.h2 className={styles.heading} {...fadeUp(0.1)}>Our Best Service</motion.h2>
      </div>

      <motion.div
        className={styles.carouselStage}
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.08}
        onDragEnd={(_, info) => {
          if (info.offset.x <= -40) next()
          if (info.offset.x >= 40) prev()
        }}
      >
        <div className={styles.cardsWrapper}>
          {servicesData.map((svc, i) => (
            <ServiceCard 
              key={svc.id} 
              service={svc} 
              index={i} 
              activeIndex={activeIndex} 
              layoutMode={layoutMode}
              onSelect={() => setActiveIndex(i)}
            />
          ))}
        </div>
      </motion.div>

      <motion.div className={styles.navControls} {...fadeUp(0.3)}>
        <button onClick={prev} className={styles.navBtn} aria-label="Previous service">←</button>
        <div className={styles.navDots}>
          {servicesData.map((service, index) => (
            <button
              key={service.id}
              type="button"
              className={`${styles.navDot} ${index === activeIndex ? styles.navDotActive : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to ${service.title}`}
            />
          ))}
        </div>
        <button onClick={next} className={`${styles.navBtn} ${styles.navBtnNext}`} aria-label="Next service">→</button>
      </motion.div>
    </section>
  )
}

export default Services