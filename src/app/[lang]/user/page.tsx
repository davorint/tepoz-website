import { Locale } from '@/lib/i18n'

interface UsuarioPageProps {
  params: Promise<{ lang: string }>
}

export default async function UsuarioPage({ params }: UsuarioPageProps) {
  const { lang: langParam } = await params
  const lang = langParam as Locale

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        {lang === 'es' ? 'Perfil de Usuario' : 'User Profile'}
      </h1>
      <p className="text-gray-600">
        {lang === 'es'
          ? 'Gestiona tu perfil y preferencias de usuario.'
          : 'Manage your user profile and preferences.'
        }
      </p>
    </div>
  )
}