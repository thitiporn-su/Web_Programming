import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import './style.css'

function App() {
  return (
    <>
      <Canvas gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping
      }}
        camera={{
          fov: 45, near: 0.1, far: 200,
          position: [3, 2, 6]
        }}
      >
        <Experience />
      </Canvas>
    </>
  )
}

export default App
