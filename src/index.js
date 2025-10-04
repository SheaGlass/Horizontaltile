import { createRoot } from 'react-dom/client'
import { Suspense } from 'react'
import './styles.css'
import { App, state } from './App' // Import state from App.js
import { useSnapshot } from 'valtio'

function MainOverlay() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', width: '100%', height: '100%' }}>
      <div style={{ position: 'absolute', top: 40, left: 40, fontSize: '24px', fontWeight: 'bold', color: 'white' }}>Recent Projects</div>
    </div>
  )
}

function ProjectDetailsOverlay() {
  const snap = useSnapshot(state)
  const clickedProject = snap.clicked !== null ? snap.projects[snap.clicked] : null

  if (!clickedProject) return null

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 40,
        left: 40,
        pointerEvents: 'auto', // Allow interaction with the overlay
        color: 'white',
        fontSize: '18px',
        maxWidth: '300px',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: '15px',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
      <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>{clickedProject.title}</h2>
      <a href={clickedProject.link} target="_blank" rel="noopener noreferrer" style={{ color: '#87CEEB', textDecoration: 'underline', pointerEvents: 'auto' }}>
        View Project
      </a>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <>
    <Suspense fallback={null}>
      <App />
    </Suspense>
    <MainOverlay />
    <ProjectDetailsOverlay />
  </>
)