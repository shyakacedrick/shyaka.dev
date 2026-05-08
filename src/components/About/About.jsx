import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import about from '../../services/about'
import styles from './About.module.css'

/* ─── animation presets ─── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

/* ─── Skill bar ─── */
const SkillBar = ({ label, level, index }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <div className={styles.skillRow} ref={ref}>
      <div className={styles.skillMeta}>
        <span className={styles.skillLabel}>{label}</span>
        <span className={styles.skillPct}>{level}%</span>
      </div>
      <div className={styles.barTrack}>
        <motion.div
          className={styles.barFill}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay: 0.1 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Glowing head */}
        <motion.div
          className={styles.barGlow}
          initial={{ left: 0, opacity: 0 }}
          animate={inView ? { left: `${level}%`, opacity: [0, 1, 0] } : {}}
          transition={{ duration: 1, delay: 0.1 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}

/* ─── Portrait card ─── */
const PortraitCard = () => (
  <motion.div
    className={styles.portraitWrap}
    initial={{ opacity: 0, scale: 0.94, y: 30 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
  >
    {/* Decorative corner brackets */}
    <span className={`${styles.bracket} ${styles.tl}`} />
    <span className={`${styles.bracket} ${styles.tr}`} />
    <span className={`${styles.bracket} ${styles.bl}`} />
    <span className={`${styles.bracket} ${styles.br}`} />

    {/* Avatar placeholder — replace src with a real photo */}
    <div className={styles.avatar}>
      <span className={styles.avatarInitials}>{about.initials}</span>
      {/* Pulsing ring */}
      <motion.span
        className={styles.avatarRing}
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.15, 0.5] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>

    {/* Info chip */}
    <div className={styles.infoChip}>
      <span className={styles.chipRole}>{about.role}</span>
      <span className={styles.chipDivider} />
      <span className={styles.chipLocation}>{about.location}</span>
    </div>

    {/* Year badge */}
    <div className={styles.yearBadge}>
      <span className={styles.yearLabel}>Since</span>
      <span className={styles.yearValue}>{about.since}</span>
    </div>

    {/* Floating accent ring */}
    <motion.div
      className={styles.floatRing}
      animate={{ rotate: 360 }}
      transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
    />
  </motion.div>
)

/* ─── Main section ─── */
const About = () => {
  return (
    <section className={styles.about} id="about">

      {/* Section label */}
      <motion.div className={styles.sectionLabel} {...fadeUp(0)}>
        <span className={styles.labelLine} />
        About Me
      </motion.div>

      <div className={styles.grid}>

        {/* ── LEFT — portrait ── */}
        <PortraitCard />

        {/* ── RIGHT — content ── */}
        <div className={styles.content}>

          {/* Headline with split words */}
          <motion.h2 className={styles.heading} {...fadeUp(0.05)}>
            Building things
            <br />
            <span className={styles.accentWord}>people love</span>
            <span className={styles.headingDot}>.</span>
          </motion.h2>

          {/* Bio paragraphs */}
          <div className={styles.bioBlock}>
            {about.bio.map((para, i) => (
              <motion.p key={i} className={styles.bio} {...fadeUp(0.1 + i * 0.08)}>
                {para}
              </motion.p>
            ))}
          </div>

          {/* Skill bars */}
          <motion.div className={styles.skillsBlock} {...fadeUp(0.2)}>
            <p className={styles.blockTitle}>Core Expertise</p>
            {about.skills.map((s, i) => (
              <SkillBar key={s.label} label={s.label} level={s.level} index={i} />
            ))}
          </motion.div>

          {/* Tools */}
          <motion.div className={styles.toolsBlock} {...fadeUp(0.25)}>
            <p className={styles.blockTitle}>Tools & Tech</p>
            <div className={styles.toolsGrid}>
              {about.tools.map((tool) => (
                <motion.span
                  key={tool}
                  className={styles.toolTag}
                  whileHover={{ y: -3, borderColor: 'var(--color-accent)' }}
                  transition={{ duration: 0.2 }}
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default About
