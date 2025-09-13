'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Star, MapPin, Calendar, Users } from 'lucide-react'
import { Locale } from '@/lib/i18n'

interface SocialProofNotificationsProps {
  lang: Locale
}

interface NotificationItem {
  id: string
  type: 'booking' | 'review' | 'visitor'
  name: string
  action: string
  actionEn: string
  location?: string
  timeAgo: string
  timeAgoEn: string
  rating?: number
  avatar: string
  initials: string
}

const notifications: NotificationItem[] = [
  {
    id: '1',
    type: 'booking',
    name: 'María González',
    action: 'reservó Casa Fernanda',
    actionEn: 'booked Casa Fernanda',
    location: 'Ciudad de México',
    timeAgo: 'hace 2 minutos',
    timeAgoEn: '2 minutes ago',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b05b?w=50&h=50&fit=crop&crop=face',
    initials: 'MG'
  },
  {
    id: '2',
    type: 'review',
    name: 'Carlos Rodríguez',
    action: 'calificó con 5 estrellas',
    actionEn: 'rated 5 stars',
    location: 'Guadalajara',
    timeAgo: 'hace 5 minutos',
    timeAgoEn: '5 minutes ago',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
    initials: 'CR'
  },
  {
    id: '3',
    type: 'booking',
    name: 'Ana Martínez',
    action: 'reservó tour al Tepozteco',
    actionEn: 'booked Tepozteco tour',
    location: 'Puebla',
    timeAgo: 'hace 8 minutos',
    timeAgoEn: '8 minutes ago',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
    initials: 'AM'
  },
  {
    id: '4',
    type: 'visitor',
    name: 'Roberto Silva',
    action: 'está explorando Tepoztlán',
    actionEn: 'is exploring Tepoztlán',
    location: 'Monterrey',
    timeAgo: 'hace 12 minutos',
    timeAgoEn: '12 minutes ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
    initials: 'RS'
  },
  {
    id: '5',
    type: 'review',
    name: 'Isabella López',
    action: 'recomendó Los Colorines',
    actionEn: 'recommended Los Colorines',
    location: 'Querétaro',
    timeAgo: 'hace 15 minutos',
    timeAgoEn: '15 minutes ago',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face',
    initials: 'IL'
  },
  {
    id: '6',
    type: 'booking',
    name: 'Diego Hernández',
    action: 'reservó experiencia gastronómica',
    actionEn: 'booked culinary experience',
    location: 'Guadalajara',
    timeAgo: 'hace 18 minutos',
    timeAgoEn: '18 minutes ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face',
    initials: 'DH'
  }
]

function NotificationCard({ notification, lang }: { notification: NotificationItem, lang: Locale }) {
  const getIcon = () => {
    switch (notification.type) {
      case 'booking':
        return <Calendar className="w-4 h-4 text-blue-500" />
      case 'review':
        return <Star className="w-4 h-4 text-yellow-500" />
      case 'visitor':
        return <Users className="w-4 h-4 text-green-500" />
      default:
        return <MapPin className="w-4 h-4 text-gray-500" />
    }
  }

  const getBorderColor = () => {
    switch (notification.type) {
      case 'booking':
        return 'border-l-blue-500'
      case 'review':
        return 'border-l-yellow-500'
      case 'visitor':
        return 'border-l-green-500'
      default:
        return 'border-l-gray-500'
    }
  }

  return (
    <Card className={`border-0 bg-white/95 backdrop-blur-md shadow-lg border-l-4 ${getBorderColor()} max-w-sm`}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={notification.avatar} alt={notification.name} />
            <AvatarFallback className="bg-tepoztlan-sunset text-white text-xs">
              {notification.initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-1 mb-1">
              {getIcon()}
              <span className="text-sm font-semibold text-gray-900">
                {notification.name}
              </span>
            </div>
            
            <p className="text-sm text-gray-700 mb-1">
              {lang === 'es' ? notification.action : notification.actionEn}
            </p>
            
            {notification.rating && (
              <div className="flex items-center space-x-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3 h-3 ${
                      i < notification.rating! 
                        ? 'text-yellow-400 fill-yellow-400' 
                        : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>
            )}
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              {notification.location && (
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span>{notification.location}</span>
                </div>
              )}
              <span>{lang === 'es' ? notification.timeAgo : notification.timeAgoEn}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function SocialProofNotifications({ lang }: SocialProofNotificationsProps) {
  const [currentNotification, setCurrentNotification] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show first notification after 30 seconds
    const showTimer = setTimeout(() => {
      setIsVisible(true)
    }, 30000)

    const interval = setInterval(() => {
      setCurrentNotification((prev) => (prev + 1) % notifications.length)
    }, 120000) // Change notification every 2 minutes

    return () => {
      clearTimeout(showTimer)
      clearInterval(interval)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    // Show next notification after 2 minutes
    setTimeout(() => {
      setCurrentNotification((prev) => (prev + 1) % notifications.length)
      setIsVisible(true)
    }, 120000)
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 pointer-events-none">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={currentNotification}
            initial={{ opacity: 0, y: 100, x: -50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -50, x: -50 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="pointer-events-auto relative"
            onHoverStart={() => {}}
            onHoverEnd={() => {}}
          >
            <NotificationCard 
              notification={notifications[currentNotification]} 
              lang={lang}
            />
            
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gray-500 hover:bg-gray-600 text-white rounded-full flex items-center justify-center text-sm transition-colors duration-200"
              aria-label="Close notification"
            >
              ×
            </button>
            
            {/* Auto-dismiss progress bar */}
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-tepoztlan-sunset rounded-b"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 120, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}