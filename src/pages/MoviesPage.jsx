import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import MovieCard from '../components/MovieCard.jsx'
import MovieModal from '../components/MovieModal.jsx'
import Loader from '../components/Loader.jsx'
import './MoviesPage.css'

const BASE_URL = 'https://api.tvmaze.com'

const GENRES = [
  'All',
  'Drama',
  'Action',
  'Comedy',
  'Science-Fiction',
  'Thriller',
  'Horror',
  'Romance',
  'Crime',
  'Adventure',
  'Mystery',
  'Animation',
]

function MoviesPage() {
  const [shows, setShows] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedShow, setSelectedShow] = useState(null)
  const [selectedGenre, setSelectedGenre] = useState('All')
  const [sortBy, setSortBy] = useState('rating-desc')
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)
  const [searchTimeout, setSearchTimeout] = useState(null)
  const searchInputRef = useRef(null)

  // Load favorites from localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('movie_explorer26_favorites')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const toggleFavorite = useCallback((show) => {
    setFavorites(prev => {
      const next = prev.includes(show.id)
        ? prev.filter(id => id !== show.id)
        : [...prev, show.id]
      try {
        localStorage.setItem('movie_explorer26_favorites', JSON.stringify(next))
      } catch (e) {
        console.error(e)
      }
      return next
    })
  }, [])

  const fetchShowsData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${BASE_URL}/shows`)
      if (!response.ok) throw new Error('Failed to fetch shows')
      const data = await response.json()
      const sorted = data
        .sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0))
        .slice(0, 60)
      setShows(sorted)
    } catch (err) {
      setError('Something went wrong while fetching shows. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Initial fetch on mount
  useEffect(() => {
    let ignore = false
    const loadInitial = async () => {
      try {
        const response = await fetch(`${BASE_URL}/shows`)
        if (!response.ok) throw new Error('Failed to fetch shows')
        const data = await response.json()
        if (!ignore) {
          const sorted = data
            .sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0))
            .slice(0, 60)
          setShows(sorted)
        }
      } catch (err) {
        if (!ignore) {
          setError('Something went wrong while fetching shows. Please try again.')
          console.error(err)
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }
    loadInitial()
    return () => {
      ignore = true
    }
  }, [])

  // Debounced search
  const handleSearchChange = useCallback((e) => {
    const query = e.target.value
    setSearchQuery(query)

    if (searchTimeout) clearTimeout(searchTimeout)

    if (query.trim() === '') {
      fetchShowsData()
      return
    }

    const timeout = setTimeout(async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(query.trim())}`)
        if (!response.ok) throw new Error('Search failed')
        const data = await response.json()
        const results = data.map(item => item.show)
        setShows(results)
        if (results.length === 0) {
          setError(`No results found for "${query}". Try a different search term.`)
        }
      } catch (err) {
        setError('Search failed. Please try again.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }, 400)

    setSearchTimeout(timeout)
  }, [searchTimeout, fetchShowsData])

  const handleClearSearch = () => {
    setSearchQuery('')
    fetchShowsData()
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }

  const handleResetFilters = () => {
    setSelectedGenre('All')
    setSortBy('rating-desc')
    setShowOnlyFavorites(false)
    if (searchQuery) {
      handleClearSearch()
    }
  }

  const handleSeeDetails = (show) => {
    setSelectedShow(show)
  }

  const handleCloseModal = () => {
    setSelectedShow(null)
  }

  // Filter & sort shows
  const displayedShows = useMemo(() => {
    let result = [...shows]

    if (showOnlyFavorites) {
      result = result.filter(s => favorites.includes(s.id))
    }

    if (selectedGenre !== 'All') {
      result = result.filter(s => s.genres && s.genres.includes(selectedGenre))
    }

    result.sort((a, b) => {
      if (sortBy === 'rating-desc') {
        return (b.rating?.average || 0) - (a.rating?.average || 0)
      }
      if (sortBy === 'title-asc') {
        return (a.name || '').localeCompare(b.name || '')
      }
      if (sortBy === 'title-desc') {
        return (b.name || '').localeCompare(a.name || '')
      }
      if (sortBy === 'year-desc') {
        return (b.premiered || '').localeCompare(a.premiered || '')
      }
      if (sortBy === 'year-asc') {
        return (a.premiered || '').localeCompare(b.premiered || '')
      }
      return 0
    })

    return result
  }, [shows, selectedGenre, sortBy, showOnlyFavorites, favorites])

  const isFiltered = selectedGenre !== 'All' || sortBy !== 'rating-desc' || showOnlyFavorites || Boolean(searchQuery)

  return (
    <div className="movies-page" id="movies-page">
      {/* Page Header */}
      <section className="movies-page__header">
        <div className="movies-page__header-bg"></div>
        <div className="movies-page__header-content">
          <h1 className="movies-page__title" id="movies-page-title">
            Browse <span className="movies-page__title-accent">Movies & Shows</span>
          </h1>
          <p className="movies-page__subtitle">
            Discover thousands of titles from the world's best TV shows and movies.
          </p>

          {/* Search Bar */}
          <div className="search-bar" id="search-bar">
            <div className="search-bar__icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
            <input
              ref={searchInputRef}
              type="text"
              className="search-bar__input"
              placeholder="Search for a movie or show..."
              value={searchQuery}
              onChange={handleSearchChange}
              id="search-input"
              aria-label="Search movies"
            />
            {searchQuery && (
              <button className="search-bar__clear" onClick={handleClearSearch} id="search-clear" aria-label="Clear search">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>

          {/* Filter & Sort Controls */}
          <div className="filter-controls" id="filter-controls">
            <div className="genre-pills" id="genre-pills">
              {GENRES.map(genre => (
                <button
                  key={genre}
                  type="button"
                  className={`genre-pill ${selectedGenre === genre ? 'genre-pill--active' : ''}`}
                  onClick={() => setSelectedGenre(genre)}
                  id={`genre-pill-${genre.toLowerCase()}`}
                >
                  {genre}
                </button>
              ))}
            </div>

            <div className="filter-actions" id="filter-actions">
              <button
                type="button"
                className={`favorites-filter-btn ${showOnlyFavorites ? 'favorites-filter-btn--active' : ''}`}
                onClick={() => setShowOnlyFavorites(prev => !prev)}
                id="favorites-toggle-btn"
              >
                ❤️ Favorites ({favorites.length})
              </button>

              <div className="sort-select-wrap">
                <label htmlFor="sort-select" className="sort-label">Sort:</label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="rating-desc">⭐ Top Rated</option>
                  <option value="title-asc">🔤 Title (A - Z)</option>
                  <option value="title-desc">🔤 Title (Z - A)</option>
                  <option value="year-desc">📅 Newest First</option>
                  <option value="year-asc">📅 Oldest First</option>
                </select>
              </div>

              {isFiltered && (
                <button
                  type="button"
                  className="filter-reset-btn"
                  onClick={handleResetFilters}
                  id="filter-reset-btn"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Results Count */}
          {!loading && !error && (
            <p className="movies-page__results-count" id="results-count">
              Showing {displayedShows.length} {displayedShows.length === 1 ? 'title' : 'titles'}
              {selectedGenre !== 'All' ? ` in ${selectedGenre}` : ''}
              {showOnlyFavorites ? ' (Favorites)' : ''}
              {searchQuery ? ` matching "${searchQuery}"` : ''}
            </p>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="movies-page__content">
        <div className="movies-page__container">
          {loading ? (
            <Loader text={searchQuery ? 'Searching...' : 'Loading movies...'} />
          ) : error && displayedShows.length === 0 ? (
            <div className="movies-page__error" id="error-message">
              <div className="movies-page__error-icon">😞</div>
              <p className="movies-page__error-text">{error}</p>
              <button className="movies-page__error-btn" onClick={fetchShowsData} id="retry-btn">
                Try Again
              </button>
            </div>
          ) : displayedShows.length === 0 ? (
            <div className="movies-page__error" id="no-results-message">
              <div className="movies-page__error-icon">🔍</div>
              <p className="movies-page__error-text">
                {showOnlyFavorites
                  ? "You haven't added any favorites yet. Click the heart icon on any movie to save it!"
                  : `No titles match your active filters.`}
              </p>
              {isFiltered && (
                <button className="movies-page__error-btn" onClick={handleResetFilters}>
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="movies-grid" id="movies-grid">
              {displayedShows.map((show, index) => (
                <MovieCard
                  key={show.id}
                  show={show}
                  onSeeDetails={handleSeeDetails}
                  index={index}
                  isFavorite={favorites.includes(show.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Interactive Movie Details Modal */}
      {selectedShow && (
        <MovieModal
          show={selectedShow}
          onClose={handleCloseModal}
          isFavorite={favorites.includes(selectedShow.id)}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  )
}

export default MoviesPage
