'use client'

import { useRef, useMemo, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text3D, Center, Float, OrbitControls, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { Button } from '@/components/ui/button'
import { Play, MapPin, Calendar, Users } from 'lucide-react'
import { Locale } from '@/lib/i18n'


// Particle system for text explosion
function ParticleExplosion({ position = [0, 0, 0] }: { text: string; position?: [number, number, number] }) {
  const particlesRef = useRef<THREE.Points>(null)

  const particleCount = 5000

  const [positions, velocities, colors, sizes, lifetimes] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    const vel = new Float32Array(particleCount * 3)
    const col = new Float32Array(particleCount * 3)
    const siz = new Float32Array(particleCount)
    const life = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3

      // Initial positions around text
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * 2
      pos[i3] = Math.cos(angle) * radius
      pos[i3 + 1] = (Math.random() - 0.5) * 2
      pos[i3 + 2] = Math.sin(angle) * radius

      // Velocities for explosion
      vel[i3] = (Math.random() - 0.5) * 0.1
      vel[i3 + 1] = Math.random() * 0.1
      vel[i3 + 2] = (Math.random() - 0.5) * 0.1

      // Random colors
      const colorChoice = Math.random()
      if (colorChoice < 0.33) {
        col[i3] = 1.0 // R
        col[i3 + 1] = 0.42 // G
        col[i3 + 2] = 0.42 // B
      } else if (colorChoice < 0.66) {
        col[i3] = 0.31
        col[i3 + 1] = 0.8
        col[i3 + 2] = 0.77
      } else {
        col[i3] = 1.0
        col[i3 + 1] = 0.9
        col[i3 + 2] = 0.43
      }

      siz[i] = Math.random() * 10 + 5
      life[i] = Math.random()
    }

    return [pos, vel, col, siz, life]
  }, [])

  useFrame((state) => {
    if (!particlesRef.current) return

    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
    const velocities = particlesRef.current.geometry.attributes.velocity.array as Float32Array
    const lifetimes = particlesRef.current.geometry.attributes.lifetime.array as Float32Array

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3

      // Update positions
      positions[i3] += velocities[i3]
      positions[i3 + 1] += velocities[i3 + 1]
      positions[i3 + 2] += velocities[i3 + 2]

      // Apply gravity
      velocities[i3 + 1] -= 0.001

      // Update lifetime
      lifetimes[i] -= 0.005

      // Reset particle if lifetime is over
      if (lifetimes[i] <= 0) {
        const angle = Math.random() * Math.PI * 2
        const radius = Math.random() * 2
        positions[i3] = Math.cos(angle) * radius
        positions[i3 + 1] = (Math.random() - 0.5) * 2
        positions[i3 + 2] = Math.sin(angle) * radius

        velocities[i3] = (Math.random() - 0.5) * 0.1
        velocities[i3 + 1] = Math.random() * 0.1
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.1

        lifetimes[i] = 1
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true
    particlesRef.current.geometry.attributes.velocity.needsUpdate = true
    particlesRef.current.geometry.attributes.lifetime.needsUpdate = true

    // Rotate entire system
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
  })

  return (
    <points ref={particlesRef} position={position}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} args={[positions, 3]} />
        <bufferAttribute attach="attributes-velocity" count={particleCount} array={velocities} itemSize={3} args={[velocities, 3]} />
        <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" count={particleCount} array={sizes} itemSize={1} args={[sizes, 1]} />
        <bufferAttribute attach="attributes-lifetime" count={particleCount} array={lifetimes} itemSize={1} args={[lifetimes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

// Animated 3D text with dissolve effect
function AnimatedText3D({ text, isMain = false }: { text: string; isMain?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const { viewport } = useThree()

  const [fontUrl, setFontUrl] = useState<string | null>(null)

  useEffect(() => {
    // Use CDN font directly to avoid path issues
    setFontUrl('https://cdn.jsdelivr.net/npm/three@0.179.1/examples/fonts/helvetiker_bold.typeface.json')
  }, [])

  useGSAP(() => {
    if (!materialRef.current) return

    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      defaults: { duration: 3, ease: "power2.inOut" }
    })

    tl.to(materialRef.current.uniforms.uProgress, {
      value: 0.8,
      duration: 4,
      ease: "power3.inOut"
    })
    .to(materialRef.current.uniforms.uProgress, {
      value: 0,
      duration: 4,
      ease: "power3.inOut"
    })

    // Color animation
    gsap.to(materialRef.current.uniforms.uColorA.value, {
      r: 0.31,
      g: 0.8,
      b: 0.77,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })

    gsap.to(materialRef.current.uniforms.uColorB.value, {
      r: 1,
      g: 0.9,
      b: 0.43,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })
  }, [])

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }

    if (meshRef.current && isMain) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
    }
  })

  if (!fontUrl) return null

  return (
    <Center>
      <Float speed={isMain ? 1 : 2} rotationIntensity={isMain ? 0.1 : 0.2} floatIntensity={isMain ? 0.3 : 0.5}>
        <Text3D
          ref={meshRef}
          font={fontUrl}
          size={isMain ? viewport.width / 15 : viewport.width / 25}
          height={0.2}
          curveSegments={32}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.01}
          bevelOffset={0}
          bevelSegments={8}
        >
          {text}
          <shaderMaterial
            ref={materialRef}
            vertexShader={`
              varying vec2 vUv;
              varying vec3 vPosition;
              varying vec3 vNormal;

              void main() {
                vUv = uv;
                vPosition = position;
                vNormal = normal;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `}
            fragmentShader={`
              uniform float uTime;
              uniform float uProgress;
              uniform float uNoiseScale;
              uniform vec3 uColorA;
              uniform vec3 uColorB;
              uniform vec3 uColorC;
              uniform float uDissolveThreshold;
              uniform float uEdgeWidth;
              uniform vec3 uEdgeColor;

              varying vec2 vUv;
              varying vec3 vPosition;
              varying vec3 vNormal;

              // Simplex noise function
              vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
              vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
              vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
              vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

              float snoise(vec3 v) {
                const vec2 C = vec2(1.0/6.0, 1.0/3.0);
                const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

                vec3 i = floor(v + dot(v, C.yyy));
                vec3 x0 = v - i + dot(i, C.xxx);

                vec3 g = step(x0.yzx, x0.xyz);
                vec3 l = 1.0 - g;
                vec3 i1 = min(g.xyz, l.zxy);
                vec3 i2 = max(g.xyz, l.zxy);

                vec3 x1 = x0 - i1 + C.xxx;
                vec3 x2 = x0 - i2 + C.yyy;
                vec3 x3 = x0 - D.yyy;

                i = mod289(i);
                vec4 p = permute(permute(permute(
                  i.z + vec4(0.0, i1.z, i2.z, 1.0))
                  + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                  + i.x + vec4(0.0, i1.x, i2.x, 1.0));

                float n_ = 0.142857142857;
                vec3 ns = n_ * D.wyz - D.xzx;

                vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

                vec4 x_ = floor(j * ns.z);
                vec4 y_ = floor(j - 7.0 * x_);

                vec4 x = x_ *ns.x + ns.yyyy;
                vec4 y = y_ *ns.x + ns.yyyy;
                vec4 h = 1.0 - abs(x) - abs(y);

                vec4 b0 = vec4(x.xy, y.xy);
                vec4 b1 = vec4(x.zw, y.zw);

                vec4 s0 = floor(b0)*2.0 + 1.0;
                vec4 s1 = floor(b1)*2.0 + 1.0;
                vec4 sh = -step(h, vec4(0.0));

                vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
                vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

                vec3 p0 = vec3(a0.xy, h.x);
                vec3 p1 = vec3(a0.zw, h.y);
                vec3 p2 = vec3(a1.xy, h.z);
                vec3 p3 = vec3(a1.zw, h.w);

                vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
                p0 *= norm.x;
                p1 *= norm.y;
                p2 *= norm.z;
                p3 *= norm.w;

                vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
                m = m * m;
                return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
              }

              void main() {
                // Create noise-based dissolve pattern
                vec3 noiseCoord = vPosition * uNoiseScale + vec3(uTime * 0.2);
                float noise = snoise(noiseCoord) * 0.5 + 0.5;

                // Dissolve based on progress
                float dissolve = step(uProgress, noise);

                // Edge glow effect
                float edge = 1.0 - smoothstep(uProgress - uEdgeWidth, uProgress, noise);
                edge *= smoothstep(uProgress - uEdgeWidth * 2.0, uProgress - uEdgeWidth, noise);

                // Color mixing based on position and time
                vec3 color = mix(uColorA, uColorB, vUv.x);
                color = mix(color, uColorC, sin(uTime + vPosition.y * 2.0) * 0.5 + 0.5);

                // Add edge color
                color = mix(color, uEdgeColor, edge * 2.0);

                // Holographic effect
                float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
                color += fresnel * 0.3;

                // Output with alpha
                gl_FragColor = vec4(color, dissolve);

                if(dissolve < 0.01) discard;
              }
            `}
            uniforms={{
              uTime: { value: 0 },
              uProgress: { value: 0 },
              uNoiseScale: { value: 4 },
              uColorA: { value: new THREE.Color('#ff6b6b') },
              uColorB: { value: new THREE.Color('#4ecdc4') },
              uColorC: { value: new THREE.Color('#ffe66d') },
              uDissolveThreshold: { value: 0.5 },
              uEdgeWidth: { value: 0.1 },
              uEdgeColor: { value: new THREE.Color('#ffffff') }
            }}
            transparent
            side={THREE.DoubleSide}
          />
        </Text3D>
      </Float>
    </Center>
  )
}

// Main Three.js scene
function ThreeTextScene({ title, subtitle }: { title: string; subtitle: string }) {
  const sceneRef = useRef<THREE.Group>(null)

  return (
    <group ref={sceneRef}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[0, 0, 5]} intensity={2} color="#4ecdc4" />
      <pointLight position={[-5, 5, -5]} intensity={1.5} color="#ff6b6b" />

      <Suspense fallback={null}>
        <AnimatedText3D text={title} isMain />
        <group position={[0, -1.5, 0]}>
          <AnimatedText3D text={subtitle} />
        </group>
      </Suspense>

      <ParticleExplosion text={title} position={[0, 0, -2]} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />

      <Environment preset="sunset" />
    </group>
  )
}

interface HeroSectionThreeProps {
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

export default function HeroSectionThree({ lang }: HeroSectionThreeProps) {
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
              backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
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
          >
            <ThreeTextScene
              title={t.title}
              subtitle={t.subtitle}
            />
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