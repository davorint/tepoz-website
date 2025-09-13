'use client'

import React, { useRef, useMemo, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { 
  OrbitControls, 
  PerspectiveCamera,
  Float,
  MeshWobbleMaterial,
  Center,
  MeshTransmissionMaterial
} from '@react-three/drei'
import { 
  EffectComposer, 
  Bloom
} from '@react-three/postprocessing'
import * as THREE from 'three'

// Ultra-premium vertex shader with multiple effects
const ultraVertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uHover;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying float vDisplacement;
  
  //	Simplex 3D Noise 
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

  float snoise(vec3 v){ 
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;
    
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1. + 3.0 * C.xxx;
    
    i = mod(i, 289.0 ); 
    vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
           
    float n_ = 1.0/7.0;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );
    
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                  dot(p2,x2), dot(p3,x3) ) );
  }
  
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    
    vec3 pos = position;
    
    // Multi-layered displacement
    float noiseValue = snoise(vec3(pos.x * 2.0, pos.y * 2.0, uTime * 0.5));
    
    // Mouse interaction
    vec2 mouseInfluence = (uMouse - 0.5) * 2.0;
    float mouseDistance = length(uv - 0.5 - mouseInfluence * 0.1);
    float mouseEffect = smoothstep(0.5, 0.0, mouseDistance) * uHover;
    
    // Combined displacement
    float displacement = noiseValue * 0.3 + mouseEffect * 0.5;
    pos += normal * displacement;
    
    // Wave distortion
    pos.x += sin(pos.y * 4.0 + uTime * 2.0) * 0.1;
    pos.y += cos(pos.x * 4.0 + uTime * 2.0) * 0.1;
    
    vDisplacement = displacement;
    vPosition = pos;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

// Ultra-premium fragment shader with advanced effects
const ultraFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform float uHover;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying float vDisplacement;
  
  vec3 palette(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263, 0.416, 0.557);
    
    return a + b * cos(6.28318 * (c * t + d));
  }
  
  void main() {
    // Gradient based on displacement and position
    vec3 color1 = mix(uColor1, uColor2, vDisplacement + 0.5);
    vec3 baseColor = mix(color1, uColor3, abs(vDisplacement));
    
    // Iridescent effect
    float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
    vec3 iridescentColor = palette(fresnel + uTime * 0.1 + vDisplacement);
    
    // Holographic shimmer
    float shimmer = sin(vPosition.x * 10.0 + uTime * 5.0) * 
                   sin(vPosition.y * 10.0 + uTime * 3.0);
    vec3 shimmerColor = vec3(shimmer * 0.5 + 0.5) * vec3(0.3, 0.6, 1.0);
    
    // Combine all effects
    vec3 finalColor = baseColor;
    finalColor = mix(finalColor, iridescentColor, fresnel * 0.3);
    finalColor += shimmerColor * 0.1;
    finalColor *= (1.0 + uHover * 0.2);
    
    // Energy pulse
    float pulse = sin(uTime * 3.0) * 0.5 + 0.5;
    finalColor += vec3(0.1, 0.2, 0.3) * pulse * vDisplacement;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`

// Interactive morphing sphere - Simplified for stability
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function MorphingSphere({ mouse }: { mouse: THREE.Vector2 }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const [hovered, setHovered] = useState<boolean>(false)
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uHover: { value: 0 },
    uColor1: { value: new THREE.Color('#00ffff') },
    uColor2: { value: new THREE.Color('#ff00ff') },
    uColor3: { value: new THREE.Color('#ffff00') }
  }), [])
  
  useFrame((state) => {
    try {
      if (!materialRef.current || !state?.clock) return
      
      const material = materialRef.current
      if (!material.uniforms) return
      
      if (material.uniforms.uTime) material.uniforms.uTime.value = state.clock.elapsedTime
      if (material.uniforms.uMouse && mouse) {
        material.uniforms.uMouse.value.lerp(mouse, 0.1)
      }
      if (material.uniforms.uHover) {
        material.uniforms.uHover.value = THREE.MathUtils.lerp(
          material.uniforms.uHover.value,
          hovered ? 1 : 0,
          0.1
        )
      }
      
      if (meshRef.current && meshRef.current.rotation) {
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      }
    } catch (error) {
      console.warn('MorphingSphere useFrame error:', error)
    }
  })
  
  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered === true ? 1.2 : 1}
    >
      <icosahedronGeometry args={[2, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={ultraVertexShader}
        fragmentShader={ultraFragmentShader}
        uniforms={uniforms}
        wireframe={false}
        transparent
      />
    </mesh>
  )
}

// Fireball shader - Based on Shadertoy 3clfDH
const fireballVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fireballFragmentShader = `
  #define PI 3.141596
  #define S smoothstep
  #define s1(v) (sin(v)*.5+.5)
  const float EPSILON = 1e-5;
  
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  
  mat2 rotate(float a){
    float s = sin(a);
    float c = cos(a);
    return mat2(c,-s,s,c);
  }
  
  float fbm(vec3 p){
    float amp = 1.;
    float fre = 1.;
    float n = 0.;
    for(float i = 0.;i<4.;i++){
      n += abs(dot(cos(p*fre), vec3(.1,.2,.3))) * amp;
      amp *= .9;
      fre *= 1.3;
      p.xz *= rotate(p.y*.1-uTime*2.);
      p.y -= uTime*4.;
    }
    return n;
  }
  
  float sdVerticalCapsule( vec3 p, float h, float r ) {
    p.y -= clamp( p.y, 0.0, h );
    return length( p ) - r;
  }
  
  vec3 col = vec3(0);
  
  float sdFireBall(vec3 p, float r, float h){
    vec3 q = p;
    float range = S(h,0.,p.y);
    r = range*r;
    float d = sdVerticalCapsule(q, h, r);
    d += fbm(q*3.)*.4/range;
    
    d = abs(d)*.1 + .01;
    
    vec3 c = s1(vec3(3,2,1)+(p.y+p.z)*.5-uTime*2.);
    col += pow(1.3/d, 2.) * c;
    
    return d;
  }
  
  void main() {
    vec2 R = uResolution.xy;
    vec2 I = vUv * R;
    vec2 uv = (I*2.-R)/R.y;
    vec2 m = (uMouse.xy*2.-vec2(0.5))/vec2(1.0) * PI * 2.;
    
    col = vec3(0);
    
    vec3 ro = vec3(0.,0.,-6.);
    vec3 rd = normalize(vec3(uv, 1.));
    
    float zMax = 10.;
    float z = .1;
    
    vec3 p;
    for(float i=0.;i<100.;i++){
      p = ro + rd * z;
      p.y += 2.;
      
      if(length(uMouse) > 0.1){
        p.xz *= rotate(m.x * 0.5);
        p.yz *= rotate(m.y * 0.5);
      }
      
      float r = 2.;
      float h = 10.;
      vec3 q = p;
      float d = sdFireBall(q, r, h);
      
      if(d<EPSILON || z>zMax) break;
      z += d;
    }
    
    col = tanh(col / 9e4);
    
    gl_FragColor = vec4(col, 1.0);
  }
`

// Premium Crystal Sphere with transmission
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function CrystalSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    try {
      if (!meshRef.current || !state?.clock) return
      if (!meshRef.current.rotation || !meshRef.current.position) return
      
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.5 + 2
    } catch (error) {
      console.warn('CrystalSphere animation error:', error)
    }
  })
  
  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={2}>
      <mesh ref={meshRef} position={[3, 2, -1]} scale={0.8}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshTransmissionMaterial
          backside
          samples={32}
          resolution={1024}
          transmission={1}
          roughness={0}
          thickness={2}
          ior={1.8}
          chromaticAberration={0.08}
          anisotropy={0.3}
          distortion={0.2}
          distortionScale={0.5}
          temporalDistortion={0.8}
          clearcoat={1}
          attenuationDistance={2}
          attenuationColor="#00ffff"
          color="#ffffff"
        />
      </mesh>
    </Float>
  )
}

// Premium 3D Text
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function PremiumText() {
  const textRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    try {
      if (!textRef.current) return
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2 + 3
    } catch (error) {
      console.warn('PremiumText animation error:', error)
    }
  })
  
  return (
    <Center position={[0, 3, -3]}>
      <mesh ref={textRef} scale={[1.5, 1.5, 1.5]}>
        <boxGeometry args={[3, 0.8, 0.3]} />
        <meshStandardMaterial 
          color="#ffffff"
          metalness={1}
          roughness={0.05}
          emissive="#0066ff"
          emissiveIntensity={0.3}
        />
      </mesh>
    </Center>
  )
}

function Fireball({ mouse }: { mouse: THREE.Vector2 }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(1024, 1024) },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) }
  }), [])
  
  useFrame((state) => {
    try {
      if (!materialRef.current || !state?.clock) return
      
      const material = materialRef.current
      if (!material.uniforms) return
      
      if (material.uniforms.uTime) material.uniforms.uTime.value = state.clock.elapsedTime
      if (material.uniforms.uMouse && mouse) {
        material.uniforms.uMouse.value.copy(mouse)
      }
      
      if (meshRef.current && meshRef.current.rotation) {
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
      }
    } catch (error) {
      console.warn('Fireball animation error:', error)
    }
  })
  
  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <planeGeometry args={[4, 4]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={fireballVertexShader}
        fragmentShader={fireballFragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// Mirror tunnel - Simplified
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function MirrorTunnel() {
  const tunnelRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    try {
      if (!tunnelRef.current || !state?.clock) return
      if (!tunnelRef.current.rotation) return
      
      tunnelRef.current.rotation.z = state.clock.elapsedTime * 0.05
    } catch (error) {
      console.warn('MirrorTunnel animation error:', error)
    }
  })
  
  return (
    <group ref={tunnelRef}>
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={i} position={[0, 0, -i * 3]}>
          <torusGeometry args={[3 - i * 0.2, 0.3, 16, 32]} />
          <MeshWobbleMaterial
            color={new THREE.Color().setHSL(i * 0.1, 1, 0.5)}
            speed={1}
            factor={0.3}
            emissive={new THREE.Color().setHSL(i * 0.1, 1, 0.2)}
          />
        </mesh>
      ))}
    </group>
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

// Error boundary component
interface ErrorBoundaryState {
  hasError: boolean
}

interface ErrorBoundaryProps {
  children: React.ReactNode
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class ThreeErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(_: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Three.js component error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return null // Silently fail individual components
    }

    return this.props.children
  }
}

// Main premium scene
export default function PremiumScene() {
  const [mouse, setMouse] = useState(new THREE.Vector2(0.5, 0.5))
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    setIsClient(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      try {
        if (!e || !window) return
        setMouse(new THREE.Vector2(
          e.clientX / window.innerWidth,
          e.clientY / window.innerHeight
        ))
      } catch (error) {
        console.warn('Mouse move handler error:', error)
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
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
            premultipliedAlpha: false,
            toneMapping: THREE.ACESFilmicToneMapping,
            outputColorSpace: THREE.SRGBColorSpace
          }}
          onError={(error) => {
            console.error('Three.js Canvas error:', error)
          }}
        >
          <color attach="background" args={['#000000']} />
          <fog attach="fog" args={['#000000', 8, 25]} />
          
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={75} />
          
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#00ffff" />
          <pointLight position={[-10, -10, -5]} intensity={1} color="#ff00ff" />
          
          {/* Only Fireball enabled for testing */}
          <Fireball mouse={mouse} />
          
          {/* Minimal lighting for fireball */}
          
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
            autoRotate
            autoRotateSpeed={0.3}
          />
          
          {/* Minimal effects for fireball */}
          <EffectComposer multisampling={4}>
            <Bloom
              intensity={2}
              luminanceThreshold={0.1}
              luminanceSmoothing={0.9}
              radius={0.8}
            />
          </EffectComposer>
        </Canvas>
      </Suspense>
    </div>
  )
}