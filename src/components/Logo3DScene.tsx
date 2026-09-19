import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Center } from '@react-three/drei'
import type { MotionValue } from 'motion/react'
import * as THREE from 'three'

class ThreeErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error: any) {
    console.warn('3D Logo canvas disabled or context lost:', error)
  }
  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}

function LogoModel({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const { scene } = useGLTF('/Meshy_AI_Monochrome_Orbit_0917171755_texture.glb')
  const modelRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (modelRef.current) {
      // Continuous slow idle spin
      const idleSpin = state.clock.getElapsedTime() * 0.2
      // Responsive scroll spin
      const scrollSpin = scrollYProgress.get() * Math.PI * 6
      
      modelRef.current.rotation.y = idleSpin + scrollSpin
      
      // Slight tilt so it catches the light dynamically
      modelRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1 + 0.1
      modelRef.current.rotation.z = Math.cos(state.clock.getElapsedTime() * 0.5) * 0.05
    }
  })

  // Initialize directly using window width since this is a purely client-side Vite app
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <Center>
      {/* Scaled down significantly on mobile and pushed down so it doesn't overlap text */}
      <primitive ref={modelRef} object={scene} scale={isMobile ? 0.9 : 2.2} position={isMobile ? [0, -0.5, 0] : [0, 0, 0]} />
    </Center>
  )
}

export default function Logo3DScene({ progress }: { progress: MotionValue<number> }) {
  return (
    <ThreeErrorBoundary>
      <div className="absolute inset-0 w-full h-full pointer-events-none z-10 flex items-center justify-center">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}>
          <ambientLight intensity={1.8} />
          <directionalLight position={[10, 10, 8]} intensity={2.5} />
          <directionalLight position={[-10, 5, 5]} intensity={1.2} />
          <pointLight position={[0, -5, -5]} intensity={1.5} color="#FFECD1" />
          <React.Suspense fallback={null}>
            <LogoModel scrollYProgress={progress} />
          </React.Suspense>
        </Canvas>
      </div>
    </ThreeErrorBoundary>
  )
}

