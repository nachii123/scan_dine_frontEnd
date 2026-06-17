import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const TRUST_ITEMS = [
  { icon: '🔒', label: 'Secure & encrypted' },
  { icon: '⚡', label: 'Live in under 1 hour' },
  { icon: '🎯', label: '14-day free trial' },
  { icon: '💬', label: '24/7 support' },
]

export default function CTA() {
  const DEMO_API_URL = 'https://scan-dine-backend-1.onrender.com/dine_in_customer/api/demo-requests'
  const [isDemoOpen, setIsDemoOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitState, setSubmitState] = useState('idle')
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
  })

  useEffect(() => {
    if (!isDemoOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsDemoOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [isDemoOpen])

  useEffect(() => {
    const onOpenDemoForm = () => {
      setSubmitState('idle')
      setIsDemoOpen(true)
    }

    window.addEventListener('open-demo-form', onOpenDemoForm)
    return () => window.removeEventListener('open-demo-form', onOpenDemoForm)
  }, [])

  const openDemoForm = () => {
    setSubmitState('idle')
    setIsDemoOpen(true)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitState('idle')

    if (!form.name.trim() || !form.mobile.trim()) {
      setSubmitState('error')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch(DEMO_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          mobile: form.mobile.trim(),
          email: form.email.trim() || undefined,
        }),
      })

      if (!response.ok) {
        throw new Error('Request failed')
      }

      setSubmitState('success')
      setForm({ name: '', mobile: '', email: '' })
    } catch {
      setSubmitState('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="section section--gray">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="cta-card"
        >
          {/* Decorative dot grids */}
          <div style={{ position: 'absolute', top: 40, left: 60, width: 140, height: 140, opacity: 0.06, pointerEvents: 'none' }}>
            <svg viewBox="0 0 140 140" fill="none">
              {Array.from({ length: 7 }).map((_, row) =>
                Array.from({ length: 7 }).map((_, col) => (
                  <circle key={`${row}-${col}`} cx={col * 20 + 10} cy={row * 20 + 10} r="2.5" fill="#fff"/>
                ))
              )}
            </svg>
          </div>
          <div style={{ position: 'absolute', bottom: 40, right: 60, width: 140, height: 140, opacity: 0.06, pointerEvents: 'none' }}>
            <svg viewBox="0 0 140 140" fill="none">
              {Array.from({ length: 7 }).map((_, row) =>
                Array.from({ length: 7 }).map((_, col) => (
                  <circle key={`${row}-${col}`} cx={col * 20 + 10} cy={row * 20 + 10} r="2.5" fill="#fff"/>
                ))
              )}
            </svg>
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Urgency strip */}
            <div className="urgency-strip">
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ position: 'relative', width: 8, height: 8 }}>
                  <div className="live-dot-ring" style={{ background: '#6FCF97' }} />
                  <div style={{ width: 8, height: 8, background: '#6FCF97', borderRadius: '50%', position: 'relative' }} />
                </div>
                <span style={{ fontSize: 12.5, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
                  Free setup offer · Limited spots this month
                </span>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 5 }}>47 of 60 spots claimed</div>
                <div className="urgency-progress-wrap">
                  <div className="urgency-progress-bar" />
                </div>
              </div>
            </div>

            {/* Headline */}
            <h2 style={{
              fontSize: 'clamp(32px, 4.2vw, 58px)', fontWeight: 800, color: '#fff',
              lineHeight: 1.06, letterSpacing: '-0.04em', maxWidth: 700,
              margin: '0 auto 18px',
            }}>
              Stop losing revenue to slow service.
            </h2>

            {/* Sub-headline */}
            <p style={{
              fontSize: 17.5, color: 'rgba(255,255,255,0.62)', lineHeight: 1.7,
              maxWidth: 520, margin: '0 auto 16px',
            }}>
              Join 7+ restaurants growing with ScanDine. Setup takes under an hour.
              Your first results show within the first week.
            </p>

            {/* Key outcome pills */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 40 }}>
              {[
                { stat: '35%', label: 'Revenue increase' },
                { stat: '48%', label: 'Faster table turnover' },
                { stat: '1300+', label: 'Orders processed' },
              ].map(({ stat, label }) => (
                <div key={label} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)',
                  borderRadius: 10, padding: '8px 16px',
                }}>
                  <span style={{ fontSize: 17, fontWeight: 800, color: '#6FCF97', fontFamily: 'Manrope,sans-serif', letterSpacing: '-0.03em' }}>{stat}</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>{label}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
              <motion.a
                href="#pricing"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#FFFFFF', color: '#111111',
                  fontWeight: 700, fontSize: 15.5, padding: '15px 32px',
                  borderRadius: 14, textDecoration: 'none', letterSpacing: '-0.02em',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.22)', height: 52,
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.92')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                Start Growing My Restaurant
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M3 7.5h9M9 4l3.5 3.5L9 11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </motion.a>
              <motion.button
                type="button"
                onClick={openDemoForm}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  background: 'transparent', color: 'rgba(255,255,255,0.85)',
                  fontWeight: 600, fontSize: 15.5, padding: '14px 28px',
                  borderRadius: 14, textDecoration: 'none', letterSpacing: '-0.01em',
                  border: '1.5px solid rgba(255,255,255,0.25)', height: 52,
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.55)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)')}
              >
                Book a Free Demo Call
              </motion.button>
            </div>

            {/* Trust row */}
            <div style={{ marginTop: 36, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
              {TRUST_ITEMS.map(({ icon, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: 'rgba(255,255,255,0.42)', fontWeight: 500 }}>
                  <span style={{ fontSize: 14 }}>{icon}</span>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isDemoOpen && (
          <motion.div
            className="demo-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDemoOpen(false)}
          >
            <motion.div
              className="demo-modal"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="demo-form-title"
            >
              <div className="demo-modal__header">
                <div>
                  <div className="demo-modal__eyebrow">Book a free demo</div>
                  <h3 id="demo-form-title" className="demo-modal__title">Tell us where to reach you</h3>
                  <p className="demo-modal__subtitle">
                    Name and mobile are required. Email is optional.
                  </p>
                </div>
                <button
                  type="button"
                  className="demo-modal__close"
                  onClick={() => setIsDemoOpen(false)}
                  aria-label="Close demo form"
                >
                  ×
                </button>
              </div>

              <form className="demo-form" onSubmit={handleSubmit}>
                <label className="demo-field">
                  <span>Name *</span>
                  <input
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    autoComplete="name"
                    required
                  />
                </label>

                <label className="demo-field">
                  <span>Mobile *</span>
                  <input
                    name="mobile"
                    type="tel"
                    value={form.mobile}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    autoComplete="tel"
                    required
                  />
                </label>

                <label className="demo-field">
                  <span>Email</span>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </label>

                {submitState === 'error' && (
                  <div className="demo-form__message demo-form__message--error">
                    Please enter your name and mobile number.
                  </div>
                )}

                {submitState === 'success' && (
                  <div className="demo-form__message demo-form__message--success">
                    Thanks. Your demo request is ready to send to the backend.
                  </div>
                )}

                <button type="submit" className="demo-form__submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Request Demo'}
                </button>

                <p className="demo-form__note">
                  We will only use this to contact you about the demo.
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
