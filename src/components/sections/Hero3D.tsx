'use client'

import { Canvas } from '@react-three/fiber'
import { Float, OrbitControls, Environment, MeshReflectorMaterial, PerspectiveCamera } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import { Mesh } from 'three'

function FloatingPyramid() {
  const meshRef = useRef<Mesh>(null)
  
  return (
    <Float
      speed={2}
      rotationIntensity={1}
      floatIntensity={2}
      floatingRange={[-0.1, 0.1]}
    >
      <mesh ref={meshRef} position={[0, 2, 0]} castShadow>
        <coneGeometry args={[1.5, 3, 4]} />
        <meshStandardMaterial 
          color="#ff6b35"
          emissive="#ff6b35"
          emissiveIntensity={0.2}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 3, 10]} fov={45} />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={0.5}
      />
      
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ff6b35" />
      
      {/* Main Pyramid */}
      <FloatingPyramid />
      
      {/* Reflective Floor */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={80}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#0a0a0a"
          metalness={0.8}
          mirror={0.5}
        />
      </mesh>
      
      {/* Environment */}
      <Environment preset="sunset" />
      <fog attach="fog" args={['#0a0a0a', 10, 30]} />
    </>
  )
}

interface Hero3DProps {
  lang: 'es' | 'en'
}

export default function Hero3D({ lang }: Hero3DProps) {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas shadows>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Overlay Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="max-w-5xl text-center animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <h1 className="mb-6 text-5xl md:text-7xl lg:text-8xl font-bold">
            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent animate-gradient bg-300% animate-shimmer">
              Tepoztlán
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 animate-in fade-in slide-in-from-bottom-10 duration-1000 [animation-delay:300ms]">
            {lang === 'es' 
              ? 'Donde la magia ancestral se encuentra con la modernidad'
              : 'Where ancient magic meets modernity'
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-10 duration-1000 [animation-delay:600ms]">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25">
              <span className="relative z-10">
                {lang === 'es' ? 'Explorar Ahora' : 'Explore Now'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <button className="px-8 py-4 border-2 border-gray-600 text-gray-300 font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:border-orange-500 hover:text-orange-500 hover:shadow-lg hover:shadow-orange-500/20">
              {lang === 'es' ? 'Ver Video' : 'Watch Video'}
            </button>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 48">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v38m0 0l-7-7m7 7l7-7" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>
    </div>
  )
}