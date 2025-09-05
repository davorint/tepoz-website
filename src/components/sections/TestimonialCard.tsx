'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

interface TestimonialCardProps {
  testimonial: {
    id: number
    name: string
    location: string
    rating: number
    text: string
    image: string
    date: string
    verified: boolean
    category: string
  }
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="flex items-center gap-3">
      <div className="relative w-12 h-12 overflow-hidden rounded-full border-2 border-white shadow-md bg-gray-200">
        {isClient ? (
          <Image 
            src={testimonial.image}
            alt={testimonial.name}
            width={48}
            height={48}
            className="object-cover w-full h-full"
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-xs">Loading...</span>
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-gray-900">{testimonial.name}</p>
          {testimonial.verified && (
            <svg className="w-4 h-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <div className="flex items-center gap-3">
          <p className="text-sm text-gray-500">{testimonial.location}</p>
          <p className="text-xs text-gray-400">{testimonial.date}</p>
        </div>
      </div>
    </div>
  )
}