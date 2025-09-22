'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { Button } from '@/components/ui/button'
import { Play, MapPin, Calendar, Users } from 'lucide-react'
import { Locale } from '@/lib/i18n'

// Settings from the original code
const movementSpeed = 80
const totalObjects = 1000
const objectSize = 10
const sizeRandomness = 4000
const colors = [0xFF0FFF, 0xCCFF00, 0xFF000F, 0x996600, 0xFFFFFF]

// Explosion management moved to component state to avoid hydration issues

interface ExplodeAnimationInstance {
  object: THREE.Points
  status: boolean
  dirs: Array<{x: number, y: number, z: number}>
  update: () => void
}

// Create explosion exactly like the original
function createExplodeAnimation(x: number, y: number, scene: THREE.Scene): ExplodeAnimationInstance {
  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(totalObjects * 3)
  const dirs: Array<{x: number, y: number, z: number}> = []

  for (let i = 0; i < totalObjects; i++) {
    const i3 = i * 3
    positions[i3] = x
    positions[i3 + 1] = y
    positions[i3 + 2] = 0

    dirs.push({
      x: (Math.random() * movementSpeed) - (movementSpeed / 2),
      y: (Math.random() * movementSpeed) - (movementSpeed / 2),
      z: (Math.random() * movementSpeed) - (movementSpeed / 2)
    })
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const material = new THREE.PointsMaterial({
    size: objectSize,
    color: colors[Math.round(Math.random() * colors.length)],
    transparent: false
  })

  const particles = new THREE.Points(geometry, material)
  scene.add(particles)

  const instance: ExplodeAnimationInstance = {
    object: particles,
    status: true,
    dirs: dirs,
    update: function() {
      if (this.status === true) {
        const positions = this.object.geometry.attributes.position.array as Float32Array
        let pCount = totalObjects
        while(pCount--) {
          const i3 = pCount * 3
          positions[i3 + 1] += this.dirs[pCount].y  // particle.y += dirs[pCount].y
          positions[i3] += this.dirs[pCount].x      // particle.x += dirs[pCount].x
          positions[i3 + 2] += this.dirs[pCount].z  // particle.z += dirs[pCount].z
        }
        this.object.geometry.attributes.position.needsUpdate = true
      }
    }
  }

  return instance
}

// Main explosion scene component
function ExplosionScene() {
  const { camera, gl, scene } = useThree()
  const [isInitialized, setIsInitialized] = useState(false)
  const partsRef = useRef<ExplodeAnimationInstance[]>([])

  // Set up camera like the original
  useEffect(() => {
    camera.position.set(0, 0, 1000)
    camera.far = 10000
    camera.updateProjectionMatrix()
  }, [camera])

  // Handle click events exactly like original
  const handleClick = useCallback((event: MouseEvent) => {
    event.preventDefault()
    const explosion = createExplodeAnimation(
      (Math.random() * sizeRandomness) - (sizeRandomness / 2),
      (Math.random() * sizeRandomness) - (sizeRandomness / 2),
      scene
    )
    partsRef.current.push(explosion)
  }, [scene])

  // Global render loop like the original
  useFrame(() => {
    let pCount = partsRef.current.length
    while(pCount--) {
      partsRef.current[pCount].update()
    }
  })

  // Add event listeners
  useEffect(() => {
    const canvas = gl.domElement
    canvas.addEventListener('mousedown', handleClick)

    return () => {
      canvas.removeEventListener('mousedown', handleClick)
    }
  }, [gl, handleClick])

  // Initial explosion like original - only on client side
  useEffect(() => {
    if (!isInitialized && typeof window !== 'undefined') {
      const initialExplosion = createExplodeAnimation(0, 0, scene)
      partsRef.current.push(initialExplosion)
      setIsInitialized(true)
    }
  }, [scene, isInitialized])

  return null // No JSX needed, we're directly adding to scene
}

interface HeroSectionExplosionProps {
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

export default function HeroSectionExplosion({ lang }: HeroSectionExplosionProps) {
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
    <>
      {/* CSS from the original code */}
      <style jsx>{`
        .explosion-canvas {
          background-color: #000000;
          margin: 0px;
          padding: 0;
          overflow: hidden;
        }
        .explosion-info {
          background-color: #ffffff;
          position: absolute;
          font-family: "Times New Roman";
          font-size: 12px;
          font-weight: bold;
          min-width: 300px;
          text-align: center;
          right: 5px;
          top: 5px;
          opacity: 0.5;
          z-index: 30;
        }
      `}</style>

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

        {/* Three.js Canvas with explosion animation */}
        <div className="absolute inset-0 z-10">
          {isClient && (
            <Canvas
              className="explosion-canvas"
              camera={{ fov: 75, position: [0, 0, 1000], far: 10000 }}
              gl={{
                antialias: true,
                alpha: true,
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.5
              }}
              dpr={[1, 2]}
            >
              <color attach="background" args={['#000000']} />
              <ExplosionScene />
              <Environment preset="sunset" />
            </Canvas>
          )}
        </div>

        {/* Info box from original */}
        <div className="explosion-info">
          Click to create explosions
        </div>

        {/* UI Content */}
        <div className="relative z-20 flex flex-col justify-end items-center h-full text-center text-white px-4 pb-20">
          <div className="max-w-5xl mx-auto">
            {/* Location Badge */}
            <div className="hero-ui-element inline-flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/30 rounded-full px-6 py-3 mb-8 text-white shadow-2xl">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-semibold drop-shadow-lg">Pueblo Mágico · Morelos, México</span>
            </div>

            {/* Title */}
            <div className="hero-ui-element mb-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-white drop-shadow-2xl">
                {t.title}
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl mb-8 max-w-4xl mx-auto font-medium leading-relaxed text-white drop-shadow-xl">
                {t.subtitle}
              </p>
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
    </>
  )
}