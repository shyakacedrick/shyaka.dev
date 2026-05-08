import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import styles from './Contact.module.css'

/* ─── contact info sidebar data ─── */
const contactLinks = [
  { label: 'Email',    value: 'shyakacedrick@gmail.com',        href: 'mailto:shyakacedrick@gmail.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/shyakacedrick',   href: '#' },
  { label: 'GitHub',   value: 'github.com/shyakacedrick',        href: '#' },
  { label: 'Twitter',  value: '@shyakacedrick',                  href: '#' },
]

/* ─── budget options ─── */
const budgetOptions = ['< $5k', '$5k – $15k', '$15k – $30k', '$30k+', 'Let\'s talk']

/* ─── service options ─── */
const serviceOptions = ['MERN Stack Dev', 'UI / UX Design', 'Graphic Design', 'Network & Infra', 'Tech Research', 'Full Project']

/* ─── form field animation ─── */
const fieldVariant = (i) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
})

/* ─── Float-label field ─── */
const Field = ({ label, name, type = 'text', value, onChange, error, index, as }) => {
  const [focused, setFocused] = useState(false)
  const filled = value.length > 0
  const Tag = as || 'input'

  return (
    <motion.div
      className={`${styles.fieldWrap} ${error ? styles.fieldError : ''}`}
      {...fieldVariant(index)}
    >
      <Tag
        id={name}
        name={name}
        type={as ? undefined : type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`${styles.input} ${as === 'textarea' ? styles.textarea : ''}`}
        autoComplete="off"
        rows={as === 'textarea' ? 4 : undefined}
        aria-describedby={error ? `${name}-err` : undefined}
      />
      <label
        htmlFor={name}
        className={`${styles.label} ${focused || filled ? styles.labelFloat : ''}`}
      >
        {label}
      </label>
      {/* animated focus border */}
      <motion.span
        className={styles.focusBorder}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
      <AnimatePresence>
        {error && (
          <motion.span
            id={`${name}-err`}
            className={styles.errorMsg}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─── Success screen ─── */
const SuccessScreen = ({ onReset }) => (
  <motion.div
    className={styles.success}
    initial={{ opacity: 0, scale: 0.92 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  >
    <motion.div
      className={styles.successIcon}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.15, duration: 0.5, type: 'spring', stiffness: 200 }}
    >
      ✓
    </motion.div>
    <h3 className={styles.successTitle}>Message sent!</h3>
    <p className={styles.successSub}>I'll get back to you within 24 hours.</p>
    <button className={styles.resetBtn} onClick={onReset}>
      Send another
    </button>
  </motion.div>
)

/* ─── Main form ─── */
const ContactForm = () => {
  const [fields, setFields] = useState({
    name: '', email: '', subject: '', message: '',
  })
  const [selectedServices, setSelectedServices] = useState([])
  const [selectedBudget, setSelectedBudget]     = useState('')
  const [errors, setErrors]   = useState({})
  const [status, setStatus]   = useState('idle') // idle | sending | sent

  const validate = () => {
    const e = {}
    if (!fields.name.trim())    e.name    = 'Name is required.'
    if (!fields.email.trim())   e.email   = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
                                e.email   = 'Enter a valid email.'
    if (!fields.message.trim()) e.message = 'Tell me about your project.'
    return e
  }

  const handleChange = (e) => {
    setFields((p) => ({ ...p, [e.target.name]: e.target.value }))
    if (errors[e.target.name])
      setErrors((p) => ({ ...p, [e.target.name]: '' }))
  }

  const toggleService = (s) =>
    setSelectedServices((p) => p.includes(s) ? p.filter((x) => x !== s) : [...p, s])

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setStatus('sending')
    // Replace with a real API call, e.g. axios.post('/api/contact', { ...fields, selectedServices, selectedBudget })
    setTimeout(() => setStatus('sent'), 1800)
  }

  if (status === 'sent')
    return <SuccessScreen onReset={() => { setStatus('idle'); setFields({ name:'', email:'', subject:'', message:'' }); setSelectedServices([]); setSelectedBudget('') }} />

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>

      {/* Row 1 — name + email */}
      <div className={styles.row2}>
        <Field label="Your name"    name="name"    value={fields.name}    onChange={handleChange} error={errors.name}    index={0} />
        <Field label="Email address" name="email"  type="email" value={fields.email} onChange={handleChange} error={errors.email} index={1} />
      </div>

      {/* Row 2 — subject */}
      <Field label="Subject" name="subject" value={fields.subject} onChange={handleChange} error={errors.subject} index={2} />

      {/* Services picker */}
      <motion.div className={styles.pickerBlock} {...fieldVariant(3)}>
        <span className={styles.pickerLabel}>I need help with</span>
        <div className={styles.pickerGrid}>
          {serviceOptions.map((s) => (
            <button
              key={s}
              type="button"
              className={`${styles.chip} ${selectedServices.includes(s) ? styles.chipActive : ''}`}
              onClick={() => toggleService(s)}
            >
              {selectedServices.includes(s) && <span className={styles.chipCheck}>✓</span>}
              {s}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Budget picker */}
      <motion.div className={styles.pickerBlock} {...fieldVariant(4)}>
        <span className={styles.pickerLabel}>Budget range</span>
        <div className={styles.pickerGrid}>
          {budgetOptions.map((b) => (
            <button
              key={b}
              type="button"
              className={`${styles.chip} ${selectedBudget === b ? styles.chipActive : ''}`}
              onClick={() => setSelectedBudget((p) => p === b ? '' : b)}
            >
              {b}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Message */}
      <Field label="Tell me about your project…" name="message" value={fields.message} onChange={handleChange} error={errors.message} index={5} as="textarea" />

      {/* Submit */}
      <motion.div className={styles.submitRow} {...fieldVariant(6)}>
        <motion.button
          type="submit"
          className={styles.submitBtn}
          disabled={status === 'sending'}
          whileHover={status !== 'sending' ? { scale: 1.02 } : {}}
          whileTap={status !== 'sending' ? { scale: 0.97 } : {}}
        >
          <AnimatePresence mode="wait">
            {status === 'sending' ? (
              <motion.span
                key="sending"
                className={styles.spinner}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            ) : (
              <motion.span
                key="label"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
              >
                Send Message →
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
        <p className={styles.privacy}>No spam. No sharing. Just a conversation.</p>
      </motion.div>
    </form>
  )
}

/* ─── Main section ─── */
const Contact = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section className={styles.contact} id="contact" ref={ref}>

      {/* Heading block */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 36 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.sectionLabel}>
          <span className={styles.labelLine} />
          Contact
        </div>
        <h2 className={styles.heading}>
          Let's build
          <br />
          <span className={styles.accentWord}>something great</span>
        </h2>
        <p className={styles.subtext}>
          Have an idea, a brief, or just want to say hi?
          Drop a message and I'll respond within 24 hours.
        </p>

        {/* Contact links */}
        <div className={styles.linkList}>
          {contactLinks.map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              className={styles.contactLink}
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={styles.linkLabel}>{l.label}</span>
              <span className={styles.linkValue}>{l.value}</span>
              <span className={styles.linkArrow}>↗</span>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Form */}
      <motion.div
        className={styles.formWrap}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <ContactForm />
      </motion.div>
    </section>
  )
}

export default Contact
