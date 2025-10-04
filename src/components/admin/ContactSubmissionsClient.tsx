'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { markContactAsRead, markContactAsReplied } from '@/lib/actions/contact'
import { CheckIcon, EnvelopeOpenIcon, EnvelopeClosedIcon } from '@radix-ui/react-icons'

interface ContactSubmission {
  id: number
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
  type: string | null
  read: boolean | null
  replied: boolean | null
  createdAt: Date
}

export default function ContactSubmissionsClient({
  submissions
}: {
  submissions: ContactSubmission[]
}) {
  const [localSubmissions, setLocalSubmissions] = useState(submissions)
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const handleMarkAsRead = async (id: number) => {
    const result = await markContactAsRead(id)
    if (result.success) {
      setLocalSubmissions(prev =>
        prev.map(sub => sub.id === id ? { ...sub, read: true } : sub)
      )
    }
  }

  const handleMarkAsReplied = async (id: number) => {
    const result = await markContactAsReplied(id)
    if (result.success) {
      setLocalSubmissions(prev =>
        prev.map(sub => sub.id === id ? { ...sub, replied: true } : sub)
      )
    }
  }

  const unreadCount = localSubmissions.filter(s => !s.read).length
  const repliedCount = localSubmissions.filter(s => s.replied).length

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{localSubmissions.length}</div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-orange-600">{unreadCount}</div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Unread</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{repliedCount}</div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Replied</p>
          </CardContent>
        </Card>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {localSubmissions.map((submission) => (
          <Card
            key={submission.id}
            className={!submission.read ? 'border-l-4 border-l-orange-500' : ''}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    {!submission.read ? (
                      <EnvelopeClosedIcon className="h-5 w-5 text-orange-600" />
                    ) : (
                      <EnvelopeOpenIcon className="h-5 w-5 text-neutral-400" />
                    )}
                    {submission.subject}
                    {submission.replied && (
                      <span className="ml-2 px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full">
                        Replied
                      </span>
                    )}
                  </CardTitle>
                  <div className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <p>From: <strong>{submission.name}</strong> ({submission.email})</p>
                    {submission.phone && <p>Phone: {submission.phone}</p>}
                    <p>Type: {submission.type || 'general'}</p>
                    <p className="text-xs mt-1">
                      {new Date(submission.createdAt).toLocaleString('es-MX', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                        timeZone: 'America/Mexico_City'
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {!submission.read && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleMarkAsRead(submission.id)}
                    >
                      Mark as Read
                    </Button>
                  )}
                  {!submission.replied && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleMarkAsReplied(submission.id)}
                    >
                      <CheckIcon className="h-4 w-4 mr-1" />
                      Mark as Replied
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setExpandedId(expandedId === submission.id ? null : submission.id)}
                  >
                    {expandedId === submission.id ? 'Hide' : 'Show'}
                  </Button>
                </div>
              </div>
            </CardHeader>
            {expandedId === submission.id && (
              <CardContent className="border-t border-neutral-200 dark:border-neutral-800 pt-4">
                <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-lg">
                  <p className="whitespace-pre-wrap">{submission.message}</p>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button asChild>
                    <a href={`mailto:${submission.email}?subject=Re: ${submission.subject}`}>
                      Reply via Email
                    </a>
                  </Button>
                  {submission.phone && (
                    <Button variant="outline" asChild>
                      <a href={`https://wa.me/${submission.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                        WhatsApp
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
