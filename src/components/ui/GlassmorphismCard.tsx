import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { GLASSMORPHISM_STYLES, type GlassmorphismLevel } from '@/lib/experience-ui-constants'

export interface GlassmorphismCardProps extends React.HTMLAttributes<HTMLDivElement> {
  level?: GlassmorphismLevel
  glow?: boolean
  glowColor?: string
  hover?: boolean
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  shadow?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  children?: React.ReactNode
}

const GlassmorphismCard = forwardRef<HTMLDivElement, GlassmorphismCardProps>(
  ({
    className,
    level = 'medium',
    glow = false,
    glowColor,
    hover = true,
    rounded = '3xl',
    shadow = '2xl',
    children,
    ...props
  }, ref) => {
    const roundedClass = {
      'sm': 'rounded-sm',
      'md': 'rounded-md',
      'lg': 'rounded-lg',
      'xl': 'rounded-xl',
      '2xl': 'rounded-2xl',
      '3xl': 'rounded-3xl'
    }[rounded]

    const shadowClass = {
      'sm': 'shadow-sm',
      'md': 'shadow-md',
      'lg': 'shadow-lg',
      'xl': 'shadow-xl',
      '2xl': 'shadow-2xl',
      '3xl': 'shadow-3xl'
    }[shadow]

    const hoverClass = hover ? 'hover:scale-[1.02] hover:shadow-3xl transition-all duration-500' : ''

    return (
      <div className="relative group" ref={ref} {...props}>
        {/* Glow effect */}
        {glow && (
          <div
            className={cn(
              "absolute inset-0 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700",
              roundedClass,
              glowColor || "bg-gradient-to-r from-teal-400 to-cyan-400"
            )}
          />
        )}

        {/* Main card */}
        <div
          className={cn(
            "relative",
            GLASSMORPHISM_STYLES[level],
            roundedClass,
            shadowClass,
            hoverClass,
            "overflow-hidden transform-gpu",
            className
          )}
        >
          {children}
        </div>
      </div>
    )
  }
)

GlassmorphismCard.displayName = "GlassmorphismCard"

export { GlassmorphismCard }
export default GlassmorphismCard