'use client'

import React, { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
{/* OrbitControls removed - fireball as static background */}
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

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

function SimpleFireball({ mouse }: { mouse: THREE.Vector2 }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(1024, 1024) },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) }
  }), [])
  
  useFrame((state) => {
    if (materialRef.current && state?.clock) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
      if (mouse) {
        materialRef.current.uniforms.uMouse.value.copy(mouse)
      }
    }
    
    // Keep mouse interaction but no auto-rotation
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })
  
  return (
    <mesh ref={meshRef} position={[0, 1, -1]}>
      <planeGeometry args={[6, 6]} />
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

export default function FireballOnlyScene() {
  const [mouse, setMouse] = useState(new THREE.Vector2(0.5, 0.5))
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMouse(new THREE.Vector2(
        e.clientX / window.innerWidth,
        e.clientY / window.innerHeight
      ))
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  if (!isClient) {
    return <div className="w-full h-full bg-transparent" />
  }
  
  return (
    <div className="w-full h-full">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
      >
        {/* Transparent background for positioning above title */}
        
        <ambientLight intensity={0.2} />
        
        <SimpleFireball mouse={mouse} />
        
{/* Fireball as static background - no controls */}
        
        <EffectComposer multisampling={4}>
          <Bloom
            intensity={2}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            radius={0.8}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}