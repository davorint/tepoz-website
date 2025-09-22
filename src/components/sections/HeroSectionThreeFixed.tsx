'use client'

import { useRef, useMemo, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, Center, Float, OrbitControls, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { Button } from '@/components/ui/button'
import { Play, MapPin, Calendar, Users } from 'lucide-react'
import { Locale } from '@/lib/i18n'

// Simple particle system with better performance
function MagicalParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.PointsMaterial>(null)

  const particleCount = 1000

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      pos[i3] = (Math.random() - 0.5) * 10
      pos[i3 + 1] = (Math.random() - 0.5) * 10
      pos[i3 + 2] = (Math.random() - 0.5) * 10
    }
    return pos
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <points ref={particlesRef}>
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
        ref={materialRef}
        size={0.05}
        color="#4ecdc4"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

// Animated 3D text using regular Text component (more reliable than Text3D)
function AnimatedText({ text, isMain = false }: { text: string; isMain?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { viewport } = useThree()

  useFrame((state) => {
    if (meshRef.current && isMain) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
    }
  })

  return (
    <Center>
      <Float speed={isMain ? 1 : 2} rotationIntensity={isMain ? 0.1 : 0.2} floatIntensity={isMain ? 0.3 : 0.5}>
        <Text
          ref={meshRef}
          fontSize={isMain ? viewport.width / 15 : viewport.width / 25}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-bold.woff"
          outlineWidth={0.02}
          outlineColor="#4ecdc4"
        >
          {text}
        </Text>
      </Float>
    </Center>
  )
}


// Main Three.js scene component
function ThreeTextScene({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <group>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[0, 0, 5]} intensity={2} color="#4ecdc4" />

      {/* Text elements with proper Suspense */}
      <Suspense fallback={null}>
        <AnimatedText text={title} isMain />
        <group position={[0, -1.5, 0]}>
          <AnimatedText text={subtitle} />
        </group>
      </Suspense>

      {/* Particle system */}
      <MagicalParticles />

      {/* Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />

      {/* Environment */}
      <Environment preset="sunset" />
    </group>
  )
}

interface HeroSectionThreeFixedProps {
  lang: Locale
}

const translations = {
  es: {
    title: "TEPOZTLÁN",
    subtitle: "Donde la magia cobra vida",
    cta: "Descubre Tepoztlán",
    watchVideo: "Ver Video",
    daysYear: "Días al año",
    attractions: "Atracciones",
    visitors: "Visitantes"
  },
  en: {
    title: "TEPOZTLÁN",
    subtitle: "Where magic comes to life",
    cta: "Discover Tepoztlán",
    watchVideo: "Watch Video",
    daysYear: "Days a year",
    attractions: "Attractions",
    visitors: "Visitors"
  }
}

export default function HeroSectionThreeFixed({ lang }: HeroSectionThreeFixedProps) {
  const t = translations[lang]
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useGSAP(() => {
    if (!containerRef.current) return

    // Animate UI elements on load
    gsap.from('.hero-ui-element', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out'
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden" suppressHydrationWarning>
      {/* Video Background */}
      <div className="absolute inset-0" suppressHydrationWarning>
        {isClient && isVideoPlaying ? (
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/tepoztlan-hero.mp4" type="video/mp4" />
          </video>
        ) : (
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1512813195386-6e4bbe982d05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
            }}
          />
        )}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />

      {/* Three.js Canvas */}
      <div className="absolute inset-0 z-10">
        {isClient && (
          <Canvas
            camera={{ position: [0, 0, 8], fov: 50 }}
            gl={{
              antialias: true,
              alpha: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.5
            }}
            dpr={[1, 2]} // Optimize for performance
          >
            <Suspense fallback={null}>
              <ThreeTextScene
                title={t.title}
                subtitle={t.subtitle}
              />
            </Suspense>
          </Canvas>
        )}
      </div>

      {/* UI Content */}
      <div className="relative z-20 flex flex-col justify-end items-center h-full text-center text-white px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          {/* Location Badge */}
          <div className="hero-ui-element inline-flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/30 rounded-full px-6 py-3 mb-8 text-white shadow-2xl">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-semibold drop-shadow-lg">Pueblo Mágico · Morelos, México</span>
          </div>

          {/* Action Buttons */}
          <div className="hero-ui-element flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-tepoztlan-sunset hover:bg-tepoztlan-sunset/90 text-white border-0"
            >
              {t.cta}
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20"
              onClick={() => setIsVideoPlaying(!isVideoPlaying)}
            >
              <Play className="w-5 h-5 mr-2" />
              {t.watchVideo}
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="hero-ui-element grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4">
              <Calendar className="w-6 h-6 mx-auto mb-2 text-tepoztlan-sunset" />
              <div className="text-2xl font-bold">365</div>
              <div className="text-sm opacity-90">{t.daysYear}</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4">
              <MapPin className="w-6 h-6 mx-auto mb-2 text-tepoztlan-sunset" />
              <div className="text-2xl font-bold">50+</div>
              <div className="text-sm opacity-90">{t.attractions}</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4">
              <Users className="w-6 h-6 mx-auto mb-2 text-tepoztlan-sunset" />
              <div className="text-2xl font-bold">1M+</div>
              <div className="text-sm opacity-90">{t.visitors}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}