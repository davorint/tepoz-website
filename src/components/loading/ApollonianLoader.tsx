'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Apollonian Packing Clock Shader - Based on Shadertoy by Rigel
const apollonianVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const apollonianFragmentShader = `
  uniform float iTime;
  uniform vec2 iResolution;
  uniform vec4 iMouse;
  uniform vec4 iDate;
  
  varying vec2 vUv;
  
  // Author: Rigel rui@gil.com
  // licence: https://creativecommons.org/licenses/by/4.0/
  // link: https://www.shadertoy.com/view/lljfRD
  
  // utility functions
  float sdfRect(vec2 uv, vec2 s) {vec2 auv = abs(uv); return max(auv.x-s.x,auv.y-s.y); }
  float sdfCircle(vec2 uv, vec2 c, float r) { return length(uv-c)-r; }
  float fill(float d, float s, float i) { return abs(smoothstep(0.,s,d) - i); }
  float stroke(float d, float w, float s, float i) { return abs(smoothstep(0.,s,abs(d)-(w*.5)) - i); }
  vec3 pal(float d) { return .5*(cos(6.283*d*vec3(2.,2.,1.)+vec3(.0,1.4,.0))+1.);}
  mat2 uvRotate(float a) { return mat2(cos(a),sin(a),-sin(a),cos(a)); }
  vec2 inversion(vec2 uv, float r) { return (r*r*uv)/vec2(dot(uv,uv)); }
  float hash(vec2 s) { return fract(sin(dot(s,vec2(12.9898,78.2333)))*43758.5453123); }

  vec3 apollonian(vec2 uv) {
      vec3 dec[4];
      float a = 6.283/3.;
      float ra = 1.+sin(a*.5);
      float rb = 1.-sin(a*.5);
      dec[0] = vec3(0.,0.,-1./ra);
      float radius = .5*(ra-rb);
      float bend = 1./radius;
      for (int i=1; i<4; i++) {
          dec[i] = vec3(cos(float(i)*a),sin(float(i)*a),bend);
          if (length(uv-dec[i].xy) < radius) return vec3(uv-dec[i].xy,radius);
      }
      
      for(int i=0; i<7; i++) {
          int fi = 0;
          float d = distance(uv,dec[0].xy)-abs(1./dec[0].z);
          d *= dec[0].z < 0. ? -.5 : 1.;
          for(int i=1; i<4; i++) {
              float fd = distance(uv,dec[i].xy)-abs(1./dec[i].z);
              fd *= dec[i].z < 0. ? -.5: 1.;
              if (fd>d) {fi = i;d=fd;}
          }
          vec3 c = dec[3];
          dec[3] = dec[fi];
          dec[fi] = c;
          float bend = (2.*(dec[0].z+dec[1].z+dec[2].z))-dec[3].z;
          vec2 center = vec2((2.*(dec[0].z*dec[0].xy
                                 +dec[1].z*dec[1].xy
                                 +dec[2].z*dec[2].xy)
                                 -dec[3].z*dec[3].xy)/bend);

          vec3 solution = vec3(center,bend);
          if (abs(1./bend) < 0.01) break;
          if (length(uv-solution.xy) < 1./bend) return vec3(uv-solution.xy,1./bend);
          dec[3] = solution;
      }
      return vec3(uv,rb);
  }

  vec3 scene(vec2 uv, vec4 ms) {
      vec2 ci = vec2(.0);

      if (ms.y != -2. && ms.z > -2.) {
          uv = inversion(uv,cos(radians(60.)));
          ci = ms.xy;
      }    

      vec3 uvApo = apollonian(uv-ci);
      
      float d = 6.2830/360.;
      float a = atan(uvApo.y,uvApo.x);
      float r = length(uvApo.xy);

      float circle = sdfCircle(uv,uv-uvApo.xy,uvApo.z);
      
      // background
      vec3 c = length(uv)*pal(.7)*.2;
      
      if (uvApo.z > .3) {
          c = mix(c,pal(.75-r*.1)*.8,fill(circle+.02,.01,1.)); // clock 
          c = mix(c,pal(.4+r*.1),stroke(circle+(uvApo.z*.03),uvApo.z*.01,.005,1.));// dial

          float h = stroke(mod(a+d*15.,d*30.)-d*15.,.02,0.01,1.);
          c = mix(c,pal(.4+r*.1),h*stroke(circle+(uvApo.z*.16),uvApo.z*.25,.005,1.0));// hours

          float m = stroke(mod(a+d*15.,d*6.)-d*3.,.005,0.01,1.);
          c = mix(c,pal(.45+r*.1),(1.-h)*m*stroke(circle+(uvApo.z*.15),uvApo.z*.1,.005,1.0));// minutes,
          
          // needles rotation - force some specific clocks to rotate clockwise while others stay counterclockwise
          float hashValue = hash(vec2(uvApo.z));
          // Instead of random directions, make most counterclockwise but some clockwise
          float rotationDirection = hashValue > 0.66 ? -1.0 : 1.0; // Make ~1/3 of big clocks rotate clockwise (negative)
          vec2 uvrh = uvApo.xy*uvRotate(rotationDirection*d*iTime*(1./uvApo.z*10.)-d*90.);
          vec2 uvrm = uvApo.xy*uvRotate(rotationDirection*d*iTime*(1./uvApo.z*120.)-d*90.);
          // draw needles 
          c = mix(c,pal(.85),stroke(sdfRect(uvrh+vec2(uvApo.z-(uvApo.z*.8),.0),uvApo.z*vec2(.4,.03)),uvApo.z*.01,0.005,1.));
          c = mix(c,pal(.9),fill(sdfRect(uvrm+vec2(uvApo.z-(uvApo.z*.65),.0),uvApo.z*vec2(.5,.002)),0.005,1.));
          c = mix(c,pal(.5+r*10.),fill(circle+uvApo.z-.02,0.005,1.)); // center
      } else if (uvApo.z > .05) {
          float smallHashValue = hash(vec2(uvApo.z+2.));
          // Make some small gears rotate clockwise instead of counterclockwise
          float smallRotationDirection = smallHashValue > 0.5 ? -1.0 : 1.0; // Make ~1/2 of small clocks rotate clockwise (negative)
          vec2 uvrg = uvApo.xy*uvRotate(smallRotationDirection*d*iTime*(1./uvApo.z*20.));
          float g = stroke(mod(atan(uvrg.y,uvrg.x)+d*22.5,d*45.)-d*22.5,.3,.05,1.0);
          vec2 size = uvApo.z*vec2(.45,.08);
          c = mix(c,pal(.55-r*.6),fill(circle+g*(uvApo.z*.2)+.01,.001,1.)*fill(circle+(uvApo.z*.6),.005,.0));
          c = mix(c,pal(.55-r*.6),fill(min(sdfRect(uvrg,size.xy),sdfRect(uvrg,size.yx)),.005,1.));
      // drawing the screws
      } else { 
           vec2 size = uvApo.z * vec2(.5,.1);
           c = mix(c, pal(.85-(uvApo.z*2.)), fill(circle + 0.01,.007,1.));
           c = mix(c, pal(.8-(uvApo.z*3.)), fill(min(sdfRect(uvApo.xy,size.xy),sdfRect(uvApo.xy,size.yx)), .002, 1.));
      }
      return c;
  }

  void main() {
      vec2 fragCoord = vUv * iResolution;
      vec2 uv = (fragCoord.xy - iResolution.xy * .5) / iResolution.y;
      vec4 ms = vec4(-2., -2., -2., -2.); // No mouse interaction
      gl_FragColor = vec4(scene(uv*4., ms*4.), 1.0);
  }
`

function RealTimeApollonianClocks() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  
  const uniforms = useMemo(() => ({
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector2(1024, 1024) },
    iMouse: { value: new THREE.Vector4(-2, -2, -2, -2) },
    iDate: { value: new THREE.Vector4(0, 0, 0, 0) }
  }), [])
  
  useFrame((state) => {
    if (materialRef.current && state?.clock) {
      materialRef.current.uniforms.iTime.value = state.clock.elapsedTime
      
      // Update iDate with current date/time (year, month, day, time in seconds)
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth() + 1 // JavaScript months are 0-indexed
      const day = now.getDate()
      const timeInSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()
      
      materialRef.current.uniforms.iDate.value.set(year, month, day, timeInSeconds)
    }
  })
  
  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[8, 8]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={apollonianVertexShader}
        fragmentShader={apollonianFragmentShader}
        uniforms={uniforms}
        transparent={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

interface ApollonianLoaderProps {
  message?: string
}

export default function ApollonianLoader({ message = "Loading Platform" }: ApollonianLoaderProps) {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 z-50 flex flex-col items-center justify-center">
      <div className="w-96 h-96">
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 5], fov: 75 }}
          gl={{
            antialias: true,
            alpha: false,
          }}
        >
          <RealTimeApollonianClocks />
        </Canvas>
      </div>
      
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-light text-white/90 mb-4">
          {message}
        </h2>
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.3}s`,
                animationDuration: '1.5s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}