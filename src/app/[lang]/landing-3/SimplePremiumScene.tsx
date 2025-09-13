'use client'

import React, { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { 
  OrbitControls, 
  Environment,
  Float,
  Stars,
  ContactShadows,
  MeshTransmissionMaterial,
  Text
} from '@react-three/drei'
import { 
  EffectComposer, 
  Bloom, 
  ChromaticAberration,
  Vignette,
  ToneMapping
} from '@react-three/postprocessing'
import * as THREE from 'three'

// Simple floating crystal
function FloatingCrystal() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })
  
  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} position={[0, 1, 0]}>
        <octahedronGeometry args={[1.5, 3]} />
        <MeshTransmissionMaterial
          samples={16}
          resolution={512}
          transmission={1}
          roughness={0}
          thickness={1}
          ior={1.5}
          chromaticAberration={0.06}
          color="#00ffff"
        />
      </mesh>
    </Float>
  )
}

// Animated sphere
function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })
  
  return (
    <mesh
      ref={meshRef}
      position={[-3, 0, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.2 : 1}
    >
      <icosahedronGeometry args={[1, 2]} />
      <meshStandardMaterial
        color={hovered ? "#ff00ff" : "#00ffff"}
        metalness={0.8}
        roughness={0.2}
        emissive={hovered ? "#ff00ff" : "#00ffff"}
        emissiveIntensity={0.1}
      />
    </mesh>
  )
}

// Premium text
function PremiumText() {
  const textRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2 + 2
    }
  })
  
  return (
    <Text
      ref={textRef}
      position={[0, 2, -2]}
      fontSize={1}
      color="#ffffff"
      anchorX="center"
      anchorY="middle"
    >
      TEPOZTLÁN
    </Text>
  )
}

// Loading component
function LoadingFallback() {
  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <div className="text-white text-xl animate-pulse">Loading Premium Experience...</div>
    </div>
  )
}

// Main simplified premium scene
export default function SimplePremiumScene() {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  if (!isClient) {
    return <LoadingFallback />
  }
  
  return (
    <div className="h-screen w-full">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            toneMapping: THREE.ACESFilmicToneMapping,
          }}
        >
          <color attach="background" args={['#000000']} />
          <fog attach="fog" args={['#000000', 8, 25]} />
          
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#00ffff" />
          <pointLight position={[-10, -10, -5]} intensity={1} color="#ff00ff" />
          
          <FloatingCrystal />
          <AnimatedSphere />
          <PremiumText />
          
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
            <mesh position={[3, -1, -1]}>
              <boxGeometry args={[0.8, 0.8, 0.8]} />
              <meshStandardMaterial 
                color="#ffff00"
                metalness={1}
                roughness={0}
                emissive="#ffff00"
                emissiveIntensity={0.1}
              />
            </mesh>
          </Float>
          
          <Stars
            radius={50}
            depth={30}
            count={1000}
            factor={2}
            saturation={0}
            fade
            speed={0.5}
          />
          
          <ContactShadows
            opacity={0.3}
            scale={8}
            blur={1}
            far={3}
            position={[0, -3, 0]}
          />
          
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
            autoRotate
            autoRotateSpeed={0.3}
          />
          
          <EffectComposer multisampling={4}>
            <Bloom
              intensity={2}
              luminanceThreshold={0.1}
              luminanceSmoothing={0.9}
              radius={0.8}
            />
            <ToneMapping 
              mode={4}
              resolution={256}
              whitePoint={4}
              middleGrey={0.6}
              minLuminance={0.01}
              averageLuminance={1}
              adaptationRate={2}
            />
            <ChromaticAberration
              offset={[0.002, 0.002]}
            />
            <Vignette eskil={false} offset={0.02} darkness={0.8} />
          </EffectComposer>
          
          <Environment preset="night" />
        </Canvas>
      </Suspense>
    </div>
  )
}