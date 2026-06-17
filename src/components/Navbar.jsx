import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const QRLogo = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="6" height="6" rx="1" stroke="#1F5F2E" strokeWidth="1.5"/>
    <rect x="3" y="3" width="2" height="2" fill="#1F5F2E"/>
    <rect x="11" y="1" width="6" height="6" rx="1" stroke="#1F5F2E" strokeWidth="1.5"/>
    <rect x="13" y="3" width="2" height="2" fill="#1F5F2E"/>
    <rect x="1" y="11" width="6" height="6" rx="1" stroke="#1F5F2E" strokeWidth="1.5"/>
    <rect x="3" y="13" width="2" height="2" fill="#1F5F2E"/>
    <rect x="11" y="11" width="2" height="2" fill="#1F5F2E"/>
    <rect x="15" y="11" width="2" height="2" fill="#1F5F2E"/>
    <rect x="11" y="15" width="6" height="2" fill="#1F5F2E"/>
    <rect x="13" y="13" width="2" height="2" fill="#1F5F2E"/>
  </svg>
)

const NAV_LINKS = [
  { label: 'Features',     href: '#features' },
  { label: 'How It Works', href: '#process' },
  { label: 'Pricing',      href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const openDemoForm = () => {
    window.dispatchEvent(new Event('open-demo-form'))
    setMobileOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          height: 72, display: 'flex', alignItems: 'center',
          background: scrolled ? 'rgba(255,255,255,0.90)' : 'rgba(255,255,255,0.72)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${scrolled ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.05)'}`,
          transition: 'background 0.3s ease, border-color 0.3s ease',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none', flexShrink: 0 }}>
            <div style={{
              width: 34, height: 34, background: '#DDF5E1', borderRadius: 9,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(31,95,46,0.12)',
            }}>
              <QRLogo />
            </div>
            <span style={{ fontFamily: 'Manrope, Inter, sans-serif', fontWeight: 800, fontSize: 17, color: '#111', letterSpacing: '-0.03em' }}>
              ScanDine
            </span>
          </a>

          {/* Desktop Links */}
          <ul className="nav-links-desktop" style={{ alignItems: 'center', gap: 36, margin: 0, padding: 0 }}>
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  style={{ fontSize: 14.5, fontWeight: 500, color: '#5F6368', letterSpacing: '-0.01em', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.target.style.color = '#111')}
                  onMouseLeave={e => (e.target.style.color = '#5F6368')}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="nav-cta-desktop" style={{ alignItems: 'center', gap: 14 }}>
            <a
              href="#"
              style={{ fontSize: 14, fontWeight: 500, color: '#5F6368', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.target.style.color = '#111')}
              onMouseLeave={e => (e.target.style.color = '#5F6368')}
            >
              Log in
            </a>
            <motion.button
              type="button"
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.97 }}
              onClick={openDemoForm}
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                background: '#1F5F2E', color: '#fff', fontSize: 14, fontWeight: 600,
                padding: '10px 20px', borderRadius: 12, textDecoration: 'none',
                letterSpacing: '-0.01em', transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#174826')}
              onMouseLeave={e => (e.currentTarget.style.background = '#1F5F2E')}
            >
              Book your free demo
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2.5 6.5h8M8 3.5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </motion.button>
          </div>

          {/* Hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMobileOpen(o => !o)}
            style={{ flexDirection: 'column', gap: 5, padding: 8, cursor: 'pointer', background: 'none', border: 'none' }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{ display: 'block', width: 22, height: 2, background: '#111', borderRadius: 2, transition: '0.28s' }} />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            style={{
              position: 'fixed', top: 72, left: 0, right: 0, zIndex: 999,
              background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid #E5E7EB',
            }}
          >
            <div style={{ padding: '16px 20px 24px', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    padding: '13px 0', fontSize: 16, fontWeight: 500, color: '#5F6368',
                    borderBottom: '1px solid #F3F4F6', display: 'block',
                  }}
                >
                  {label}
                </a>
              ))}
              <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                <a href="#" style={{ flex: 1, textAlign: 'center', padding: '13px', border: '1.5px solid #E5E7EB', borderRadius: 12, fontWeight: 600, fontSize: 15, color: '#111' }}>
                  Log in
                </a>
                <button
                  type="button"
                  onClick={openDemoForm}
                  style={{ flex: 1, textAlign: 'center', background: '#1F5F2E', color: '#fff', padding: '13px', borderRadius: 12, fontWeight: 600, fontSize: 15 }}
                >
                  Book your free demo
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
