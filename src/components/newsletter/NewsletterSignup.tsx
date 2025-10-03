'use client'

import { useState, useTransition } from 'react'
import { Mail, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { subscribeToNewsletter } from '@/lib/actions/newsletter'
import { toast } from 'sonner'

interface NewsletterSignupProps {
  locale?: 'es' | 'en'
  variant?: 'inline' | 'card' | 'footer'
}

export default function NewsletterSignup({ locale = 'es', variant = 'inline' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isPending, startTransition] = useTransition()

  const content = {
    es: {
      title: 'Suscríbete a Nuestro Newsletter',
      description: 'Recibe las últimas noticias, eventos y recomendaciones de Tepoztlán directamente en tu correo',
      placeholder: 'tu@email.com',
      button: 'Suscribirse',
      subscribing: 'Suscribiendo...',
      success: '¡Gracias por suscribirte!',
      successDesc: 'Revisa tu correo para confirmar tu suscripción',
      errorInvalid: 'Por favor ingresa un email válido',
      errorExists: 'Este email ya está suscrito',
      errorGeneric: 'Error al suscribirse. Intenta de nuevo',
    },
    en: {
      title: 'Subscribe to Our Newsletter',
      description: 'Get the latest news, events and recommendations from Tepoztlán directly in your inbox',
      placeholder: 'your@email.com',
      button: 'Subscribe',
      subscribing: 'Subscribing...',
      success: 'Thanks for subscribing!',
      successDesc: 'Check your email to confirm your subscription',
      errorInvalid: 'Please enter a valid email',
      errorExists: 'This email is already subscribed',
      errorGeneric: 'Error subscribing. Please try again',
    },
  }

  const t = content[locale]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      toast.error(t.errorInvalid)
      return
    }

    startTransition(async () => {
      const result = await subscribeToNewsletter({
        email: email.trim(),
        language: locale,
      })

      if (result.success) {
        setIsSubscribed(true)
        toast.success(t.success)
        setEmail('')
      } else {
        if (result.error === 'Email already subscribed') {
          toast.error(t.errorExists)
        } else if (result.error === 'Invalid email format') {
          toast.error(t.errorInvalid)
        } else {
          toast.error(t.errorGeneric)
        }
      }
    })
  }

  if (isSubscribed) {
    return (
      <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
        <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
        <div>
          <p className="text-white font-semibold">{t.success}</p>
          <p className="text-white/70 text-sm">{t.successDesc}</p>
        </div>
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <Mail className="w-8 h-8 text-cyan-400" />
          <h3 className="text-2xl font-bold text-white">{t.title}</h3>
        </div>
        <p className="text-white/70 mb-6">{t.description}</p>
        <form onSubmit={handleSubmit} className="flex gap-3">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.placeholder}
            disabled={isPending}
            className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-cyan-400 focus:ring-cyan-400"
          />
          <Button
            type="submit"
            disabled={isPending || !email.trim()}
            className="bg-gradient-to-r from-cyan-400 to-blue-400 text-white hover:from-cyan-500 hover:to-blue-500"
          >
            {isPending ? t.subscribing : t.button}
          </Button>
        </form>
      </div>
    )
  }

  if (variant === 'footer') {
    return (
      <div>
        <h4 className="text-lg font-semibold text-white mb-3">{t.title}</h4>
        <p className="text-white/70 text-sm mb-4">{t.description}</p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.placeholder}
            disabled={isPending}
            className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-cyan-400 focus:ring-cyan-400 text-sm"
          />
          <Button
            type="submit"
            disabled={isPending || !email.trim()}
            size="sm"
            className="bg-gradient-to-r from-cyan-400 to-blue-400 text-white hover:from-cyan-500 hover:to-blue-500"
          >
            {isPending ? t.subscribing : t.button}
          </Button>
        </form>
      </div>
    )
  }

  // inline variant (default)
  return (
    <form onSubmit={handleSubmit} className="flex gap-3 w-full max-w-md">
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t.placeholder}
        disabled={isPending}
        className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-cyan-400 focus:ring-cyan-400"
      />
      <Button
        type="submit"
        disabled={isPending || !email.trim()}
        className="bg-gradient-to-r from-cyan-400 to-blue-400 text-white hover:from-cyan-500 hover:to-blue-500"
      >
        {isPending ? t.subscribing : t.button}
      </Button>
    </form>
  )
}
