import { Locale } from '@/lib/i18n'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import UserProfileClient from '@/components/user/UserProfileClient'
import { getUserFavorites } from '@/lib/actions/favorites'

interface UsuarioPageProps {
  params: Promise<{ lang: string }>
}

export default async function UsuarioPage({ params }: UsuarioPageProps) {
  const { lang: langParam } = await params
  const lang = langParam as Locale

  const session = await auth()

  if (!session?.user) {
    redirect(`/${lang}/auth/signin`)
  }

  // Fetch user's favorites
  const favoritesResult = await getUserFavorites(session.user.id)
  const favoriteBusinessIds = favoritesResult.success
    ? favoritesResult.favorites.map((f) => f.businessId)
    : []

  return (
    <UserProfileClient
      locale={lang}
      user={{
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        role: session.user.role,
        createdAt: null,
      }}
      favoriteBusinessIds={favoriteBusinessIds}
    />
  )
}