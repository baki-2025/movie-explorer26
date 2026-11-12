import { useState, useEffect, useCallback, useRef } from 'react'
import MovieCard from '../components/MovieCard.jsx'
import Loader from '../components/Loader.jsx'
import './MoviesPage.css'

const BASE_URL = 'https://api.tvmaze.com'

function MoviesPage() {
  const [shows, setShows] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTimeout, setSearchTimeout] = useState(null)
  const searchInputRef = useRef(null)

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

  const handleSeeDetails = (show) => {
    console.log('Selected show:', show)
  }

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

          {/* Results Count */}
          {!loading && !error && (
            <p className="movies-page__results-count" id="results-count">
              {searchQuery
                ? `Found ${shows.length} result${shows.length !== 1 ? 's' : ''} for "${searchQuery}"`
                : `Showing top ${shows.length} shows`
              }
            </p>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="movies-page__content">
        <div className="movies-page__container">
          {loading ? (
            <Loader text={searchQuery ? 'Searching...' : 'Loading movies...'} />
          ) : error && shows.length === 0 ? (
            <div className="movies-page__error" id="error-message">
              <div className="movies-page__error-icon">😞</div>
              <p className="movies-page__error-text">{error}</p>
              <button className="movies-page__error-btn" onClick={fetchShowsData} id="retry-btn">
                Try Again
              </button>
            </div>
          ) : (
            <div className="movies-grid" id="movies-grid">
              {shows.map((show, index) => (
                <MovieCard
                  key={show.id}
                  show={show}
                  onSeeDetails={handleSeeDetails}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default MoviesPage
