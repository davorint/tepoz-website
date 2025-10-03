'use client'

import { useState } from 'react'
import { Locale } from '@/lib/i18n'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { User, Heart, Settings, MapPin, Calendar, Mail, LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

interface UserProfileClientProps {
  locale: Locale
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
    role?: string | null
    createdAt?: Date | null
  }
}

export default function UserProfileClient({ locale, user }: UserProfileClientProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const content = {
    es: {
      title: 'Mi Perfil',
      subtitle: 'Gestiona tu cuenta y preferencias',
      overview: 'Resumen',
      favorites: 'Favoritos',
      settings: 'Configuración',
      memberSince: 'Miembro desde',
      email: 'Correo electrónico',
      role: 'Rol',
      signOut: 'Cerrar sesión',
      noFavorites: 'No tienes favoritos guardados',
      noFavoritesDesc: 'Explora negocios y guarda tus favoritos aquí',
      explore: 'Explorar',
    },
    en: {
      title: 'My Profile',
      subtitle: 'Manage your account and preferences',
      overview: 'Overview',
      favorites: 'Favorites',
      settings: 'Settings',
      memberSince: 'Member since',
      email: 'Email',
      role: 'Role',
      signOut: 'Sign out',
      noFavorites: 'You have no saved favorites',
      noFavoritesDesc: 'Explore businesses and save your favorites here',
      explore: 'Explore',
    },
  }

  const t = content[locale]

  const initials = user.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || user.email?.[0]?.toUpperCase() || 'U'

  const memberSinceDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString(locale === 'es' ? 'es-MX' : 'en-US', {
        month: 'long',
        year: 'numeric',
      })
    : ''

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse animation-delay-2s" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.image || ''} alt={user.name || ''} />
                <AvatarFallback className="text-2xl bg-gradient-to-r from-cyan-400 to-blue-400 text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold text-white mb-2">{user.name || t.title}</h1>
                <p className="text-white/70 text-lg mb-4">{user.email}</p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <Badge className="bg-white/10 text-white border-white/20">
                    <Calendar className="w-4 h-4 mr-2" />
                    {t.memberSince}: {memberSinceDate}
                  </Badge>
                  {user.role && user.role !== 'user' && (
                    <Badge className="bg-gradient-to-r from-cyan-400 to-blue-400 text-white border-0">
                      {user.role === 'admin' ? 'Administrator' : 'Business Owner'}
                    </Badge>
                  )}
                </div>
              </div>

              <Button
                variant="outline"
                onClick={() => signOut()}
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {t.signOut}
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="bg-white/5 backdrop-blur-xl border border-white/10 p-2">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-400 data-[state=active]:to-blue-400 data-[state=active]:text-white text-white/70"
            >
              <User className="w-4 h-4 mr-2" />
              {t.overview}
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-400 data-[state=active]:to-blue-400 data-[state=active]:text-white text-white/70"
            >
              <Heart className="w-4 h-4 mr-2" />
              {t.favorites}
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-400 data-[state=active]:to-blue-400 data-[state=active]:text-white text-white/70"
            >
              <Settings className="w-4 h-4 mr-2" />
              {t.settings}
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardHeader>
                <CardTitle className="text-white">{t.overview}</CardTitle>
                <CardDescription className="text-white/70">{t.subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <Mail className="w-5 h-5 text-cyan-400" />
                      <h3 className="text-white font-semibold">{t.email}</h3>
                    </div>
                    <p className="text-white/70">{user.email}</p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className="w-5 h-5 text-cyan-400" />
                      <h3 className="text-white font-semibold">{t.role}</h3>
                    </div>
                    <p className="text-white/70 capitalize">{user.role || 'User'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites">
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardHeader>
                <CardTitle className="text-white">{t.favorites}</CardTitle>
                <CardDescription className="text-white/70">
                  {t.noFavoritesDesc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* This will be populated in the next step */}
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 text-white/20 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{t.noFavorites}</h3>
                  <p className="text-white/70 mb-6">{t.noFavoritesDesc}</p>
                  <Button className="bg-gradient-to-r from-cyan-400 to-blue-400 text-white">
                    {t.explore}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardHeader>
                <CardTitle className="text-white">{t.settings}</CardTitle>
                <CardDescription className="text-white/70">
                  {locale === 'es'
                    ? 'Administra tus preferencias de cuenta'
                    : 'Manage your account preferences'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* This will be populated with settings options */}
                <p className="text-white/70">
                  {locale === 'es'
                    ? 'Configuración próximamente...'
                    : 'Settings coming soon...'}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
