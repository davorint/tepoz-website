'use client'

import dynamic from 'next/dynamic'

const TurangiShader = dynamic(() => import('@/components/shaders/TurangiShader'), {
  ssr: false,
  loading: () => <div className="w-full h-[250px]"></div>
})

export default function TurangiSection() {
  return (
    <TurangiShader className="w-full" height={250} />
  )
}