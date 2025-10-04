import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Image, ScrollControls, Scroll, useScroll } from '@react-three/drei'
import { proxy, useSnapshot } from 'valtio'
import { easing } from 'maath'
import { useNavigate } from 'react-router-dom' // Import useNavigate

const material = new THREE.LineBasicMaterial({ color: 'white' })
const geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -0.5, 0), new THREE.Vector3(0, 0.5, 0)])

export const state = proxy({
  clicked: null,
  projects: [
    { id: 0, url: '/1.jpg', title: 'About Us', internalPath: '/about' }, // Internal link
    { id: 1, url: '/2.jpg', title: 'My Portfolio', externalUrl: 'https://shea.glass/portfolio' }, // External link
    { id: 2, url: '/3.jpg', title: 'Contact Me', internalPath: '/contact' }, // Internal link
    { id: 3, url: '/4.jpg', title: 'Project Delta', externalUrl: 'https://example.com/delta' },
    { id: 4, url: '/5.jpg', title: 'Project Epsilon', externalUrl: 'https://example.com/epsilon' },
    { id: 5, url: '/6.jpg', title: 'Project Zeta', externalUrl: 'https://example.com/zeta' },
    { id: 6, url: '/7.jpg', title: 'Project Eta', externalUrl: 'https://example.com/eta' },
    { id: 7, url: '/8.jpg', title: 'Project Theta', externalUrl: 'https://example.com/theta' },
    { id: 8, url: '/9.jpg', title: 'Project Iota', externalUrl: 'https://example.com/iota' },
    { id: 9, url: '/10.jpg', title: 'Project Kappa', externalUrl: 'https://example.com/kappa' },
    { id: 10, url: '/11.jpg', title: 'Project Lambda', externalUrl: 'https://example.com/lambda' },
    { id: 11, url: '/12.jpg', title: 'Project Mu', externalUrl: 'https://example.com/mu' },
    { id: 12, url: '/1.jpg', title: 'Project Nu', externalUrl: 'https://example.com/nu' },
    { id: 13, url: '/5.jpg', title: 'Project Xi', externalUrl: 'https://example.com/xi' },
    { id: 14, url: '/7.jpg', title: 'Project Omicron', externalUrl: 'https://example.com/omicron' },
    { id: 15, url: '/8.jpg', title: 'Project Pi', externalUrl: 'https://example.com/pi' },
    { id: 16, url: '/2.jpg', title: 'Project Rho', externalUrl: 'https://example.com/rho' },
    { id: 17, url: '/4.jpg', title: 'Project Sigma', externalUrl: 'https://example.com/sigma' },
    { id: 18, url: '/9.jpg', title: 'Project Tau', externalUrl: 'https://example.com/tau' },
    { id: 19, url: '/6.jpg', title: 'Project Upsilon', externalUrl: 'https://example.com/upsilon' }
  ]
})

function Minimap() {
  const ref = useRef()
  const scroll = useScroll()
  const { projects } = useSnapshot(state)
  const { height } = useThree((state) => state.viewport)
  useFrame((state, delta) => {
    ref.current.children.forEach((child, index) => {
      const y = scroll.curve(index / projects.length - 1.5 / projects.length, 4 / projects.length)
      easing.damp(child.scale, 'y', 0.15 + y / 6, 0.15, delta)
    })
  })
  return (
    <group ref={ref}>
      {projects.map((_, i) => (
        <line key={i} geometry={geometry} material={material} position={[i * 0.06 - projects.length * 0.03, -height / 2 + 0.6, 0]} />
      ))}
    </group>
  )
}

function Item({ index, position, scale, project, c = new THREE.Color(), ...props }) {
  const ref = useRef()
  const scroll = useScroll()
  const { clicked, projects } = useSnapshot(state)
  const [hovered, hover] = useState(false)
  const navigate = useNavigate() // Initialize useNavigate

  const click = () => {
    if (clicked === index) {
      // If already clicked (expanded), try to navigate
      if (project.internalPath) {
        navigate(project.internalPath)
        state.clicked = null // Reset clicked state after navigation
      } else if (project.externalUrl) {
        window.location.href = project.externalUrl // Navigate in the same tab
        state.clicked = null // Reset clicked state after navigation
      } else {
        // If no link, just collapse on second click
        state.clicked = null
      }
    } else {
      // First click (or clicking a different item), expand it
      state.clicked = index
    }
  }

  const over = () => hover(true)
  const out = () => hover(false)

  useFrame((state, delta) => {
    const y = scroll.curve(index / projects.length - 1.5 / projects.length, 4 / projects.length)
    easing.damp3(ref.current.scale, [clicked === index ? 4.7 : scale[0], clicked === index ? 5 : 4 + y, 1], 0.15, delta)
    ref.current.material.scale[0] = ref.current.scale.x
    ref.current.material.scale[1] = ref.current.scale.y
    if (clicked !== null && index < clicked) easing.damp(ref.current.position, 'x', position[0] - 2, 0.15, delta)
    if (clicked !== null && index > clicked) easing.damp(ref.current.position, 'x', position[0] + 2, 0.15, delta)
    if (clicked === null || clicked === index) easing.damp(ref.current.position, 'x', position[0], 0.15, delta)
    easing.damp(ref.current.material, 'grayscale', hovered || clicked === index ? 0 : Math.max(0, 1 - y), 0.15, delta)
    easing.dampC(ref.current.material.color, hovered || clicked === index ? 'white' : '#aaa', hovered ? 0.3 : 0.15, delta)
  })
  return <Image ref={ref} {...props} position={position} scale={scale} url={project.url} onClick={click} onPointerOver={over} onPointerOut={out} />
}

function Items({ w = 0.7, gap = 0.15 }) {
  const { projects } = useSnapshot(state)
  const { width } = useThree((state) => state.viewport)
  const xW = w + gap
  return (
    <ScrollControls horizontal damping={0.1} pages={(width - xW + projects.length * xW) / width}>
      <Minimap />
      <Scroll>
        {projects.map((project, i) => <Item key={project.id} index={i} position={[i * xW, 0, 0]} scale={[w, 4, 1]} project={project} />) /* prettier-ignore */}
      </Scroll>
    </ScrollControls>
  )
}

export const App = () => (
  <Canvas gl={{ antialias: false }} dpr={[1, 1.5]} onPointerMissed={() => (state.clicked = null)}>
    <Items />
  </Canvas>
)