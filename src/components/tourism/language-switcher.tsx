'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter, usePathname } from "next/navigation"

const languages = [
  { code: 'es', name: 'Español', flag: '🇲🇽' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
]

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  
  // Extract current language from pathname
  const currentLang = pathname.startsWith('/es') ? 'es' : 'en'

  const handleLanguageChange = (newLang: string) => {
    // Remove current language prefix and add new one
    const pathWithoutLang = pathname.replace(/^\/(es|en)/, '')
    const newPath = `/${newLang}${pathWithoutLang}`
    router.push(newPath)
  }

  return (
    <Select value={currentLang} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-auto">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <div className="flex items-center gap-2">
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}