import './MovieCard.css'

const PLACEHOLDER_IMG = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22210%22%20height%3D%22295%22%20fill%3D%22%231a1a3e%22%3E%3Crect%20width%3D%22210%22%20height%3D%22295%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22%236a6a8e%22%20font-size%3D%2216%22%20font-family%3D%22sans-serif%22%3ENo%20Image%3C%2Ftext%3E%3C%2Fsvg%3E'

function MovieCard({ show, onSeeDetails, index }) {
  const image = show.image?.medium || show.image?.original || PLACEHOLDER_IMG
  const name = show.name || 'Unknown Title'
  const rating = show.rating?.average || 'N/A'
  const premiered = show.premiered ? show.premiered.split('-')[0] : 'TBA'
  const genres = show.genres?.slice(0, 2) || []

  return (
    <div
      className="movie-card"
      style={{ animationDelay: `${(index % 20) * 50}ms` }}
      id={`movie-card-${show.id}`}
    >
      {/* Poster */}
      <div className="movie-card__poster-wrap">
        <img
          src={image}
          alt={`${name} poster`}
          className="movie-card__poster"
          loading="lazy"
        />
        <div className="movie-card__poster-overlay">
          <button
            className="movie-card__details-btn"
            onClick={() => onSeeDetails(show)}
            id={`see-details-${show.id}`}
          >
            See Details
          </button>
        </div>
        {/* Rating Badge */}
        {rating !== 'N/A' && (
          <div className="movie-card__rating-badge">
            <span className="movie-card__star">⭐</span>
            <span>{rating}</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="movie-card__info">
        <h3 className="movie-card__title">{name}</h3>
        <div className="movie-card__meta">
          <span className="movie-card__year">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            {premiered}
          </span>
          {rating !== 'N/A' && (
            <span className="movie-card__rating-text">
              ⭐ {rating}
            </span>
          )}
        </div>
        {genres.length > 0 && (
          <div className="movie-card__genres">
            {genres.map((genre) => (
              <span key={genre} className="movie-card__genre-tag">{genre}</span>
            ))}
          </div>
        )}
        <button
          className="movie-card__btn"
          onClick={() => onSeeDetails(show)}
          id={`card-btn-${show.id}`}
        >
          See Details
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>
      </div>
    </div>
  )
}

export default MovieCard
