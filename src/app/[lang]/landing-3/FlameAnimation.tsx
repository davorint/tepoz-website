'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Flame shader based on Anatole Duprat's work
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
const flameVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const flameFragmentShader = `
  // Created by anatole duprat - XT95/2013
  // License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
  
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

  float noise(vec3 p) //Thx to Las^Mercury
  {
      vec3 i = floor(p);
      vec4 a = dot(i, vec3(1., 57., 21.)) + vec4(0., 57., 21., 78.);
      vec3 f = cos((p-i)*acos(-1.))*(-.5)+.5;
      a = mix(sin(cos(a)*a),sin(cos(1.+a)*(1.+a)), f.x);
      a.xy = mix(a.xz, a.yw, f.y);
      return mix(a.x, a.y, f.z);
  }

  float sphere(vec3 p, vec4 spr)
  {
      return length(spr.xyz-p) - spr.w;
  }

  float flame(vec3 p)
  {
      float d = sphere(p*vec3(1.,.5,1.), vec4(.0,-1.,.0,1.));
      return d + (noise(p+vec3(.0,iTime*2.,.0)) + noise(p*3.)*.5)*.25*(p.y) ;
  }

  float scene(vec3 p)
  {
      return min(100.-length(p) , abs(flame(p)) );
  }

  vec4 raymarch(vec3 org, vec3 dir)
  {
      float d = 0.0, glow = 0.0, eps = 0.02;
      vec3  p = org;
      bool glowed = false;
      
      for(int i=0; i<64; i++)
      {
          d = scene(p) + eps;
          p += d * dir;
          if( d>eps )
          {
              if(flame(p) < .0)
                  glowed=true;
              if(glowed)
                     glow = float(i)/64.;
          }
      }
      return vec4(p,glow);
  }

  void mainImage( out vec4 fragColor, in vec2 fragCoord )
  {
      vec2 v = -1.0 + 2.0 * fragCoord.xy / iResolution.xy;
      v.x *= iResolution.x/iResolution.y;
      
      vec3 org = vec3(0., -2., 4.);
      vec3 dir = normalize(vec3(v.x*1.6, -v.y, -1.5));
      
      vec4 p = raymarch(org, dir);
      float glow = p.w;
      
      vec4 col = mix(vec4(1.,.5,.1,1.), vec4(0.1,.5,1.,1.), p.y*.02+.4);
      
      fragColor = mix(vec4(0.), col, pow(glow*2.,4.));
  }

  void main() {
    vec2 fragCoord = vUv * iResolution.xy;
    vec4 fragColor;
    mainImage(fragColor, fragCoord);
    gl_FragColor = fragColor;
  }
`

function FlameShader() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  
  const uniforms = useMemo(() => ({
    iResolution: { value: new THREE.Vector3(512, 512, 1) },
    iTime: { value: 0 },
    iTimeDelta: { value: 0 },
    iFrameRate: { value: 60 },
    iFrame: { value: 0 },
    iChannelTime: { value: [0, 0, 0, 0] },
    iChannelResolution: { value: [
      new THREE.Vector3(512, 512, 1),
      new THREE.Vector3(512, 512, 1),
      new THREE.Vector3(512, 512, 1),
      new THREE.Vector3(512, 512, 1)
    ] },
    iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },
    iDate: { value: new THREE.Vector4(2023, 1, 1, 0) },
    iSampleRate: { value: 44100 }
  }), [])
  
  useFrame((state) => {
    if (materialRef.current && state?.clock) {
      materialRef.current.uniforms.iTime.value = state.clock.elapsedTime
      materialRef.current.uniforms.iFrame.value = Math.floor(state.clock.elapsedTime * 60)
      materialRef.current.uniforms.iTimeDelta.value = state.clock.getDelta()
    }
  })
  
  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[6, 6]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={flameVertexShader}
        fragmentShader={flameFragmentShader}
        uniforms={uniforms}
        transparent={true}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

export default function FlameAnimation() {
  return (
    <div 
      className="w-[500px] h-[500px] mx-auto pointer-events-none"
      style={{ 
        position: 'relative',
        zIndex: 1,
        filter: 'none !important',
        boxShadow: 'none !important',
        outline: 'none !important',
        border: 'none !important',
        background: 'transparent !important',
        backdropFilter: 'none !important',
        WebkitBackdropFilter: 'none !important',
        transform: 'none !important',
        transition: 'none !important',
        animation: 'none !important'
      }}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <FlameShader />
      </Canvas>
    </div>
  )
}