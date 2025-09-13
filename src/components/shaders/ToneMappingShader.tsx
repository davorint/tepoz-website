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
  
  float gamma = 2.2;

  vec3 CustomLinearToneMapping(vec3 color)
  {
      float toneMappingExposure = 1.;
      color = clamp(toneMappingExposure * color, 0., 1.);
      color = pow(color, vec3(1. / gamma));
      return color;
  }

  vec3 CustomReinhardToneMapping(vec3 color)
  {
      float toneMappingExposure = 1.;
      color *= toneMappingExposure;
      color = color / (1. + color);
      color = pow(color, vec3(1. / gamma));
      return color;
  }

  vec3 CustomOptimizedCineonToneMapping(vec3 color)
  {
      float toneMappingExposure = 1.;
      color *= toneMappingExposure;
      color = max(vec3(0.), color - vec3(0.004));
      color = (color * (6.2 * color + .5)) / (color * (6.2 * color + 1.7) + 0.06);
      return color;
  }

  vec3 CustomRomBinDaHouseToneMapping(vec3 color)
  {
      color = exp( -1.0 / ( 2.72*color + 0.15 ) );
      color = pow(color, vec3(1. / gamma));
      return color;
  }

  vec3 CustomFilmicToneMapping(vec3 color)
  {
      color = max(vec3(0.), color - vec3(0.004));
      color = (color * (6.2 * color + .5)) / (color * (6.2 * color + 1.7) + 0.06);
      return color;
  }

  vec3 CustomUncharted2ToneMapping(vec3 color)
  {
      float A = 0.15;
      float B = 0.50;
      float C = 0.10;
      float D = 0.20;
      float E = 0.02;
      float F = 0.30;
      float W = 11.2;
      float exposure = 2.;
      color *= exposure;
      color = ((color * (A * color + C * B) + D * E) / (color * (A * color + B) + D * F)) - E / F;
      float white = ((W * (A * W + C * B) + D * E) / (W * (A * W + B) + D * F)) - E / F;
      color /= white;
      color = pow(color, vec3(1. / gamma));
      return color;
  }

  void mainImage( out vec4 fragColor, in vec2 fragCoord )
  {
      vec2 p = fragCoord.xy / iResolution.xy;
      
      // Create a test gradient with high dynamic range
      vec3 hdrColor = vec3(p.x * 4.0, sin(p.x * 10.0 + iTime) * 0.5 + 0.5, cos(p.y * 8.0 + iTime * 0.5) * 0.5 + 0.5);
      
      vec3 toneMappedColor;
      
      // Apply different tone mapping functions based on vertical position
      if (p.y < 1.0/6.0) {
          toneMappedColor = CustomLinearToneMapping(hdrColor);
      } else if (p.y < 2.0/6.0) {
          toneMappedColor = CustomReinhardToneMapping(hdrColor);
      } else if (p.y < 3.0/6.0) {
          toneMappedColor = CustomOptimizedCineonToneMapping(hdrColor);
      } else if (p.y < 4.0/6.0) {
          toneMappedColor = CustomRomBinDaHouseToneMapping(hdrColor);
      } else if (p.y < 5.0/6.0) {
          toneMappedColor = CustomFilmicToneMapping(hdrColor);
      } else {
          toneMappedColor = CustomUncharted2ToneMapping(hdrColor);
      }
      
      // Add subtle separators between tone mapping regions
      float separator = smoothstep(0.02, 0.01, abs(fract(p.y * 6.0) - 0.5) - 0.48);
      toneMappedColor *= separator;
      
      fragColor = vec4(toneMappedColor, 1.0);
  }

  void main() {
    vec2 fragCoord = vUv * iResolution.xy;
    vec4 fragColor;
    mainImage(fragColor, fragCoord);
    gl_FragColor = fragColor;
  }
`

function ToneMapping() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const { viewport } = useThree()
  
  const uniforms = useMemo(() => ({
    iResolution: { value: new THREE.Vector3(1366, 400, 1) },
    iTime: { value: 0 },
    iTimeDelta: { value: 0 },
    iFrameRate: { value: 60 },
    iFrame: { value: 0 },
    iChannelTime: { value: [0, 0, 0, 0] },
    iChannelResolution: { value: [
      new THREE.Vector3(1366, 400, 1),
      new THREE.Vector3(1366, 400, 1),
      new THREE.Vector3(1366, 400, 1),
      new THREE.Vector3(1366, 400, 1)
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

interface ToneMappingShaderProps {
  width?: number
  height?: number
  className?: string
}

export default function ToneMappingShader({ 
  width, 
  height = 400, 
  className = "" 
}: ToneMappingShaderProps) {
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
        <ToneMapping />
      </Canvas>
    </div>
  )
}