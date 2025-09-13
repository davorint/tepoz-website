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
  uniform sampler2D iChannel0;
  
  varying vec2 vUv;

  // The MIT License
  // https://www.youtube.com/c/InigoQuilez
  // https://iquilezles.org/
  // Copyright © 2015 Inigo Quilez
  // A simple way to create color variation in a cheap way (yes, trigonometrics ARE cheap
  // in the GPU, don't try to be smart and use a triangle wave instead).
  // See https://iquilezles.org/articles/palettes for more information

  vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
  {
      return a + b*cos( 6.28318*(c*t+d) );
  }

  void mainImage( out vec4 fragColor, in vec2 fragCoord )
  {
      vec2 p = fragCoord.xy / iResolution.xy;
      
      // animate
      p.x += 0.04*iTime;
      
      // compute colors
      vec3 col = pal( p.x, vec3(0.02,0.686,0.949),vec3(0.2,0.2,0.2),vec3(1.5,0.5,1.5),vec3(1.0,1.0,1.0) );
      if( p.y>(1.0/7.0) ) col = pal( p.x, vec3(1.0,0.325,0.063),vec3(0.2,0.5,0.2),vec3(1.0,1.0,1.0),vec3(0.5,0.5,0.8) );
      if( p.y>(2.0/7.0) ) col = pal( p.x, vec3(0.759,0.067,0.09),vec3(0.8,0.1,0.063),vec3(1.0,0.0,0.5),vec3(0.5,0.5,0.5) );
      if( p.y>(3.0/7.0) ) col = pal( p.x, vec3(0.055,0.151,0.182),vec3(0.0,0.204,0.212),vec3(0.5,0.5,0.5),vec3(0.,0.,0.0) );
      if( p.y>(4.0/7.0) ) col = pal( p.x, vec3(0.,0.545,0.918),vec3(0.,0.5,0.5),vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5) );
      if( p.y>(5.0/7.0) ) col = pal( p.x, vec3(0.671,0.525,0.353),vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5) );
      if( p.y>(6.0/7.0) ) col = pal( p.x, vec3(0.435,0.478,0.008),vec3(0.4,0.5,0.8),vec3(1.0,1.0,0.6),vec3(0.5,0.5,1.0) );
      

      // band
      float f = fract(p.y*7.0);
      // borders
      col *= smoothstep( 0.49, 0.47, abs(f-0.5) );
      // shadowing
      col *= 0.7 + 0.3*sqrt(4.0*f*(1.0-f));
      // Note: dithering removed as texture sampling requires specific setup

      fragColor = vec4( col, 1.0 );
  }

  void main() {
    vec2 fragCoord = vUv * iResolution.xy;
    vec4 fragColor;
    mainImage(fragColor, fragCoord);
    gl_FragColor = fragColor;
  }
`

function TurangiPalette() {
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
    iSampleRate: { value: 44100 },
    iChannel0: { value: null }
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

interface TurangiShaderProps {
  width?: number
  height?: number
  className?: string
}

export default function TurangiShader({ 
  width, 
  height = 250, 
  className = "" 
}: TurangiShaderProps) {
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
        <TurangiPalette />
      </Canvas>
    </div>
  )
}