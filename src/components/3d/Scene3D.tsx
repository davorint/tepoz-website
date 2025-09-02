'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, MeshWobbleMaterial, ContactShadows, Environment, PerspectiveCamera, Stars } from '@react-three/drei'
import { Suspense, useRef, useState } from 'react'
import { Mesh, Vector3, Color } from 'three'
import * as THREE from 'three'

function FloatingTorus({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <Float speed={4} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} castShadow>
        <torusGeometry args={[1, 0.4, 16, 32]} />
        <MeshDistortMaterial
          color="#ff6b35"
          emissive="#ff3300"
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.9}
          distort={0.4}
          speed={2}
        />
      </mesh>
    </Float>
  )
}

function MorphingSphere() {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
      const scale = hovered ? 1.2 : 1
      meshRef.current.scale.lerp(new Vector3(scale, scale, scale), 0.1)
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh 
        ref={meshRef} 
        position={[0, 0, 0]} 
        castShadow
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[2, 64, 64]} />
        <MeshWobbleMaterial
          color={new Color('#8b5cf6')}
          emissive={new Color('#8b5cf6')}
          emissiveIntensity={0.3}
          roughness={0}
          metalness={0.8}
          factor={0.8}
          speed={3}
        />
      </mesh>
    </Float>
  )
}

function FloatingCrystal({ position, color }: { position: [number, number, number], color: string }) {
  const meshRef = useRef<Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.02
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={position} castShadow>
      <octahedronGeometry args={[0.7, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        roughness={0.1}
        metalness={1}
        envMapIntensity={1}
      />
    </mesh>
  )
}

function ParticleField() {
  const particles = useRef<THREE.Points>(null)
  const particleCount = 500
  
  // Generate deterministic positions to avoid hydration issues
  const positions = new Float32Array(particleCount * 3)
  for (let i = 0; i < particleCount * 3; i += 3) {
    // Use deterministic values instead of Math.random()
    const index = i / 3
    positions[i] = (Math.sin(index * 0.1) * Math.cos(index * 0.07)) * 20
    positions[i + 1] = (Math.cos(index * 0.1) * Math.sin(index * 0.13)) * 20
    positions[i + 2] = (Math.sin(index * 0.05) * Math.cos(index * 0.11)) * 20
  }

  useFrame((state) => {
    if (particles.current) {
      particles.current.rotation.y = state.clock.elapsedTime * 0.05
      particles.current.rotation.x = state.clock.elapsedTime * 0.03
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
        size={0.05}
        color="#ff6b35"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
      
      {/* Lighting Setup */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[0, 5, 0]} intensity={1} color="#ff6b35" />
      <spotLight
        position={[5, 10, 5]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        castShadow
        color="#ff6b35"
      />
      
      {/* Main Morphing Sphere */}
      <MorphingSphere />
      
      {/* Floating Elements */}
      <FloatingTorus position={[-3, 2, -2]} />
      <FloatingTorus position={[3, -1, -2]} />
      
      {/* Crystals */}
      <FloatingCrystal position={[-2, -2, 1]} color="#ff6b35" />
      <FloatingCrystal position={[2, 2, -1]} color="#8b5cf6" />
      <FloatingCrystal position={[0, 3, -3]} color="#ec4899" />
      <FloatingCrystal position={[-3, -1, 2]} color="#10b981" />
      
      {/* Particle Field */}
      <ParticleField />
      
      {/* Stars Background */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      
      {/* Contact Shadows */}
      <ContactShadows
        position={[0, -4, 0]}
        opacity={0.5}
        scale={20}
        blur={2}
        far={10}
        color="#8b5cf6"
      />
      
      {/* Environment */}
      <Environment preset="city" />
      <fog attach="fog" args={['#0a0a0a', 8, 20]} />
    </>
  )
}

export default function Scene3D() {
  return (
    <Canvas shadows className="cursor-pointer">
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}