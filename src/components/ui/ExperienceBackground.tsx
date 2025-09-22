import { cn } from '@/lib/utils'
import { GRADIENT_ORBS } from '@/lib/experience-ui-constants'

export interface ExperienceBackgroundProps {
  theme?: 'teal' | 'orange' | 'mixed' | 'adventure' | 'spiritual' | 'wellness'
  variant?: 'light' | 'dark' | 'auto'
  pattern?: 'none' | 'mesh' | 'mountain' | 'dots'
  intensity?: 'subtle' | 'medium' | 'strong'
  animated?: boolean
  className?: string
  children?: React.ReactNode
}

const THEME_CONFIGS = {
  teal: {
    base: 'from-slate-50 via-teal-50 to-slate-50 dark:from-slate-900 dark:via-teal-900 dark:to-slate-900',
    radialGradients: [
      'bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-teal-200/20 dark:from-teal-900/40 via-transparent to-transparent',
      'bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-cyan-200/15 dark:from-cyan-900/30 via-transparent to-transparent',
      'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-turquoise-200/10 dark:from-turquoise-900/20 via-transparent to-transparent'
    ],
    orbs: [
      { ...GRADIENT_ORBS.teal, color: 'bg-teal-500/10 dark:bg-teal-500/20' },
      { ...GRADIENT_ORBS.cyan, color: 'bg-cyan-500/10 dark:bg-cyan-500/20' },
      { ...GRADIENT_ORBS.turquoise, color: 'bg-turquoise-500/10 dark:bg-turquoise-500/20' }
    ]
  },
  orange: {
    base: 'from-slate-900 via-orange-900 to-slate-900',
    radialGradients: [
      'bg-[radial-gradient(at_top_left,_transparent,_rgba(251,146,60,0.2)),radial-gradient(at_bottom_right,_transparent,_rgba(239,68,68,0.2))]'
    ],
    orbs: [
      { position: 'top-20 left-20', size: 'w-[35rem] h-[35rem]', color: 'bg-orange-500/20', animation: 'animate-pulse' },
      { position: 'bottom-20 right-20', size: 'w-[40rem] h-[40rem]', color: 'bg-red-500/20', animation: 'animate-pulse animation-delay-2s' },
      { position: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2', size: 'w-[45rem] h-[45rem]', color: 'bg-amber-500/10', animation: 'animate-pulse animation-delay-4s' }
    ]
  },
  mixed: {
    base: 'from-slate-50 via-teal-50 to-orange-50 dark:from-slate-900 dark:via-teal-900 dark:to-orange-900',
    radialGradients: [
      'bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-teal-200/20 dark:from-teal-900/40 via-transparent to-transparent',
      'bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-orange-200/15 dark:from-orange-900/30 via-transparent to-transparent'
    ],
    orbs: [
      { ...GRADIENT_ORBS.teal, color: 'bg-teal-500/10 dark:bg-teal-500/20' },
      { position: 'top-3/4 -right-20', size: 'w-96 h-96', color: 'bg-orange-500/10 dark:bg-orange-500/20', animation: 'animate-float-delay' },
      { ...GRADIENT_ORBS.turquoise, color: 'bg-amber-500/10 dark:bg-amber-500/20' }
    ]
  },
  adventure: {
    base: 'from-slate-50 via-teal-50 to-cyan-50 dark:from-slate-900 dark:via-teal-900 dark:to-cyan-900',
    radialGradients: [
      'bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-teal-300/25 dark:from-teal-800/50 via-transparent to-transparent'
    ],
    orbs: [
      { ...GRADIENT_ORBS.teal, color: 'bg-teal-400/15 dark:bg-teal-400/25' },
      { ...GRADIENT_ORBS.cyan, color: 'bg-cyan-400/15 dark:bg-cyan-400/25' }
    ]
  },
  spiritual: {
    base: 'from-slate-50 via-orange-50 to-amber-50 dark:from-slate-900 dark:via-orange-900 dark:to-amber-900',
    radialGradients: [
      'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-200/20 dark:from-orange-800/40 via-transparent to-transparent'
    ],
    orbs: [
      { position: 'top-1/4 -left-20', size: 'w-96 h-96', color: 'bg-orange-400/15 dark:bg-orange-400/25', animation: 'animate-float' },
      { position: 'bottom-1/4 -right-20', size: 'w-96 h-96', color: 'bg-amber-400/15 dark:bg-amber-400/25', animation: 'animate-float-delay' }
    ]
  },
  wellness: {
    base: 'from-slate-50 via-green-50 to-emerald-50 dark:from-slate-900 dark:via-green-900 dark:to-emerald-900',
    radialGradients: [
      'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-200/20 dark:from-green-800/40 via-transparent to-transparent'
    ],
    orbs: [
      { position: 'top-1/3 -left-20', size: 'w-96 h-96', color: 'bg-green-400/15 dark:bg-green-400/25', animation: 'animate-float' },
      { position: 'bottom-1/3 -right-20', size: 'w-96 h-96', color: 'bg-emerald-400/15 dark:bg-emerald-400/25', animation: 'animate-float-slow' }
    ]
  }
} as const

const PATTERN_CONFIGS = {
  none: '',
  mesh: `
    background-image: linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 40px 40px;
  `,
  mountain: `
    background-image: linear-gradient(rgba(251, 146, 60, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(251, 146, 60, 0.1) 1px, transparent 1px);
    background-size: 40px 40px;
  `,
  dots: `
    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
  `
}

const INTENSITY_MULTIPLIERS = {
  subtle: 0.5,
  medium: 1,
  strong: 1.5
}

export default function ExperienceBackground({
  theme = 'teal',
  variant = 'auto',
  pattern = 'none',
  intensity = 'medium',
  animated = true,
  className,
  children
}: ExperienceBackgroundProps) {
  const config = THEME_CONFIGS[theme]
  const intensityMultiplier = INTENSITY_MULTIPLIERS[intensity]

  return (
    <div className={cn("min-h-screen relative overflow-hidden", className)}>
      {/* Base gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${config.base}`} />

      {/* Radial gradients */}
      {config.radialGradients.map((gradient, index) => (
        <div
          key={`radial-${index}`}
          className={`absolute inset-0 ${gradient}`}
          style={{
            opacity: intensityMultiplier * (variant === 'light' ? 0.7 : variant === 'dark' ? 1.3 : 1)
          }}
        />
      ))}

      {/* Animated gradient orbs */}
      {animated && config.orbs.map((orb, index) => (
        <div
          key={`orb-${index}`}
          className={`absolute ${orb.position} ${orb.size} ${orb.color} rounded-full mix-blend-multiply filter blur-3xl ${orb.animation}`}
          style={{
            opacity: intensityMultiplier * (variant === 'light' ? 0.6 : variant === 'dark' ? 1.2 : 1)
          }}
        />
      ))}

      {/* Pattern overlay */}
      {pattern !== 'none' && (
        <div
          className="absolute inset-0 opacity-5"
          style={{
            ...PATTERN_CONFIGS[pattern] && {
              backgroundImage: PATTERN_CONFIGS[pattern].split('background-image:')[1]?.split(';')[0] || '',
              backgroundSize: PATTERN_CONFIGS[pattern].split('background-size:')[1]?.split(';')[0] || ''
            }
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

// Convenience components for specific themes
export const AdventureBackground = (props: Omit<ExperienceBackgroundProps, 'theme'>) => (
  <ExperienceBackground {...props} theme="adventure" />
)

export const SpiritualBackground = (props: Omit<ExperienceBackgroundProps, 'theme'>) => (
  <ExperienceBackground {...props} theme="spiritual" />
)

export const WellnessBackground = (props: Omit<ExperienceBackgroundProps, 'theme'>) => (
  <ExperienceBackground {...props} theme="wellness" />
)