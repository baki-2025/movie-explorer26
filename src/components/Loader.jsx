import './Loader.css'

function Loader({ text = 'Loading movies...' }) {
  return (
    <div className="loader" id="loading-spinner">
      <div className="loader__spinner">
        <div className="loader__ring"></div>
        <div className="loader__ring"></div>
        <div className="loader__ring"></div>
        <span className="loader__icon">🎬</span>
      </div>
      <p className="loader__text">{text}</p>
    </div>
  )
}

export default Loader
