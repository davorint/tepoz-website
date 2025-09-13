'use client'

import dynamic from 'next/dynamic'

const ColorPaletteShader = dynamic(() => import('@/components/shaders/ColorPaletteShader'), {
  ssr: false,
  loading: () => <div className="w-full h-[200px]"></div>
})

export default function ShaderSection() {
  return (
    <ColorPaletteShader className="w-full" />
  )
}