import { Locale } from '@/lib/i18n'

interface ExperiencePageProps {
  params: Promise<{ 
    lang: Locale
    'experience-slug': string
  }>
}

export default async function ExperiencePage({ params }: ExperiencePageProps) {
  const { lang, 'experience-slug': experienceSlug } = await params

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Experience Details</h1>
      <p>Experience: {experienceSlug}</p>
      <p>Language: {lang}</p>
      {/* TODO: Implement experience detail component */}
    </div>
  )
}