import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

// Language detection based on document specification Section 2.1
async function detectLanguage(): Promise<'es' | 'en'> {
  const headersList = await headers()
  const acceptLanguage = headersList.get('accept-language') || ''
  
  // Check browser language preference
  if (acceptLanguage.includes('es') || acceptLanguage.includes('ES')) {
    return 'es'
  }
  
  // Default for international users
  return 'en'
}

export default async function RootPage() {
  // Automatic language detection and redirect as per specification
  const detectedLang = await detectLanguage()
  redirect(`/${detectedLang}`)
}
