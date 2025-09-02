'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, PerspectiveCamera } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import { Mesh } from 'three'
import * as THREE from 'three'

// Simplified floating shape with minimal resources
function OptimizedFloatingShape({ position, color = "#ff6b35" }: { 
  position: [number, number, number]
  color?: string 
}) {
  const meshRef = useRef<Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      // Simplified rotation with less calculations
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position}>
        {/* Use simpler geometry for better performance */}
        <sphereGeometry args={[1, 16, 12]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
    </Float>
  )
}

// Simplified particle system with fewer particles
function OptimizedParticleField() {
  const particles = useRef<THREE.Points>(null)
  const particleCount = 50 // Reduced from original for better performance
  
  const positions = new Float32Array(particleCount * 3)
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20
  }

  useFrame((state) => {
    if (particles.current) {
      particles.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#ff6b35"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function OptimizedScene3D() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Canvas className="w-full h-full">
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        
        {/* Simplified lighting setup */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        
        <Suspense fallback={null}>
          {/* Minimal environment for better performance */}
          <Environment preset="sunset" backgroundBlurriness={0.8} />
          
          {/* Reduced number of 3D objects */}
          <OptimizedFloatingShape position={[-3, 1, 0]} color="#ff6b35" />
          <OptimizedFloatingShape position={[3, -1, -2]} color="#ff8c42" />
          
          {/* Optional particle field - can be disabled on mobile */}
          {typeof window !== 'undefined' && window.innerWidth >= 768 && (
            <OptimizedParticleField />
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}

// Conditional export based on device capabilities
export default function ConditionalOptimizedScene3D() {
  // Check if device prefers reduced motion or is low-end
  const prefersReducedMotion = 
    typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const isLowEndDevice = 
    typeof window !== 'undefined' && 
    navigator.hardwareConcurrency && 
    navigator.hardwareConcurrency <= 4

  // Fallback to CSS animations for low-end devices or reduced motion preference
  if (prefersReducedMotion || isLowEndDevice) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full animate-float opacity-60" />
        <div className="absolute bottom-1/3 right-1/3 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full motion-safe-animate-float opacity-50" />
        <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full animate-bounce-slow opacity-40" />
      </div>
    )
  }

  return <OptimizedScene3D />
}