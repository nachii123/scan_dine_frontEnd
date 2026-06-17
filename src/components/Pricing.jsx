import { useState } from 'react'
import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
})

const CHECK = ({ muted } = {}) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="8" cy="8" r="7" fill={muted ? '#F3F4F6' : '#DDF5E1'}/>
    <path d="M5 8l2 2 4-4" stroke={muted ? '#8A8F98' : '#1F5F2E'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const PLANS = [
  {
    name: 'Starter',
    desc: 'Perfect for small cafés and food stalls getting started.',
    monthly: 999,
    annual: 1199,
    features: [
      'Up to 5 tables',
      'QR digital menu',
      'Basic order management',
      'Standard analytics (7-day)',
      'Email support',
      '1 menu language',
    ],
    cta: 'Get Started Free',
    variant: 'outline',
  },
  {
    name: 'Professional',
    desc: 'For growing restaurants that need full control and insights.',
    monthly: 2499,
    annual: 1999,
    badge: 'Most Popular',
    features: [
      'Up to 20 tables',
      'QR menus + custom branding',
      'Live kitchen display',
      'Advanced analytics (90-day)',
      'Payment integration (UPI, cards)',
      '5 menu languages',
      'Priority support',
      'Table management map',
    ],
    cta: 'Start 14-day Trial',
    variant: 'primary',
    featured: true,
  },
  {
    name: 'Enterprise',
    desc: 'For hotel chains, cloud kitchens, and multi-outlet brands.',
    monthly: null,
    annual: null,
    features: [
      'Unlimited tables & outlets',
      'White-label QR menus',
      'Multi-location dashboard',
      'Custom analytics & reports',
      'All payment methods',
      'All languages supported',
      'Dedicated account manager',
      'SLA & uptime guarantee',
    ],
    cta: 'Contact Sales',
    variant: 'outline',
  },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <section className="section section--gray" id="pricing">
      <div className="container">
        <motion.div className="section-header" {...fadeUp(0)}>
          <div className="section-badge">✦ Pricing</div>
          <h2 className="section-title">Simple, transparent pricing</h2>
          <p className="section-desc">
            No setup fees. No hidden charges. Cancel anytime. Every plan starts with a 14-day free trial.
          </p>
        </motion.div>

        {/* Toggle */}
        <motion.div {...fadeUp(0.05)} style={{ textAlign: 'center' }}>
          <div className="toggle-wrap">
            <button className={`toggle-option${!annual ? ' active' : ''}`} onClick={() => setAnnual(false)}>Monthly</button>
            <button className={`toggle-option${annual ? ' active' : ''}`} onClick={() => setAnnual(true)}>
              Annual
              <span style={{ marginLeft: 6, background: '#DDF5E1', color: '#1F5F2E', fontSize: 11, fontWeight: 700, padding: '2px 6px', borderRadius: 6 }}>−20%</span>
            </button>
          </div>
        </motion.div>

        <div className="pricing-grid">
          {PLANS.map(({ name, desc, monthly, annual: ann, badge, features, cta, variant, featured }, i) => (
            <motion.div
              key={name}
              className={`pricing-card${featured ? ' pricing-card--featured' : ''}`}
              {...fadeUp(i * 0.09)}
            >
              {badge && (
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  background: '#111', color: '#fff', fontSize: 11, fontWeight: 700,
                  padding: '5px 11px', borderRadius: 100, marginBottom: 20, letterSpacing: '0.3px',
                }}>
                  ✦ {badge}
                </div>
              )}

              <div style={{ fontSize: 20, fontWeight: 800, color: '#111', fontFamily: 'Manrope,sans-serif', marginBottom: 6, letterSpacing: '-0.03em' }}>{name}</div>
              <p style={{ fontSize: 14, color: '#5F6368', lineHeight: 1.6, marginBottom: 24, minHeight: 44 }}>{desc}</p>

              {/* Price */}
              <div style={{ marginBottom: 28, paddingBottom: 24, borderBottom: '1px solid #F3F4F6' }}>
                {monthly !== null ? (
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <span className="price-currency">₹</span>
                    <span className="price-amount">{annual ? ann : monthly}</span>
                    <span className="price-period">/mo</span>
                  </div>
                ) : (
                  <div style={{ fontSize: 36, fontWeight: 800, color: '#111', fontFamily: 'Manrope,sans-serif', letterSpacing: '-0.04em' }}>Custom</div>
                )}
                {annual && monthly && (
                  <div style={{ fontSize: 12.5, color: '#8A8F98', marginTop: 4 }}>
                    Billed annually · <span style={{ color: '#1F5F2E', fontWeight: 600 }}>Save ₹{(monthly - ann) * 12}/yr</span>
                  </div>
                )}
              </div>

              {/* Features */}
              <div style={{ marginBottom: 0 }}>
                {features.map(f => (
                  <div key={f} className="pricing-feature">
                    <CHECK />
                    {f}
                  </div>
                ))}
              </div>

              <button className={`btn-pricing${variant === 'outline' ? ' btn-pricing--outline' : ''}`}>
                {cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p {...fadeUp(0.3)} style={{ textAlign: 'center', fontSize: 14, color: '#8A8F98', marginTop: 40 }}>
          All plans include a <strong style={{ color: '#5F6368' }}>14-day free trial</strong>. No credit card required to start.
        </motion.p>
      </div>
    </section>
  )
}
