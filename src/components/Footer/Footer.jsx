import { motion } from 'framer-motion'
import { useTilt } from '../../hooks/useTilt'
import styles from './Footer.module.css'

const footerLinks = [
  { label: 'About',    href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work',     href: '#work' },
  { label: 'Contact',  href: '#contact' },
]

const socialLinks = [
  { label: 'Email',    href: 'mailto:shyakacedrick@gmail.com' },
  { label: 'GitHub',   href: '#' },
  { label: 'LinkedIn', href: '#' },
]

const Footer = () => {
  const year = new Date().getFullYear()
  const { rotateX, rotateY, glare, glareOpacity, onMouseMove, onMouseLeave } = useTilt(5)

  return (
    <footer className={styles.footer}>
      <div className={styles.glow} aria-hidden="true" />

      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 52, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        style={{ rotateX, rotateY, transformPerspective: 1600 }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <div className={styles.topRow}>
          <div className={styles.intro}>
            <span className={styles.kicker}>Closing Note</span>
            <h2 className={styles.title}>
              Built to leave a
              <span className={styles.accent}> good last impression.</span>
            </h2>
            <p className={styles.text}>
              If you made it this far, we should probably make something memorable together.
            </p>
          </div>

          <a href="mailto:shyakacedrick@gmail.com" className={styles.cta}>
            Say hello
            <span className={styles.ctaArrow}>↗</span>
          </a>
        </div>

        <div className={styles.contentRow}>
          <div className={styles.signatureBlock}>
            <div className={styles.signatureMark}>:)</div>
            <p className={styles.signatureText}>
              Calm systems, sharp visuals, and a finish that feels easy.
            </p>
          </div>

          <nav className={styles.linkGroup} aria-label="Footer navigation">
            {footerLinks.map((link) => (
              <a key={link.label} href={link.href} className={styles.linkItem}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className={styles.linkGroup}>
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} className={styles.linkItem}>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.bottomRow}>
          <span className={styles.meta}>© {year} Cedrick Shyaka</span>
          <span className={styles.meta}>Thanks for stopping by.</span>
        </div>
        <motion.div className={styles.glare} style={{ background: glare, opacity: glareOpacity }} />
      </motion.div>
    </footer>
  )
}

export default Footer
