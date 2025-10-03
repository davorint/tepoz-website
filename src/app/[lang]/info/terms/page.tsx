'use client'

import { use } from 'react'
import { Locale } from '@/lib/i18n'
import { Card, CardContent } from '@/components/ui/card'
import { FileText, Calendar } from 'lucide-react'

interface TermsPageProps {
  params: Promise<{ lang: Locale }>
}

export default function TermsPage({ params }: TermsPageProps) {
  const { lang } = use(params)

  const content = {
    es: {
      title: 'Términos y Condiciones',
      subtitle: 'Términos de uso para el sitio web de Tepoztlán',
      lastUpdated: 'Última actualización',
      date: '2 de octubre de 2025',
      sections: [
        {
          title: '1. Aceptación de los Términos',
          content: 'Al acceder y utilizar este sitio web, aceptas estar sujeto a estos términos y condiciones de uso. Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestro sitio web.',
        },
        {
          title: '2. Descripción del Servicio',
          content: 'Este sitio web proporciona información sobre Tepoztlán, Morelos, México, incluyendo listados de negocios locales, hoteles, restaurantes, experiencias y actividades. Actuamos como plataforma informativa y directorio, no como agencia de viajes ni proveedor directo de servicios.',
        },
        {
          title: '3. Precisión de la Información',
          content: 'Nos esforzamos por proporcionar información precisa y actualizada. Sin embargo, no garantizamos la exactitud, integridad o vigencia de toda la información presentada. Los precios, horarios y disponibilidad de los negocios pueden cambiar sin previo aviso. Te recomendamos verificar la información directamente con los establecimientos.',
        },
        {
          title: '4. Negocios Listados',
          content: 'Los negocios listados en nuestro sitio son independientes y no están afiliados con nosotros salvo que se indique lo contrario. No somos responsables de la calidad de los servicios, productos o experiencias ofrecidas por estos negocios. Las reseñas y calificaciones son opiniones de usuarios individuales.',
        },
        {
          title: '5. Reservaciones y Transacciones',
          content: 'Actualmente no procesamos reservaciones ni transacciones directamente en nuestro sitio. Cuando proporcionamos enlaces a sitios de terceros o información de contacto, cualquier transacción se realiza directamente entre tú y ese proveedor de servicios. No somos parte de dichas transacciones y no asumimos responsabilidad por ellas.',
        },
        {
          title: '6. Propiedad Intelectual',
          content: 'Todo el contenido de este sitio web, incluyendo textos, gráficos, logos, imágenes y software, está protegido por derechos de autor y otras leyes de propiedad intelectual. No puedes reproducir, distribuir o modificar ningún contenido sin nuestro permiso expreso por escrito.',
        },
        {
          title: '7. Contenido de Usuario',
          content: 'Si envías contenido (como reseñas, comentarios o fotos) a nuestro sitio, nos otorgas una licencia no exclusiva, libre de regalías y perpetua para usar, modificar y mostrar ese contenido. Eres responsable del contenido que publicas y garantizas que no infringe derechos de terceros.',
        },
        {
          title: '8. Enlaces a Sitios de Terceros',
          content: 'Nuestro sitio puede contener enlaces a sitios web de terceros. No tenemos control sobre el contenido o prácticas de estos sitios y no somos responsables de ellos. El acceso a sitios de terceros es bajo tu propio riesgo.',
        },
        {
          title: '9. Limitación de Responsabilidad',
          content: 'En la máxima medida permitida por la ley, no seremos responsables por daños directos, indirectos, incidentales, especiales o consecuentes que resulten del uso o la imposibilidad de usar nuestro sitio web, incluyendo pero no limitado a lesiones personales, pérdida de ganancias o pérdida de datos.',
        },
        {
          title: '10. Indemnización',
          content: 'Aceptas indemnizar y eximir de responsabilidad a nuestro sitio web, sus propietarios, empleados y agentes de cualquier reclamación, pérdida o daño, incluyendo honorarios razonables de abogados, que surjan de tu uso del sitio o violación de estos términos.',
        },
        {
          title: '11. Modificaciones',
          content: 'Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en este sitio. Tu uso continuado del sitio después de cambios constituye tu aceptación de los nuevos términos.',
        },
        {
          title: '12. Ley Aplicable',
          content: 'Estos términos se regirán e interpretarán de acuerdo con las leyes de México, específicamente las leyes del Estado de Morelos. Cualquier disputa relacionada con estos términos estará sujeta a la jurisdicción exclusiva de los tribunales de Morelos.',
        },
        {
          title: '13. Divisibilidad',
          content: 'Si alguna disposición de estos términos se considera inválida o inaplicable, las disposiciones restantes continuarán en pleno vigor y efecto.',
        },
        {
          title: '14. Contacto',
          content: 'Si tienes preguntas sobre estos términos y condiciones, contáctanos en info@tepoztlan.com',
        },
      ],
    },
    en: {
      title: 'Terms and Conditions',
      subtitle: 'Terms of use for the Tepoztlán website',
      lastUpdated: 'Last updated',
      date: 'October 2, 2025',
      sections: [
        {
          title: '1. Acceptance of Terms',
          content: 'By accessing and using this website, you agree to be bound by these terms and conditions of use. If you do not agree with any part of these terms, you should not use our website.',
        },
        {
          title: '2. Description of Service',
          content: 'This website provides information about Tepoztlán, Morelos, Mexico, including listings of local businesses, hotels, restaurants, experiences, and activities. We act as an informational platform and directory, not as a travel agency or direct service provider.',
        },
        {
          title: '3. Information Accuracy',
          content: 'We strive to provide accurate and up-to-date information. However, we do not guarantee the accuracy, completeness, or currentness of all information presented. Prices, hours, and availability of businesses may change without notice. We recommend verifying information directly with establishments.',
        },
        {
          title: '4. Listed Businesses',
          content: 'Businesses listed on our site are independent and not affiliated with us unless otherwise stated. We are not responsible for the quality of services, products, or experiences offered by these businesses. Reviews and ratings are opinions of individual users.',
        },
        {
          title: '5. Reservations and Transactions',
          content: "We do not currently process reservations or transactions directly on our site. When we provide links to third-party sites or contact information, any transactions are conducted directly between you and that service provider. We are not party to such transactions and assume no responsibility for them.",
        },
        {
          title: '6. Intellectual Property',
          content: 'All content on this website, including text, graphics, logos, images, and software, is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or modify any content without our express written permission.',
        },
        {
          title: '7. User Content',
          content: 'If you submit content (such as reviews, comments, or photos) to our site, you grant us a non-exclusive, royalty-free, perpetual license to use, modify, and display that content. You are responsible for the content you post and warrant that it does not infringe on third-party rights.',
        },
        {
          title: '8. Third-Party Links',
          content: 'Our site may contain links to third-party websites. We have no control over the content or practices of these sites and are not responsible for them. Access to third-party sites is at your own risk.',
        },
        {
          title: '9. Limitation of Liability',
          content: 'To the maximum extent permitted by law, we shall not be liable for direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our website, including but not limited to personal injury, loss of profits, or loss of data.',
        },
        {
          title: '10. Indemnification',
          content: 'You agree to indemnify and hold harmless our website, its owners, employees, and agents from any claims, losses, or damages, including reasonable attorney fees, arising from your use of the site or violation of these terms.',
        },
        {
          title: '11. Modifications',
          content: 'We reserve the right to modify these terms at any time. Modifications will take effect immediately upon posting on this site. Your continued use of the site after changes constitutes your acceptance of the new terms.',
        },
        {
          title: '12. Governing Law',
          content: 'These terms shall be governed by and construed in accordance with the laws of Mexico, specifically the laws of the State of Morelos. Any disputes related to these terms shall be subject to the exclusive jurisdiction of the courts of Morelos.',
        },
        {
          title: '13. Severability',
          content: 'If any provision of these terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.',
        },
        {
          title: '14. Contact',
          content: 'If you have questions about these terms and conditions, contact us at info@tepoztlan.com',
        },
      ],
    },
  }

  const t = content[lang]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-gray-50 to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-700 to-gray-700 text-white py-16">
        <div className="absolute inset-0 bg-[url('/images/tepoztlan-pattern.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <FileText className="w-16 h-16 mx-auto mb-6" />
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

        {/* Terms Content */}
        <Card>
          <CardContent className="p-8">
            <div className="space-y-8">
              {t.sections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {section.title}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Footer Links */}
        <div className="mt-8 text-center space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            {lang === 'es'
              ? '¿Tienes preguntas sobre estos términos?'
              : 'Have questions about these terms?'}
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href={`/${lang}/info/contact`}
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              {lang === 'es' ? 'Contáctanos' : 'Contact Us'}
            </a>
            <span className="text-gray-400">•</span>
            <a
              href={`/${lang}/info/privacy`}
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              {lang === 'es' ? 'Política de Privacidad' : 'Privacy Policy'}
            </a>
            <span className="text-gray-400">•</span>
            <a
              href={`/${lang}/info/faq`}
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              {lang === 'es' ? 'Preguntas Frecuentes' : 'FAQ'}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
