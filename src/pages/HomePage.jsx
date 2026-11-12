import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './HomePage.css'

const HERO_PARTICLES = [
  { left: '12%', top: '24%', delay: '0.4s', duration: '5.2s' },
  { left: '28%', top: '65%', delay: '1.2s', duration: '4.8s' },
  { left: '42%', top: '15%', delay: '2.1s', duration: '6.1s' },
  { left: '55%', top: '78%', delay: '0.8s', duration: '3.9s' },
  { left: '68%', top: '32%', delay: '1.7s', duration: '5.5s' },
  { left: '81%', top: '85%', delay: '2.9s', duration: '4.2s' },
  { left: '92%', top: '45%', delay: '0.2s', duration: '6.4s' },
  { left: '18%', top: '88%', delay: '3.3s', duration: '5.0s' },
  { left: '35%', top: '40%', delay: '1.5s', duration: '4.5s' },
  { left: '74%', top: '18%', delay: '2.4s', duration: '5.8s' },
  { left: '08%', top: '52%', delay: '0.9s', duration: '4.1s' },
  { left: '62%', top: '92%', delay: '3.1s', duration: '6.0s' },
  { left: '88%', top: '12%', delay: '1.1s', duration: '4.7s' },
  { left: '48%', top: '50%', delay: '2.6s', duration: '5.3s' },
  { left: '24%', top: '10%', delay: '0.6s', duration: '3.8s' },
  { left: '79%', top: '62%', delay: '3.5s', duration: '6.2s' },
  { left: '95%', top: '75%', delay: '1.9s', duration: '4.9s' },
  { left: '04%', top: '82%', delay: '2.8s', duration: '5.7s' },
  { left: '38%', top: '95%', delay: '0.5s', duration: '4.4s' },
  { left: '52%', top: '28%', delay: '1.4s', duration: '5.9s' },
]

function HomePage() {
  const [trendingShows, setTrendingShows] = useState([])

  useEffect(() => {
    // Fetch a few shows for the trending preview
    fetch('https://api.tvmaze.com/shows?page=0')
      .then(res => res.json())
      .then(data => {
        // Pick some highly-rated shows for the preview
        const filtered = data
          .filter(s => s.image && s.rating?.average >= 7)
          .sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0))
          .slice(0, 6)
        setTrendingShows(filtered)
      })
      .catch(() => {})
  }, [])

  return (
    <div className="home" id="home-page">
      {/* Hero Section */}
      <section className="hero" id="hero-section">
        {/* Animated Background Elements */}
        <div className="hero__bg-elements">
          <div className="hero__orb hero__orb--1"></div>
          <div className="hero__orb hero__orb--2"></div>
          <div className="hero__orb hero__orb--3"></div>
          <div className="hero__particles">
            {HERO_PARTICLES.map((particle, i) => (
              <div
                key={i}
                className="hero__particle"
                style={{
                  left: particle.left,
                  top: particle.top,
                  animationDelay: particle.delay,
                  animationDuration: particle.duration,
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot"></span>
            Trending Now
          </div>
          <h1 className="hero__title" id="hero-title">
            Discover <span className="hero__title-gradient">Amazing</span><br />
            Movies & Shows
          </h1>
          <p className="hero__description">
            Explore and discover your favorite movies and TV shows from around the world.
            Browse thousands of titles, check ratings, and find your next binge-watch.
          </p>
          <div className="hero__actions">
            <Link to="/movies" className="hero__btn hero__btn--primary" id="hero-cta-explore">
              <span>🎬</span> Explore Now
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
            <a href="#trending" className="hero__btn hero__btn--secondary" id="hero-cta-trending">
              <span>🔥</span> See Trending
            </a>
          </div>

          {/* Stats */}
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-number">25K+</span>
              <span className="hero__stat-label">Shows</span>
            </div>
            <div className="hero__stat-divider"></div>
            <div className="hero__stat">
              <span className="hero__stat-number">100+</span>
              <span className="hero__stat-label">Genres</span>
            </div>
            <div className="hero__stat-divider"></div>
            <div className="hero__stat">
              <span className="hero__stat-number">50+</span>
              <span className="hero__stat-label">Countries</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Preview */}
      {trendingShows.length > 0 && (
        <section className="trending" id="trending">
          <div className="trending__container">
            <div className="trending__header">
              <h2 className="trending__title">
                <span className="trending__title-icon">🔥</span>
                Trending Right Now
              </h2>
              <Link to="/movies" className="trending__see-all" id="trending-see-all">
                View All
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
            </div>
            <div className="trending__grid">
              {trendingShows.map((show, i) => (
                <Link
                  to="/movies"
                  key={show.id}
                  className="trending__card"
                  style={{ animationDelay: `${i * 100}ms` }}
                  id={`trending-card-${show.id}`}
                >
                  <div className="trending__card-img-wrap">
                    <img
                      src={show.image?.medium || show.image?.original}
                      alt={show.name}
                      className="trending__card-img"
                      loading="lazy"
                    />
                    <div className="trending__card-overlay">
                      <span className="trending__card-rank">#{i + 1}</span>
                    </div>
                  </div>
                  <div className="trending__card-info">
                    <h3 className="trending__card-name">{show.name}</h3>
                    <span className="trending__card-rating">⭐ {show.rating?.average || 'N/A'}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="features" id="features-section">
        <div className="features__container">
          <h2 className="features__title">Why MovieExplorer?</h2>
          <div className="features__grid">
            <div className="features__card" style={{ animationDelay: '0ms' }}>
              <div className="features__card-icon">🔍</div>
              <h3 className="features__card-title">Smart Search</h3>
              <p className="features__card-desc">
                Find any movie or TV show instantly with our powerful search engine.
              </p>
            </div>
            <div className="features__card" style={{ animationDelay: '100ms' }}>
              <div className="features__card-icon">⭐</div>
              <h3 className="features__card-title">Ratings & Reviews</h3>
              <p className="features__card-desc">
                See ratings at a glance to discover the highest-rated content.
              </p>
            </div>
            <div className="features__card" style={{ animationDelay: '200ms' }}>
              <div className="features__card-icon">📱</div>
              <h3 className="features__card-title">Responsive Design</h3>
              <p className="features__card-desc">
                Enjoy a seamless experience across all your devices.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
