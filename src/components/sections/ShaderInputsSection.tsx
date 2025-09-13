'use client'

// import dynamic from 'next/dynamic'

// const ColorPaletteShader = dynamic(() => import('@/components/shaders/ColorPaletteShader'), {
//   ssr: false,
//   loading: () => <div className="w-full h-[200px]"></div>
// })

export default function ShaderInputsSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400/10 dark:bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-400/10 dark:bg-purple-500/20 rounded-full blur-3xl animate-pulse animation-delay-2s" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
        </div>


      </div>
    </section>
  )
}