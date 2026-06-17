import { motion } from 'framer-motion'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
})

const bars = [55, 72, 61, 88, 74, 95, 82]

const HeroVisual = () => (
  <div className="hero-visual-wrap" style={{ position: 'relative', width: 'min(480px, 100%)', height: 520 }}>

    {/* Main analytics card */}
    <motion.div
      initial={{ opacity: 0, y: 40, rotateY: -6 }}
      animate={{ opacity: 1, y: 0, rotateY: -4 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'absolute', top: 0, right: 0, width: 380,
        background: 'linear-gradient(145deg, #0d1117 0%, #141920 100%)',
        borderRadius: 22, padding: 24,
        boxShadow: '0 40px 100px rgba(0,0,0,0.32)',
        border: '1px solid rgba(255,255,255,0.06)',
        transform: 'perspective(800px) rotateY(-4deg)',
      }}
    >
      {/* Card header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 500, marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.6px' }}>ScanDine Analytics</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', fontFamily: 'Manrope,sans-serif' }}>The Spice Garden</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ fontSize: 10, color: '#6FCF97', fontWeight: 600 }}>LIVE</div>
          <div style={{ position: 'relative', width: 8, height: 8 }}>
            <div className="live-dot-ring" />
            <div style={{ width: 8, height: 8, background: '#6FCF97', borderRadius: '50%', position: 'relative' }} />
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
        {[
          { label: 'Orders Today', val: '247', delta: '+48%', up: true },
          { label: 'Revenue',      val: '₹42.3k', delta: '+35%', up: true },
          { label: 'Avg Rating',   val: '4.8 ⭐', delta: '+0.4', up: true },
          { label: 'Tables Active', val: '32/40',  delta: '80%', up: null },
        ].map(({ label, val, delta, up }) => (
          <div key={label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '12px 14px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.35)', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: '#fff', fontFamily: 'Manrope,sans-serif', marginBottom: 3 }}>{val}</div>
            <div style={{ fontSize: 10.5, color: up ? '#6FCF97' : 'rgba(255,255,255,0.4)', fontWeight: 600 }}>{delta}</div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div style={{ marginBottom: 6 }}>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.6px' }}>Hourly Orders</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 56 }}>
          {bars.map((h, i) => (
            <div key={i} style={{
              flex: 1, height: `${h}%`,
              background: i === 5 ? 'linear-gradient(180deg, #4ade80 0%, #1F5F2E 100%)' : 'rgba(31,95,46,0.25)',
              borderRadius: '4px 4px 0 0', minWidth: 0,
            }} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          {['10','11','12','13','14','15','16'].map(t => (
            <span key={t} style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', flex: 1, textAlign: 'center' }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Recent orders mini list */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { table: 'Table 4', items: 3, amount: '₹840', status: 'new' },
          { table: 'Table 7', items: 5, amount: '₹1,240', status: 'preparing' },
        ].map(o => (
          <div key={o.table} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>{o.table} · {o.items} items</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{o.amount}</span>
              <span style={{
                fontSize: 9, fontWeight: 600, padding: '3px 7px', borderRadius: 6, textTransform: 'uppercase', letterSpacing: '0.4px',
                background: o.status === 'new' ? 'rgba(111,207,151,0.18)' : 'rgba(251,191,36,0.15)',
                color: o.status === 'new' ? '#6FCF97' : '#FBBF24',
              }}>{o.status}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>

    {/* Floating QR card */}
    <motion.div
      initial={{ opacity: 0, x: -30, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="stat-pill"
      style={{ position: 'absolute', bottom: 80, left: 0, padding: '16px 18px', width: 162 }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 2, width: 56 }}>
          {Array.from({ length: 25 }).map((_, i) => {
            const pattern = [1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,0,1,1]
            return (
              <div key={i} style={{ width: 10, height: 10, borderRadius: 1.5, background: pattern[i] ? '#111' : 'transparent' }} />
            )
          })}
        </div>
        <div style={{ fontSize: 10.5, fontWeight: 600, color: '#5F6368', textAlign: 'center' }}>Scan to order</div>
        <div style={{ fontSize: 9, color: '#8A8F98', textAlign: 'center' }}>Table 4 — The Spice Garden</div>
      </div>
    </motion.div>

    {/* Floating order confirm */}
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="stat-pill"
      style={{ position: 'absolute', top: 130, left: -10, padding: '12px 16px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 34, height: 34, background: '#DDF5E1', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>✓</div>
        <div>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: '#111', letterSpacing: '-0.01em' }}>Order Confirmed</div>
          <div style={{ fontSize: 11, color: '#8A8F98' }}>Table 4 · Just now</div>
        </div>
      </div>
    </motion.div>

    {/* Revenue badge — animated subtle float */}
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, y: [0, -5, 0] }}
      transition={{ opacity: { duration: 0.5, delay: 1.1 }, scale: { duration: 0.5, delay: 1.1 }, y: { duration: 3, delay: 1.4, repeat: Infinity, ease: 'easeInOut' } }}
      className="stat-pill"
      style={{ position: 'absolute', bottom: 24, right: 10, padding: '11px 16px' }}
    >
      <div style={{ fontSize: 11, color: '#8A8F98', marginBottom: 2 }}>Revenue This Month</div>
      <div style={{ fontSize: 18, fontWeight: 800, color: '#1F5F2E', fontFamily: 'Manrope,sans-serif', letterSpacing: '-0.04em' }}>₹8.4L ↑ 35%</div>
    </motion.div>
  </div>
)

const CITIES = ['Aurangabad', 'Bangalore','Pune']

const TRUST_ITEMS = [
  { icon: '✓', label: 'Free 14-day trial' },
  { icon: '✓', label: 'No credit card needed' },
  { icon: '✓', label: 'Live in under 60 minutes' },
]

export default function Hero() {
  return (
    <section
      className="section--gray"
      style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #e2e2e0 1px, transparent 0)`,
        backgroundSize: '32px 32px',
      }}
    >
      <div className="container">
        <div className="hero-inner">
          {/* ── Left: Content ── */}
          <div>
            {/* Top badge with urgency */}
            <motion.div {...fade(0.05)}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#DDF5E1', color: '#1F5F2E',
                fontSize: 12, fontWeight: 700, letterSpacing: '0.4px',
                padding: '8px 16px', borderRadius: 9999, marginBottom: 28,
                border: '1px solid rgba(31,95,46,0.14)',
              }}>
                <div style={{ position: 'relative', width: 8, height: 8, flexShrink: 0 }}>
                  <div className="live-dot-ring" />
                  <div style={{ width: 8, height: 8, background: '#1F5F2E', borderRadius: '50%', position: 'relative' }} />
                </div>
                {/* Trusted by 500+ Restaurants ·*/}
                  Free Setup Available
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fade(0.12)}
              style={{
                fontSize: 'clamp(40px, 5vw, 66px)', fontWeight: 800,
                color: '#111111', lineHeight: 1.04, letterSpacing: '-0.04em',
                marginBottom: 24,
              }}
            >
              The Future of Dining,{' '}
              <span style={{ color: '#1F5F2E' }}>Naturally Elevated.</span>
            </motion.h1>

            {/* Sub-description — outcome-focused */}
            <motion.p
              {...fade(0.2)}
              style={{ fontSize: 17.5, color: '#5F6368', lineHeight: 1.7, maxWidth: 500, marginBottom: 16 }}
            >
              Stop losing revenue to slow service and manual errors. ScanDine gives your
              restaurant QR menus, live order management, and real-time analytics —
              so you can serve more, earn more, and grow faster.
            </motion.p>

            {/* Impact micro-line */}
            <motion.div {...fade(0.24)} style={{ marginBottom: 36 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 10,
                padding: '9px 16px', fontSize: 13.5, color: '#5F6368', fontWeight: 500,
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 12l3-4 3 3 4-7" stroke="#1F5F2E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Restaurants see an average{' '}
                <strong style={{ color: '#1F5F2E' }}>35% revenue increase</strong> within 30 days
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div {...fade(0.28)} className="hero-actions" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
              {/* Primary — glowing */}
              {/* <motion.a
                href="#pricing"
                className="btn-glow"
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#1F5F2E', color: '#fff',
                  fontWeight: 700, fontSize: 15.5, padding: '15px 30px',
                  borderRadius: 14, textDecoration: 'none', letterSpacing: '-0.01em',
                  height: 52, transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#174826')}
                onMouseLeave={e => (e.currentTarget.style.background = '#1F5F2E')}
              >
                Book Your Free Demo
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M3 7.5h9M9 4l3.5 3.5L9 11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </motion.a> */}

              {/* Secondary */}
              <motion.a
                href="#dashboard"
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#FFFFFF', color: '#111',
                  fontWeight: 600, fontSize: 15.5, padding: '14px 26px',
                  borderRadius: 14, textDecoration: 'none', letterSpacing: '-0.01em',
                  border: '1.5px solid #E5E7EB', height: 52,
                  transition: 'border-color 0.2s, background 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#B7E4B8'; e.currentTarget.style.background = '#F0FDF4'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.background = '#FFFFFF'; }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2.5" stroke="#5F6368" strokeWidth="1.4"/><path d="M5 8h2l1-3 2 6 1-3h1" stroke="#5F6368" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                See Live Dashboard
              </motion.a>
            </motion.div>

            {/* Trust microcopy */}
            <motion.div {...fade(0.33)} className="hero-trust-bar">
              {TRUST_ITEMS.map(({ icon, label }) => (
                <span key={label} className="hero-trust-item">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="6.5" fill="#DDF5E1"/>
                    <path d="M4.5 7l2 2 3-3" stroke="#1F5F2E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {label}
                </span>
              ))}
            </motion.div>

            {/* City tags */}
            <motion.div {...fade(0.38)} style={{ marginTop: 28 }}>
              <div style={{ fontSize: 11.5, fontWeight: 600, color: '#8A8F98', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 12 }}>
                Live in
              </div>
              <div className="hero-trust" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {CITIES.map(city => (
                  <span key={city} style={{
                    fontSize: 12.5, fontWeight: 500, color: '#5F6368',
                    background: '#FFFFFF', border: '1px solid #E5E7EB',
                    borderRadius: 100, padding: '5px 12px',
                  }}>{city}</span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right: Visual ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
