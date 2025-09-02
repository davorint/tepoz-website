'use client'

import { useState, useEffect } from 'react'
import * as THREE from 'three'

// Placeholder for the 3D scene - will be loaded dynamically
function Scene3DPlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="animate-pulse">
        <div className="w-32 h-32 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full opacity-20 blur-xl" />
      </div>
    </div>
  )
}

interface Hero3DProps {
  lang: 'es' | 'en'
}

export default function Hero3D({ lang }: Hero3DProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isClient, setIsClient] = useState(false)
  const [Scene3D, setScene3D] = useState<React.ComponentType | null>(null)

  useEffect(() => {
    setIsClient(true)
    
    // Dynamically import the 3D scene only on client
    const loadScene = async () => {
      try {
        const { Canvas, useFrame } = await import('@react-three/fiber')
        const { Float, MeshDistortMaterial, MeshWobbleMaterial, ContactShadows, Environment, PerspectiveCamera } = await import('@react-three/drei')
        const { Suspense, useRef, useState } = await import('react')
        const THREE = await import('three')
        const { Vector3, Color } = THREE
        
        // Define components inside the dynamic import
        function FloatingTorus({ position }: { position: [number, number, number] }) {
          const meshRef = useRef<THREE.Mesh>(null)
          
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
          const meshRef = useRef<THREE.Mesh>(null)
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
          const meshRef = useRef<THREE.Mesh>(null)
          
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

        const DynamicScene3D = () => (
          <Canvas shadows className="cursor-pointer">
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </Canvas>
        )

        setScene3D(() => DynamicScene3D)
      } catch (error) {
        console.error('Failed to load 3D scene:', error)
      }
    }

    loadScene()
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isClient) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePosition({ x, y })
  }

  return (
    <div 
      className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-black via-purple-950/20 to-black"
      onMouseMove={handleMouseMove}
      suppressHydrationWarning
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        {Scene3D ? <Scene3D /> : <Scene3DPlaceholder />}
      </div>
      
      {/* Premium Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent pointer-events-none" />
      
      {/* Overlay Content with Parallax */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div 
          className="max-w-5xl text-center animate-in fade-in slide-in-from-bottom-10 duration-1000"
          style={isClient ? {
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
            transition: 'transform 0.3s ease-out'
          } : {}}
        >
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="text-sm font-medium text-gray-300">
              {lang === 'es' ? 'Experiencia Premium' : 'Premium Experience'}
            </span>
          </div>
          
          <h1 className="mb-6 text-6xl md:text-8xl lg:text-9xl font-bold">
            <span className="bg-gradient-to-r from-orange-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient bg-300%">
              Tepoztlán
            </span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 animate-in fade-in slide-in-from-bottom-10 duration-1000 [animation-delay:300ms]">
            {lang === 'es' 
              ? 'Un portal hacia experiencias místicas y transformadoras'
              : 'A gateway to mystical and transformative experiences'
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-10 duration-1000 [animation-delay:600ms]">
            <button className="group relative px-10 py-5 overflow-hidden rounded-full font-semibold transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-purple-500 to-pink-500 animate-gradient bg-300%" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient bg-300%" />
              <span className="relative z-10 text-white">
                {lang === 'es' ? 'Comenzar Aventura' : 'Start Adventure'}
              </span>
            </button>
            
            <button className="group px-10 py-5 backdrop-blur-md bg-white/5 border border-white/20 text-gray-300 font-semibold rounded-full transition-all duration-500 hover:scale-105 hover:bg-white/10 hover:border-white/40 hover:shadow-lg hover:shadow-purple-500/20">
              <span className="group-hover:text-white transition-colors">
                {lang === 'es' ? 'Explorar Mapa 3D' : 'Explore 3D Map'}
              </span>
            </button>
          </div>
          
          {/* Animated Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-gray-400 uppercase tracking-widest">
                {lang === 'es' ? 'Desliza' : 'Scroll'}
              </span>
              <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center">
                <div className="w-1 h-2 bg-white/60 rounded-full mt-2 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Premium Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-purple-500/20 via-transparent to-transparent animate-pulse-slow" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-orange-500/20 via-transparent to-transparent animate-pulse-slow animation-delay-2000" />
      </div>
    </div>
  )
}