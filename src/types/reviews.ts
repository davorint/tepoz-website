import { Locale } from '@/lib/i18n'

export interface Review {
  id: string
  businessId: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  title: {
    original: string
    translations?: Record<Locale, string>
  }
  content: {
    original: string
    originalLang: Locale
    translations?: Record<Locale, string>
  }
  images?: string[]
  helpful: number
  reportCount: number
  isVerified: boolean
  visitDate?: Date
  createdAt: Date
  updatedAt: Date
}

export interface TranslationRequest {
  id: string
  reviewId: string
  fromLang: Locale
  toLang: Locale
  originalText: string
  translatedText?: string
  status: 'pending' | 'completed' | 'failed'
  translationService: 'auto' | 'human' | 'community'
  quality?: 'excellent' | 'good' | 'fair' | 'poor'
  createdAt: Date
}

export interface QAPost {
  id: string
  businessId: string
  userId: string
  userName: string
  question: {
    original: string
    originalLang: Locale
    translations?: Record<Locale, string>
  }
  answers: QAAnswer[]
  isAnswered: boolean
  helpful: number
  createdAt: Date
}

export interface QAAnswer {
  id: string
  userId: string
  userName: string
  isBusinessOwner: boolean
  content: {
    original: string
    originalLang: Locale
    translations?: Record<Locale, string>
  }
  helpful: number
  createdAt: Date
}