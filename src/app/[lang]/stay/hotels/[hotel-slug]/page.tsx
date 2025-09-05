import { Locale } from '@/lib/i18n'

interface HotelPageProps {
  params: Promise<{ 
    lang: Locale
    'hotel-slug': string
  }>
}

export default async function HotelPage({ params }: HotelPageProps) {
  const { lang, 'hotel-slug': hotelSlug } = await params

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Hotel Details</h1>
      <p>Hotel: {hotelSlug}</p>
      <p>Language: {lang}</p>
      {/* TODO: Implement hotel detail component */}
    </div>
  )
}