'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Float, Text, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// Vertex shader for terrain
const terrainVertexShader = `
  uniform float uTime;
  uniform float uElevation;
  varying vec2 vUv;
  varying float vElevation;
  
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }
  
  void main() {
    vUv = uv;
    
    vec3 pos = position;
    float elevation = sin(pos.x * 0.5 + uTime * 0.5) * 0.5;
    elevation += sin(pos.z * 0.3 + uTime * 0.3) * 0.3;
    elevation *= uElevation;
    
    pos.y += elevation;
    vElevation = elevation;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

// Fragment shader for terrain
const terrainFragmentShader = `
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  varying vec2 vUv;
  varying float vElevation;
  
  void main() {
    vec3 color = mix(uColorA, uColorB, vElevation * 2.0);
    color = mix(color, uColorC, vElevation * 3.0);
    
    // Add shimmer effect
    float shimmer = sin(uTime * 2.0 + vUv.x * 10.0) * 0.1 + 0.9;
    color *= shimmer;
    
    gl_FragColor = vec4(color, 1.0);
  }
`

// Particle vertex shader
const particleVertexShader = `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aScale;
  attribute vec3 aRandomness;
  varying vec3 vColor;
  
  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    // Animate particles
    modelPosition.y += sin(uTime + aRandomness.x * 100.0) * 0.2;
    modelPosition.x += cos(uTime + aRandomness.y * 100.0) * 0.2;
    modelPosition.z += sin(uTime + aRandomness.z * 100.0) * 0.2;
    
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectedPosition;
    gl_PointSize = aScale * 50.0 * uPixelRatio;
    gl_PointSize *= (1.0 / - viewPosition.z);
    
    vColor = vec3(1.0, 0.8, 0.5);
  }
`

// Particle fragment shader
const particleFragmentShader = `
  varying vec3 vColor;
  
  void main() {
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 0.05 / distanceToCenter - 0.1;
    strength = clamp(strength, 0.0, 1.0);
    
    vec3 color = mix(vec3(0.0), vColor, strength);
    gl_FragColor = vec4(color, strength);
  }
`

// Animated terrain component
function AnimatedTerrain() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uElevation: { value: 1.0 },
    uColorA: { value: new THREE.Color('#00b4d8') },
    uColorB: { value: new THREE.Color('#90e0ef') },
    uColorC: { value: new THREE.Color('#caf0f8') }
  }), [])
  
  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[20, 20, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={terrainVertexShader}
        fragmentShader={terrainFragmentShader}
        uniforms={uniforms}
        wireframe={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// Magical particles
function MagicalParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  useThree()
  
  const [positions, scales, randomness] = useMemo(() => {
    const count = 1000
    const positions = new Float32Array(count * 3)
    const scales = new Float32Array(count)
    const randomness = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 20
      positions[i3 + 1] = Math.random() * 10
      positions[i3 + 2] = (Math.random() - 0.5) * 20
      
      scales[i] = Math.random()
      
      randomness[i3] = Math.random()
      randomness[i3 + 1] = Math.random()
      randomness[i3 + 2] = Math.random()
    }
    
    return [positions, scales, randomness]
  }, [])
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uPixelRatio: { value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1 }
  }), [])
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aScale"
          count={scales.length}
          array={scales}
          itemSize={1}
          args={[scales, 1]}
        />
        <bufferAttribute
          attach="attributes-aRandomness"
          count={randomness.length / 3}
          array={randomness}
          itemSize={3}
          args={[randomness, 3]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Crystal orb with refraction
function CrystalOrb() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2 + 2
    }
  })
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 2, 0]}>
        <icosahedronGeometry args={[1.5, 4]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={512}
          transmission={1}
          roughness={0.0}
          thickness={0.5}
          ior={1.5}
          chromaticAberration={0.06}
          anisotropy={0.1}
          distortion={0.0}
          distortionScale={0.3}
          temporalDistortion={0.5}
          clearcoat={1}
          attenuationDistance={0.5}
          attenuationColor="#90e0ef"
          color="#caf0f8"
        />
      </mesh>
    </Float>
  )
}

// 3D Text
function FloatingText() {
  const textRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 + 4
    }
  })
  
  return (
    <Text
      ref={textRef}
      position={[0, 4, -2]}
      fontSize={1.5}
      color="#ffffff"
      anchorX="center"
      anchorY="middle"
      font="/fonts/inter-bold.woff"
    >
      TEPOZTLÁN
      <meshBasicMaterial toneMapped={false}>
        <color attach="color" args={['#ffffff']} />
      </meshBasicMaterial>
    </Text>
  )
}

export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useGSAP(() => {
    if (!containerRef.current) return
    
    // GSAP ScrollTrigger animations
    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        pin: true
      }
    })
  }, { scope: containerRef })
  
  return (
    <div ref={containerRef} className="h-[120vh] w-[120vw] relative scale-125 origin-center">
      <Canvas
        camera={{ position: [0, 5, 10], fov: 75 }}
        gl={{ 
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
      >
        <color attach="background" args={['#0a0a0a']} />
        <fog attach="fog" args={['#0a0a0a', 10, 30]} />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[0, 5, 0]} intensity={2} color="#90e0ef" />
        
        <AnimatedTerrain />
        <MagicalParticles />
        <CrystalOrb />
        <FloatingText />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 6}
        />
      </Canvas>
      
    </div>
  )
}