import { Locale } from '@/lib/i18n'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import UserProfileClient from '@/components/user/UserProfileClient'

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

  return (
    <UserProfileClient
      locale={lang}
      user={{
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        role: session.user.role,
        createdAt: null, // We'll add this from the database later
      }}
    />
  )
}