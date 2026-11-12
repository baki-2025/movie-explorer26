import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <div style={{ textAlign: 'center', padding: '120px 20px', minHeight: '60vh' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>
            Welcome to MovieExplorer26
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.2rem' }}>
            Discover and explore your favorite movies and TV shows from around the world.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
