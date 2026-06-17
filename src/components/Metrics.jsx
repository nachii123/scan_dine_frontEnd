import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

/* ── Smooth animated counter ── */
function Counter({ to, suffix = '', isDecimal = false, duration = 1900 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [val, setVal] = useState(isDecimal ? '0.0' : 0)

  useEffect(() => {
    if (!inView) return
    const t0 = performance.now()
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(isDecimal ? (eased * to).toFixed(1) : Math.floor(eased * to))
      if (p < 1) requestAnimationFrame(tick)
      else setVal(isDecimal ? String(to.toFixed(1)) : to)
    }
    requestAnimationFrame(tick)
  }, [inView, to, isDecimal, duration])

  return <span ref={ref}>{val}{suffix}</span>
}

const STATS = [
  {
    to: 1300, suffix: '+', label: 'Orders Processed', sub: 'and growing every day',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 5h14M3 10h9M3 15h6" stroke="#1F5F2E" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  },
  {
    to: 35, suffix: '%', label: 'Avg Revenue Boost', sub: 'within the first 30 days',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 15l4-5 3 3 4-7 3 4" stroke="#1F5F2E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
  {
    to: 4.9, suffix: '★', label: 'Platform Rating', sub: 'across all restaurant types',
    isDecimal: true,
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2l2 5h5l-4 3 2 6-5-3.5L5 16l2-6L3 7h5L10 2z" stroke="#1F5F2E" strokeWidth="1.6" strokeLinejoin="round"/></svg>,
  },
  {
    to: 7, suffix: '+', label: 'Active Restaurants', sub: 'across 3 major cities',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="8" width="16" height="10" rx="1.5" stroke="#1F5F2E" strokeWidth="1.6"/><path d="M6 8V6a4 4 0 018 0v2" stroke="#1F5F2E" strokeWidth="1.6"/><circle cx="10" cy="13" r="2" fill="#1F5F2E"/></svg>,
  },
]

const TICKER_CITIES = [
  'Aurangabad',  'Bangalore', 'Pune',
]
const TICKER_DOUBLED = [...TICKER_CITIES, ...TICKER_CITIES]

const TYPE_LABELS = [
  { emoji: '🍽️', label: 'Fine Dining' },
  { emoji: '☕', label: 'Cafés & Bakeries' },
  { emoji: '🏨', label: 'Hotel Restaurants' },
  { emoji: '📦', label: 'Cloud Kitchens' },
  { emoji: '🍕', label: 'Quick Service' },
  { emoji: '🍺', label: 'Bars & Pubs' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function Metrics() {
  return (
    <section className="metrics-section">
      <div className="container">
        {/* Header */}
        <motion.div {...fadeUp(0)} style={{ textAlign: 'center', paddingTop: 64, marginBottom: 0 }}>
          <div style={{ fontSize: 11.5, fontWeight: 600, color: '#8A8F98', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 6 }}>
            Real results from real restaurants
          </div>
          <div style={{ width: 40, height: 2, background: '#DDF5E1', margin: '0 auto', borderRadius: 2 }} />
        </motion.div>

        {/* Stats grid */}
        <div className="metrics-grid">
          {STATS.map(({ to, suffix, label, sub, icon, isDecimal }, i) => (
            <motion.div key={label} className="metric-cell" {...fadeUp(0.06 + i * 0.07)}>
              <div className="metric-icon-wrap">{icon}</div>
              <div className="metric-value">
                <Counter to={to} suffix={suffix} isDecimal={isDecimal} />
              </div>
              <div className="metric-label">{label}</div>
              <div className="metric-sub">{sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Restaurant types */}
        <motion.div {...fadeUp(0.22)} className="type-badges" style={{ paddingBottom: 56 }}>
          <span style={{ fontSize: 12.5, fontWeight: 600, color: '#8A8F98', letterSpacing: '0.3px', marginRight: 4 }}>Used by:</span>
          {TYPE_LABELS.map(({ emoji, label }) => (
            <span key={label} className="type-badge">{emoji} {label}</span>
          ))}
        </motion.div>
      </div>

      {/* Scrolling city ticker */}
      <div className="ticker-outer">
        <div className="ticker-track">
          {TICKER_DOUBLED.map((city, i) => (
            <span key={i} className="ticker-item">
              <span className="ticker-dot" />
              {city}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
