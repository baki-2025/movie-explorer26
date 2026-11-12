import { useEffect, useRef } from 'react'
import './MovieModal.css'

const PLACEHOLDER_IMG = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22800%22%20height%3D%22450%22%20fill%3D%22%231a1a3e%22%3E%3Crect%20width%3D%22800%22%20height%3D%22450%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22%236a6a8e%22%20font-size%3D%2224%22%20font-family%3D%22sans-serif%22%3ENo%20Image%20Available%3C%2Ftext%3E%3C%2Fsvg%3E'

function stripHtml(html) {
  if (!html) return ''
  const tmp = document.createElement('div')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}

function MovieModal({ show, onClose, isFavorite, onToggleFavorite }) {
  const modalRef = useRef(null)

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) {
      onClose()
    }
  }

  if (!show) return null

  const image = show.image?.original || show.image?.medium || PLACEHOLDER_IMG
  const name = show.name || 'Unknown Title'
  const rating = show.rating?.average || 'N/A'
  const premiered = show.premiered || 'TBA'
  const genres = show.genres || []
  const summary = stripHtml(show.summary)
  const status = show.status || 'Unknown'
  const language = show.language || 'N/A'
  const runtime = show.runtime ? `${show.runtime} min` : 'N/A'
  const network = show.network?.name || show.webChannel?.name || 'N/A'
  const officialSite = show.officialSite
  const schedule = show.schedule
  const type = show.type || 'N/A'

  return (
    <div
      className="modal-overlay"
      ref={modalRef}
      onClick={handleBackdropClick}
      id="movie-modal-overlay"
    >
      <div className="modal" id="movie-modal">
        {/* Close Button */}
        <button className="modal__close" onClick={onClose} id="modal-close-btn" aria-label="Close modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Backdrop Image */}
        <div className="modal__backdrop">
          <img src={image} alt={`${name} backdrop`} className="modal__backdrop-img" />
          <div className="modal__backdrop-gradient"></div>
        </div>

        {/* Content */}
        <div className="modal__content">
          <h2 className="modal__title" id="modal-title">{name}</h2>

          {/* Meta Row */}
          <div className="modal__meta-row">
            {rating !== 'N/A' && (
              <span className="modal__meta-chip modal__meta-chip--rating">
                ⭐ {rating}
              </span>
            )}
            <span className="modal__meta-chip">
              📅 {premiered}
            </span>
            <span className="modal__meta-chip">
              🕐 {runtime}
            </span>
            <span className={`modal__meta-chip ${status === 'Running' ? 'modal__meta-chip--running' : ''}`}>
              {status === 'Running' ? '🟢' : '🔴'} {status}
            </span>
          </div>

          {/* Genre Tags */}
          {genres.length > 0 && (
            <div className="modal__genres">
              {genres.map((genre) => (
                <span key={genre} className="modal__genre-tag">{genre}</span>
              ))}
            </div>
          )}

          {/* Summary */}
          {summary && (
            <div className="modal__section">
              <h3 className="modal__section-title">Overview</h3>
              <p className="modal__summary">{summary}</p>
            </div>
          )}

          {/* Details Grid */}
          <div className="modal__details-grid">
            <div className="modal__detail-item">
              <span className="modal__detail-label">Type</span>
              <span className="modal__detail-value">{type}</span>
            </div>
            <div className="modal__detail-item">
              <span className="modal__detail-label">Language</span>
              <span className="modal__detail-value">{language}</span>
            </div>
            <div className="modal__detail-item">
              <span className="modal__detail-label">Network</span>
              <span className="modal__detail-value">{network}</span>
            </div>
            {schedule && schedule.days && schedule.days.length > 0 && (
              <div className="modal__detail-item">
                <span className="modal__detail-label">Schedule</span>
                <span className="modal__detail-value">
                  {schedule.days.join(', ')} {schedule.time ? `at ${schedule.time}` : ''}
                </span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="modal__actions">
            {onToggleFavorite && (
              <button
                type="button"
                className={`modal__action-btn ${isFavorite ? 'modal__action-btn--fav-active' : 'modal__action-btn--fav'}`}
                onClick={() => onToggleFavorite(show)}
                id="modal-toggle-fav"
              >
                {isFavorite ? '❤️ In Favorites' : '🤍 Add to Favorites'}
              </button>
            )}
            {officialSite && (
              <a
                href={officialSite}
                target="_blank"
                rel="noopener noreferrer"
                className="modal__action-btn modal__action-btn--primary"
                id="modal-visit-site"
              >
                Visit Official Site
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            )}
            <button
              className="modal__action-btn modal__action-btn--secondary"
              onClick={onClose}
              id="modal-close-bottom"
            >
              ❌ Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieModal
