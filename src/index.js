import { createRoot } from 'react-dom/client'
import { Suspense } from 'react'
import './styles.css'
import { App, state } from './App'
import { useSnapshot } from 'valtio'
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom' // Import routing components
import AboutPage from './pages/AboutPage' // Import new pages
import ContactPage from './pages/ContactPage'
import ShinyText from './components/ShinyText' // Import the new ShinyText component

// A layout component to keep the MainOverlay consistent across routes
function Layout() {
  const snap = useSnapshot(state) // Use snap to react to state changes, e.g., for resetting clicked
  return (
    <>
      <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', width: '100%', height: '100%' }}>
        {/* All text and navigation elements removed */}
      </div>
      <Outlet /> {/* This is where the routed components will render */}
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} /> {/* Main 3D app at the root */}
          <Route path="about" element={<AboutPage />} /> {/* About page */}
          <Route path="contact" element={<ContactPage />} /> {/* Contact page */}
        </Route>
      </Routes>
    </Suspense>
  </BrowserRouter>
)