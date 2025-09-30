'use client'

import { Locale } from '@/lib/i18n'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { motion } from 'motion/react'

interface PremiumHeroProps {
  lang: Locale
}

export default function PremiumHero({ lang }: PremiumHeroProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    if (!titleRef.current) return

    const tl = gsap.timeline({
      defaults: { ease: 'power4.out' },
      delay: 0.3
    })

    letterRefs.current.forEach((letter, index) => {
      if (!letter) return

      gsap.set(letter, {
        opacity: 0,
        y: 100,
        rotateX: -90,
        scale: 0.3,
        transformOrigin: 'center bottom',
      })

      tl.to(letter, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 1.2,
        ease: 'elastic.out(1, 0.5)',
        stagger: 0.05,
      }, index * 0.05)

      .to(letter, {
        y: -10,
        duration: 2 + Math.random(),
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
        delay: index * 0.1,
      }, '>')

      letter.addEventListener('mouseenter', () => {
        gsap.to(letter, {
          scale: 1.2,
          rotateZ: Math.random() * 10 - 5,
          duration: 0.3,
          ease: 'power2.out',
        })
      })

      letter.addEventListener('mouseleave', () => {
        gsap.to(letter, {
          scale: 1,
          rotateZ: 0,
          duration: 0.3,
          ease: 'power2.inOut',
        })
      })
    })

    return () => {
      tl.kill()
      letterRefs.current.forEach(letter => {
        if (letter) {
          letter.removeEventListener('mouseenter', () => {})
          letter.removeEventListener('mouseleave', () => {})
        }
      })
    }
  }, [])

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.01, 0.05, 0.95]
      }
    }
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 1.5,
        ease: [0.6, 0.01, 0.05, 0.95]
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    tap: {
      scale: 0.95
    }
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-blue-25 via-sky-25 to-purple-25 dark:bg-gradient-to-b dark:from-blue-900 dark:via-blue-800 dark:to-purple-900">
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://mbmarcobeteta.com/wp-content/uploads/2021/04/shutterstock_1426920236-scaled.jpg")',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-slate-100/10 via-transparent to-purple-100/10 dark:bg-gradient-to-b dark:from-blue-900/20 dark:via-transparent dark:to-purple-900/20" />

      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.01, 0.02, 0.01]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 dark:bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.02, 0.03, 0.02]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2
          }}
          className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-orange-500 dark:bg-orange-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.01, 0.02, 0.01]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4
          }}
          className="absolute top-2/3 left-1/2 w-64 h-64 bg-sky-500 dark:bg-sky-500/10 rounded-full blur-2xl"
        />
      </div>

      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="max-w-5xl text-center">
          <h1 ref={titleRef} className="mb-6 text-7xl md:text-9xl lg:text-[10rem] font-bebas tracking-wider text-slate-800 dark:text-white">
            <span
              ref={el => letterRefs.current[0] = el}
              className="inline-block text-blue-600 dark:text-blue-400 drop-shadow-2xl cursor-pointer transition-transform"
              style={{
                textShadow: '0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.4)',
                perspective: '1000px'
              }}
            >T</span>
            <span
              ref={el => letterRefs.current[1] = el}
              className="inline-block text-blue-600 dark:text-blue-400 drop-shadow-2xl cursor-pointer transition-transform"
              style={{
                textShadow: '0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.4)',
                perspective: '1000px'
              }}
            >O</span>
            <span
              ref={el => letterRefs.current[2] = el}
              className="inline-block text-sky-600 dark:text-sky-400 drop-shadow-2xl cursor-pointer transition-transform ml-4"
              style={{
                textShadow: '0 0 30px rgba(14, 165, 233, 0.8), 0 0 60px rgba(14, 165, 233, 0.4)',
                perspective: '1000px'
              }}
            >D</span>
            <span
              ref={el => letterRefs.current[3] = el}
              className="inline-block text-sky-600 dark:text-sky-400 drop-shadow-2xl cursor-pointer transition-transform"
              style={{
                textShadow: '0 0 30px rgba(14, 165, 233, 0.8), 0 0 60px rgba(14, 165, 233, 0.4)',
                perspective: '1000px'
              }}
            >O</span>
            <span className="inline-block ml-8"></span>
            <span
              ref={el => letterRefs.current[4] = el}
              className="inline-block text-orange-600 dark:text-orange-400 drop-shadow-2xl cursor-pointer transition-transform"
              style={{
                textShadow: '0 0 30px rgba(251, 146, 60, 0.8), 0 0 60px rgba(251, 146, 60, 0.4)',
                perspective: '1000px'
              }}
            >T</span>
            <span
              ref={el => letterRefs.current[5] = el}
              className="inline-block text-orange-600 dark:text-orange-400 drop-shadow-2xl cursor-pointer transition-transform"
              style={{
                textShadow: '0 0 30px rgba(251, 146, 60, 0.8), 0 0 60px rgba(251, 146, 60, 0.4)',
                perspective: '1000px'
              }}
            >E</span>
            <span
              ref={el => letterRefs.current[6] = el}
              className="inline-block text-orange-600 dark:text-orange-400 drop-shadow-2xl cursor-pointer transition-transform"
              style={{
                textShadow: '0 0 30px rgba(251, 146, 60, 0.8), 0 0 60px rgba(251, 146, 60, 0.4)',
                perspective: '1000px'
              }}
            >P</span>
            <span
              ref={el => letterRefs.current[7] = el}
              className="inline-block text-orange-600 dark:text-orange-400 drop-shadow-2xl cursor-pointer transition-transform"
              style={{
                textShadow: '0 0 30px rgba(251, 146, 60, 0.8), 0 0 60px rgba(251, 146, 60, 0.4)',
                perspective: '1000px'
              }}
            >O</span>
            <span
              ref={el => letterRefs.current[8] = el}
              className="inline-block text-orange-600 dark:text-orange-400 drop-shadow-2xl cursor-pointer transition-transform"
              style={{
                textShadow: '0 0 30px rgba(251, 146, 60, 0.8), 0 0 60px rgba(251, 146, 60, 0.4)',
                perspective: '1000px'
              }}
            >Z</span>
          </h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="mx-auto max-w-2xl text-lg md:text-xl lg:text-2xl text-slate-950 dark:text-white mb-8 font-montserrat font-semibold drop-shadow-xl"
            style={{
              textShadow: '2px 2px 4px rgba(255, 255, 255, 0.9), -1px -1px 2px rgba(255, 255, 255, 0.5)'
            }}
          >
            {lang === 'es'
              ? 'Comida & Bebida | Hoteles & Spas | Historia & Cultura | Magia & Naturaleza | Todas las Tiendas'
              : 'Food & Drink | Hotels & Spas | History & Culture | Magic & Nature | All Stores'
            }
          </motion.p>

          <motion.button
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 dark:bg-gradient-to-r dark:from-emerald-400 dark:to-blue-400 dark:hover:from-emerald-500 dark:hover:to-blue-500 text-white font-semibold rounded-full transition-all duration-300 shadow-2xl hover:shadow-emerald-500/50 backdrop-blur-sm border border-emerald-400/30 dark:border-emerald-300/30"
          >
            {lang === 'es' ? 'Descubrir la Magia' : 'Discover the Magic'}
          </motion.button>
        </div>
      </div>
    </div>
  )
}