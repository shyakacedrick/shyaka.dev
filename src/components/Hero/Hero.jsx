import { motion } from 'framer-motion'
import styles from './Hero.module.css'

const TICKER_ITEMS = [
  'MERN Stack', '✦', 'UI / UX Design', '✦', 'Graphic Design', '✦',
  'React', '✦', 'Node.js', '✦', 'MongoDB', '✦',
]

const TAG_POSITIONS = [
  { label: 'React',      style: { top: '6%',    left: '-44px' } },
  { label: 'Node.js',    style: { top: '26%',   right: '-56px' } },
  { label: 'MongoDB',    style: { top: '52%',   left: '-52px' } },
  { label: 'Figma',      style: { bottom: '22%', right: '-48px' } },
  { label: 'Express',    style: { bottom: '6%', left: '20px' } },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

const VisualCard = () => (
  <div className={styles.visualCard} aria-hidden="true">
    {/* Corner brackets */}
    <span className={`${styles.corner} ${styles.tl}`} />
    <span className={`${styles.corner} ${styles.tr}`} />
    <span className={`${styles.corner} ${styles.bl}`} />
    <span className={`${styles.corner} ${styles.br}`} />

    {/* Dot-grid texture */}
    <div className={styles.cardGrid} />

    {/* Center glow */}
    <motion.div
      className={styles.cardGlow}
      animate={{ opacity: [0.5, 0.95, 0.5], scale: [0.94, 1.06, 0.94] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    />

    {/* Outer orbit ring */}
    <motion.div
      className={styles.ring}
      animate={{ rotate: 360 }}
      transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
    />

    {/* Inner orbit ring */}
    <motion.div
      className={styles.ringInner}
      animate={{ rotate: -360 }}
      transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
    />

    {/* Avatar */}
    <div className={styles.cardAvatar}>
      <span className={styles.cardInitials}>SC</span>
    </div>

    {/* Floating tech tags */}
    {TAG_POSITIONS.map(({ label, style }, i) => (
      <motion.div
        key={label}
        className={styles.floatingTag}
        style={style}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.35 }}
      >
        {label}
      </motion.div>
    ))}

    <div className={styles.yearLabel}>©2026</div>
  </div>
)

const Hero = () => (
  <section className={styles.hero}>
    {/* Decorative hairlines */}
    <div className={styles.lineH} aria-hidden="true" />
    <div className={styles.lineV} aria-hidden="true" />

    {/* Two-column layout */}
    <div className={styles.layout}>

      {/* Left: text content */}
      <motion.div
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className={styles.greeting} variants={itemVariants}>
          <span className={styles.wave}>👋</span>
          Hello, I&apos;m <strong>Shyaka Cedrick</strong>
        </motion.div>

        <motion.div className={styles.badge} variants={itemVariants}>
          <span className={styles.dot} />
          Available for work — Turkana, Kenya
        </motion.div>

        <motion.div className={styles.headingBlock} variants={itemVariants}>
          <p className={styles.eyebrow}>MERN Developer &amp; UI/UX &amp; Graphic Designer</p>
          <h1 className={styles.heading}>
            Building<br />
            Digital<br />
            <span className={styles.accentLine}>Products.</span>
          </h1>
        </motion.div>

        <motion.p className={styles.description} variants={itemVariants}>
          6 years crafting full-stack web apps, intuitive interfaces, and bold
          visual identities — from Turkana, Kenya to the global stage.
        </motion.p>

        <motion.div className={styles.actions} variants={itemVariants}>
          <a href="mailto:shyakacedrick@gmail.com" className={styles.contactBtn}>
            Get in Touch
          </a>
          <a href="#work" className={styles.scrollLink}>
            View Work
            <span className={styles.arrow}>↓</span>
          </a>
        </motion.div>

        <motion.div className={styles.meta} variants={itemVariants}>
          <span className={styles.metaItem}>
            <span className={styles.metaDot} />
            Based in Nairobi
          </span>
          <span className={styles.metaDivider}>/</span>
          <span className={styles.metaItem}>Est. 2020</span>
        </motion.div>
      </motion.div>

      {/* Right: visual card */}
      <motion.div
        className={styles.visual}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <VisualCard />
      </motion.div>
    </div>

    {/* Scroll indicator */}
    <div className={styles.scrollIndicator} aria-hidden="true">
      <div className={styles.scrollLine}>
        <motion.div
          className={styles.scrollDot}
          animate={{ y: [0, 44, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <span className={styles.scrollLabel}>scroll</span>
    </div>

    {/* Scrolling ticker */}
    <div className={styles.ticker} aria-hidden="true">
      <motion.div
        className={styles.tickerTrack}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <span key={i} className={styles.tickerItem}>{item}</span>
        ))}
      </motion.div>
    </div>
  </section>
)

export default Hero
