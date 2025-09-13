'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform vec3 iResolution;
  uniform float iTime;
  uniform float iTimeDelta;
  uniform float iFrameRate;
  uniform int iFrame;
  uniform float iChannelTime[4];
  uniform vec3 iChannelResolution[4];
  uniform vec4 iMouse;
  uniform vec4 iDate;
  uniform float iSampleRate;
  
  varying vec2 vUv;

  // A simple and really efficient way to create color variation.
  // https://iquilezles.org/articles/palettes
  vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
  {
      return a + b*cos( 6.28318*(c*t+d) );
  }

  void mainImage( out vec4 fragColor, in vec2 fragCoord )
  {
      vec2 p = fragCoord.xy / iResolution.xy;
      
      // animate
      p.x += 0.01*iTime;
      
      // compute colors
      vec3 col = pal( p.x, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.33,0.67) );
      if( p.y>(1.0/7.0) ) col = pal( p.x, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20) );
      if( p.y>(2.0/7.0) ) col = pal( p.x, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.3,0.20,0.20) );
      if( p.y>(3.0/7.0) ) col = pal( p.x, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,0.5),vec3(0.8,0.90,0.30) );
      if( p.y>(4.0/7.0) ) col = pal( p.x, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,0.7,0.4),vec3(0.0,0.15,0.20) );
      if( p.y>(5.0/7.0) ) col = pal( p.x, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(2.0,1.0,0.0),vec3(0.5,0.20,0.25) );
      if( p.y>(6.0/7.0) ) col = pal( p.x, vec3(0.8,0.5,0.4),vec3(0.2,0.4,0.2),vec3(2.0,1.0,1.0),vec3(0.0,0.25,0.25) );
      
      // band
      float f = fract(p.y*7.0);
      // borders
      col *= smoothstep( 0.49, 0.47, abs(f-0.5) );
      // shadowing
      col *= 0.5 + 0.5*sqrt(4.0*f*(1.0-f));

      fragColor = vec4( col, 1.0 );
  }

  void main() {
    vec2 fragCoord = vUv * iResolution.xy;
    vec4 fragColor;
    mainImage(fragColor, fragCoord);
    gl_FragColor = fragColor;
  }
`

function ColorPalette() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const { viewport } = useThree()
  
  const uniforms = useMemo(() => ({
    iResolution: { value: new THREE.Vector3(1366, 300, 1) },
    iTime: { value: 0 },
    iTimeDelta: { value: 0 },
    iFrameRate: { value: 60 },
    iFrame: { value: 0 },
    iChannelTime: { value: [0, 0, 0, 0] },
    iChannelResolution: { value: [
      new THREE.Vector3(1366, 300, 1),
      new THREE.Vector3(1366, 300, 1),
      new THREE.Vector3(1366, 300, 1),
      new THREE.Vector3(1366, 300, 1)
    ]},
    iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },
    iDate: { value: new THREE.Vector4(2025, 1, 1, 0) },
    iSampleRate: { value: 44100 }
  }), [])
  
  useFrame((state) => {
    if (materialRef.current && state?.clock) {
      materialRef.current.uniforms.iTime.value = state.clock.elapsedTime
      materialRef.current.uniforms.iTimeDelta.value = state.clock.getDelta()
      materialRef.current.uniforms.iFrame.value += 1
      
      // Update date
      const now = new Date()
      materialRef.current.uniforms.iDate.value.set(
        now.getFullYear(),
        now.getMonth() + 1,
        now.getDate(),
        now.getTime() / 1000
      )
    }
  })
  
  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

interface ColorPaletteShaderProps {
  width?: number
  height?: number
  className?: string
}

export default function ColorPaletteShader({ 
  width, 
  height = 250, 
  className = "" 
}: ColorPaletteShaderProps) {
  return (
    <div 
      className={`pointer-events-none ${className}`}
      style={{ 
        width: width ? `${width}px` : '100%',
        height: `${height}px`,
        position: 'relative',
        zIndex: 1
      }}
    >
      <Canvas
        dpr={[1, 2]}
        orthographic
        camera={{ zoom: 1, position: [0, 0, 1] }}
        gl={{
          antialias: true,
          alpha: false,
        }}
      >
        <ColorPalette />
      </Canvas>
    </div>
  )
}