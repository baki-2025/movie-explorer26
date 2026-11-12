import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = () => {
    setMobileOpen(false)
  }

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="main-navbar">
      <div className="navbar__container">
        {/* Logo */}
        <Link to="/" className="navbar__logo" id="navbar-logo" onClick={handleNavClick}>
          <span className="navbar__logo-icon">🎬</span>
          <span className="navbar__logo-text">Movie<span className="navbar__logo-accent">Explorer26</span></span>
        </Link>

        {/* Desktop Navigation */}
        <div className={`navbar__links ${mobileOpen ? 'navbar__links--open' : ''}`}>
          <Link
            to="/"
            className={`navbar__link ${location.pathname === '/' ? 'navbar__link--active' : ''}`}
            id="nav-link-home"
            onClick={handleNavClick}
          >
            Home
          </Link>
          <Link
            to="/movies"
            className={`navbar__link ${location.pathname === '/movies' ? 'navbar__link--active' : ''}`}
            id="nav-link-movies"
            onClick={handleNavClick}
          >
            Movies
          </Link>
          <Link to="/movies" className="navbar__cta" id="nav-cta-explore" onClick={handleNavClick}>
            Explore Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`navbar__toggle ${mobileOpen ? 'navbar__toggle--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          id="navbar-toggle"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
