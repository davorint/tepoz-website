'use client'

import { use } from 'react'
import { Locale } from '@/lib/i18n'
import { Card, CardContent } from '@/components/ui/card'
import { Shield, Calendar, Lock, Eye, Cookie, Database, Mail } from 'lucide-react'

interface PrivacyPageProps {
  params: Promise<{ lang: Locale }>
}

export default function PrivacyPage({ params }: PrivacyPageProps) {
  const { lang } = use(params)

  const content = {
    es: {
      title: 'Política de Privacidad',
      subtitle: 'Cómo recopilamos, usamos y protegemos tu información',
      lastUpdated: 'Última actualización',
      date: '2 de octubre de 2025',
      intro: 'En Tepoztlán.com, respetamos tu privacidad y nos comprometemos a proteger tu información personal. Esta política describe cómo recopilamos, usamos y compartimos información cuando visitas nuestro sitio web.',
      sections: [
        {
          icon: Database,
          title: '1. Información que Recopilamos',
          subsections: [
            {
              subtitle: 'Información que Proporcionas',
              content: 'Cuando te contactas con nosotros, envías una reseña o te suscribes a nuestro boletín, recopilamos información como tu nombre, dirección de correo electrónico, número de teléfono y el contenido de tus mensajes.',
            },
            {
              subtitle: 'Información Automática',
              content: 'Recopilamos automáticamente cierta información sobre tu dispositivo cuando visitas nuestro sitio, incluyendo dirección IP, tipo de navegador, sistema operativo, páginas visitadas y la hora de tu visita.',
            },
            {
              subtitle: 'Cookies y Tecnologías Similares',
              content: 'Utilizamos cookies y tecnologías similares para mejorar tu experiencia, analizar el tráfico del sitio y personalizar contenido. Puedes controlar las cookies a través de la configuración de tu navegador.',
            },
          ],
        },
        {
          icon: Eye,
          title: '2. Cómo Usamos tu Información',
          content: 'Utilizamos tu información para: proporcionar y mejorar nuestros servicios, responder a tus consultas, enviar actualizaciones y newsletters (con tu consentimiento), analizar el uso del sitio web para mejorar la experiencia del usuario, proteger contra fraudes y actividades maliciosas, y cumplir con obligaciones legales.',
        },
        {
          icon: Lock,
          title: '3. Cómo Compartimos tu Información',
          content: 'No vendemos tu información personal a terceros. Podemos compartir tu información en las siguientes circunstancias: con proveedores de servicios que nos ayudan a operar nuestro sitio web (como servicios de hosting y análisis), cuando sea requerido por ley o para proteger nuestros derechos, con tu consentimiento explícito, o en conexión con una fusión, adquisición o venta de activos (con notificación previa).',
        },
        {
          icon: Cookie,
          title: '4. Cookies y Seguimiento',
          subsections: [
            {
              subtitle: 'Tipos de Cookies que Usamos',
              content: 'Cookies esenciales (necesarias para el funcionamiento del sitio), cookies de análisis (para entender cómo se usa el sitio), cookies de funcionalidad (para recordar tus preferencias), y cookies de marketing (con tu consentimiento).',
            },
            {
              subtitle: 'Control de Cookies',
              content: 'Puedes configurar tu navegador para rechazar cookies, pero esto puede afectar la funcionalidad del sitio. La mayoría de los navegadores aceptan cookies automáticamente, pero puedes modificar esta configuración.',
            },
          ],
        },
        {
          icon: Shield,
          title: '5. Seguridad de Datos',
          content: 'Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal contra acceso no autorizado, alteración, divulgación o destrucción. Sin embargo, ningún método de transmisión por Internet o almacenamiento electrónico es 100% seguro.',
        },
        {
          icon: Database,
          title: '6. Retención de Datos',
          content: 'Conservamos tu información personal solo durante el tiempo necesario para cumplir con los propósitos descritos en esta política, a menos que un período de retención más largo sea requerido o permitido por ley.',
        },
        {
          title: '7. Tus Derechos',
          content: 'Dependiendo de tu ubicación, puedes tener ciertos derechos respecto a tu información personal, incluyendo: acceso a tu información personal, corrección de información inexacta, eliminación de tu información (derecho al olvido), restricción del procesamiento, portabilidad de datos, y objeción al procesamiento. Para ejercer estos derechos, contáctanos en info@tepoztlan.com.',
        },
        {
          title: '8. Enlaces a Terceros',
          content: 'Nuestro sitio puede contener enlaces a sitios web de terceros. No somos responsables de las prácticas de privacidad de estos sitios. Te recomendamos leer las políticas de privacidad de cualquier sitio web de terceros que visites.',
        },
        {
          title: '9. Privacidad de Niños',
          content: 'Nuestro sitio no está dirigido a menores de 18 años. No recopilamos conscientemente información personal de niños. Si descubres que un niño nos ha proporcionado información personal, contáctanos para que podamos eliminarla.',
        },
        {
          title: '10. Transferencias Internacionales',
          content: 'Tu información puede ser transferida y procesada en países distintos a tu país de residencia. Estos países pueden tener diferentes leyes de protección de datos. Al usar nuestro sitio, consientes estas transferencias.',
        },
        {
          title: '11. Cambios a esta Política',
          content: 'Podemos actualizar esta política de privacidad periódicamente. Te notificaremos sobre cambios significativos publicando la nueva política en esta página y actualizando la fecha de "Última actualización". Te recomendamos revisar esta política regularmente.',
        },
        {
          icon: Mail,
          title: '12. Contacto',
          content: 'Si tienes preguntas, inquietudes o solicitudes sobre esta política de privacidad o cómo manejamos tu información personal, contáctanos en: info@tepoztlan.com',
        },
      ],
    },
    en: {
      title: 'Privacy Policy',
      subtitle: 'How we collect, use, and protect your information',
      lastUpdated: 'Last updated',
      date: 'October 2, 2025',
      intro: 'At Tepoztlán.com, we respect your privacy and are committed to protecting your personal information. This policy describes how we collect, use, and share information when you visit our website.',
      sections: [
        {
          icon: Database,
          title: '1. Information We Collect',
          subsections: [
            {
              subtitle: 'Information You Provide',
              content: 'When you contact us, submit a review, or subscribe to our newsletter, we collect information such as your name, email address, phone number, and the content of your messages.',
            },
            {
              subtitle: 'Automatic Information',
              content: 'We automatically collect certain information about your device when you visit our site, including IP address, browser type, operating system, pages visited, and the time of your visit.',
            },
            {
              subtitle: 'Cookies and Similar Technologies',
              content: 'We use cookies and similar technologies to enhance your experience, analyze site traffic, and personalize content. You can control cookies through your browser settings.',
            },
          ],
        },
        {
          icon: Eye,
          title: '2. How We Use Your Information',
          content: 'We use your information to: provide and improve our services, respond to your inquiries, send updates and newsletters (with your consent), analyze website usage to improve user experience, protect against fraud and malicious activities, and comply with legal obligations.',
        },
        {
          icon: Lock,
          title: '3. How We Share Your Information',
          content: 'We do not sell your personal information to third parties. We may share your information in the following circumstances: with service providers who help us operate our website (such as hosting and analytics services), when required by law or to protect our rights, with your explicit consent, or in connection with a merger, acquisition, or asset sale (with prior notice).',
        },
        {
          icon: Cookie,
          title: '4. Cookies and Tracking',
          subsections: [
            {
              subtitle: 'Types of Cookies We Use',
              content: 'Essential cookies (necessary for site operation), analytics cookies (to understand how the site is used), functionality cookies (to remember your preferences), and marketing cookies (with your consent).',
            },
            {
              subtitle: 'Cookie Control',
              content: 'You can set your browser to reject cookies, but this may affect site functionality. Most browsers accept cookies automatically, but you can modify this setting.',
            },
          ],
        },
        {
          icon: Shield,
          title: '5. Data Security',
          content: 'We implement technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of Internet transmission or electronic storage is 100% secure.',
        },
        {
          icon: Database,
          title: '6. Data Retention',
          content: 'We retain your personal information only as long as necessary to fulfill the purposes described in this policy, unless a longer retention period is required or permitted by law.',
        },
        {
          title: '7. Your Rights',
          content: 'Depending on your location, you may have certain rights regarding your personal information, including: access to your personal information, correction of inaccurate information, deletion of your information (right to be forgotten), restriction of processing, data portability, and objection to processing. To exercise these rights, contact us at info@tepoztlan.com.',
        },
        {
          title: '8. Third-Party Links',
          content: 'Our site may contain links to third-party websites. We are not responsible for the privacy practices of these sites. We recommend reading the privacy policies of any third-party websites you visit.',
        },
        {
          title: '9. Children\'s Privacy',
          content: 'Our site is not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If you discover that a child has provided us with personal information, contact us so we can delete it.',
        },
        {
          title: '10. International Transfers',
          content: 'Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. By using our site, you consent to these transfers.',
        },
        {
          title: '11. Changes to This Policy',
          content: 'We may update this privacy policy periodically. We will notify you of significant changes by posting the new policy on this page and updating the "Last updated" date. We recommend reviewing this policy regularly.',
        },
        {
          icon: Mail,
          title: '12. Contact',
          content: 'If you have questions, concerns, or requests about this privacy policy or how we handle your personal information, contact us at: info@tepoztlan.com',
        },
      ],
    },
  }

  const t = content[lang]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="absolute inset-0 bg-[url('/images/tepoztlan-pattern.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Shield className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-4">{t.title}</h1>
            <p className="text-xl opacity-90">{t.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Last Updated */}
        <Card className="mb-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <Calendar className="w-5 h-5" />
              <span className="font-semibold">{t.lastUpdated}:</span>
              <span>{t.date}</span>
            </div>
          </CardContent>
        </Card>

        {/* Introduction */}
        <Card className="mb-8 border-2 border-blue-200 dark:border-blue-800">
          <CardContent className="p-8">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {t.intro}
            </p>
          </CardContent>
        </Card>

        {/* Privacy Content */}
        <div className="space-y-6">
          {t.sections.map((section, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  {section.icon && (
                    <section.icon className="w-8 h-8 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                  )}
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex-1">
                    {section.title}
                  </h2>
                </div>

                {section.content && (
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    {section.content}
                  </p>
                )}

                {section.subsections && (
                  <div className="space-y-4 mt-4">
                    {section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex} className="pl-4 border-l-4 border-blue-200 dark:border-blue-800">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                          {subsection.subtitle}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {subsection.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* GDPR/CCPA Notice */}
        <Card className="mt-8 bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">
              {lang === 'es' ? 'Tus Derechos de Privacidad' : 'Your Privacy Rights'}
            </h3>
            <p className="text-white/90 mb-4">
              {lang === 'es'
                ? 'Tienes derecho a acceder, corregir o eliminar tu información personal. Si tienes preguntas o deseas ejercer tus derechos, contáctanos.'
                : 'You have the right to access, correct, or delete your personal information. If you have questions or wish to exercise your rights, contact us.'}
            </p>
            <a href={`/${lang}/info/contact`}>
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                {lang === 'es' ? 'Contáctanos' : 'Contact Us'}
              </button>
            </a>
          </CardContent>
        </Card>

        {/* Footer Links */}
        <div className="mt-8 text-center space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            {lang === 'es'
              ? '¿Tienes preguntas sobre nuestra política de privacidad?'
              : 'Have questions about our privacy policy?'}
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href={`/${lang}/info/terms`}
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              {lang === 'es' ? 'Términos y Condiciones' : 'Terms & Conditions'}
            </a>
            <span className="text-gray-400">•</span>
            <a
              href={`/${lang}/info/faq`}
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              {lang === 'es' ? 'Preguntas Frecuentes' : 'FAQ'}
            </a>
            <span className="text-gray-400">•</span>
            <a
              href={`/${lang}/info/contact`}
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              {lang === 'es' ? 'Contacto' : 'Contact'}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
