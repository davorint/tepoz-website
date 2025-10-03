'use client'

import { use, useState } from 'react'
import { Locale } from '@/lib/i18n'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, User, Building2 } from 'lucide-react'

interface ContactPageProps {
  params: Promise<{ lang: Locale }>
}

export default function ContactPage({ params }: ContactPageProps) {
  const { lang } = use(params)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    type: 'general' // general, business, partnership
  })

  const content = {
    es: {
      title: 'Contáctanos',
      subtitle: 'Estamos aquí para ayudarte a planear tu visita perfecta a Tepoztlán',
      form: {
        title: 'Envíanos un Mensaje',
        name: 'Nombre',
        namePlaceholder: 'Tu nombre completo',
        email: 'Correo Electrónico',
        emailPlaceholder: 'tu@email.com',
        phone: 'Teléfono',
        phonePlaceholder: '+52 777 123 4567',
        subject: 'Asunto',
        subjectPlaceholder: '¿En qué podemos ayudarte?',
        message: 'Mensaje',
        messagePlaceholder: 'Cuéntanos más sobre tu consulta...',
        type: 'Tipo de Consulta',
        typeGeneral: 'Consulta General',
        typeBusiness: 'Soy un Negocio',
        typePartnership: 'Asociación/Colaboración',
        submit: 'Enviar Mensaje',
        required: 'Campo requerido',
      },
      contact: {
        title: 'Información de Contacto',
        email: 'info@tepoztlan.com',
        phone: '+52 739 395 0329',
        whatsapp: '+52 739 395 0329',
        address: 'Tepoztlán, Morelos, México',
        hours: 'Lun - Dom: 9:00 AM - 6:00 PM',
      },
      business: {
        title: '¿Tienes un Negocio en Tepoztlán?',
        description: 'Si eres propietario de un negocio local y quieres aparecer en nuestro directorio, nos encantaría saber de ti.',
        cta: 'Contactar para Negocios',
      },
      response: {
        title: 'Tiempo de Respuesta',
        description: 'Generalmente respondemos en 24-48 horas durante días hábiles.',
      },
    },
    en: {
      title: 'Contact Us',
      subtitle: "We're here to help you plan your perfect visit to Tepoztlán",
      form: {
        title: 'Send Us a Message',
        name: 'Name',
        namePlaceholder: 'Your full name',
        email: 'Email',
        emailPlaceholder: 'you@email.com',
        phone: 'Phone',
        phonePlaceholder: '+52 777 123 4567',
        subject: 'Subject',
        subjectPlaceholder: 'How can we help you?',
        message: 'Message',
        messagePlaceholder: 'Tell us more about your inquiry...',
        type: 'Inquiry Type',
        typeGeneral: 'General Inquiry',
        typeBusiness: "I'm a Business",
        typePartnership: 'Partnership/Collaboration',
        submit: 'Send Message',
        required: 'Required field',
      },
      contact: {
        title: 'Contact Information',
        email: 'info@tepoztlan.com',
        phone: '+52 739 395 0329',
        whatsapp: '+52 739 395 0329',
        address: 'Tepoztlán, Morelos, Mexico',
        hours: 'Mon - Sun: 9:00 AM - 6:00 PM',
      },
      business: {
        title: 'Do You Have a Business in Tepoztlán?',
        description: "If you're a local business owner and want to be featured in our directory, we'd love to hear from you.",
        cta: 'Contact for Business',
      },
      response: {
        title: 'Response Time',
        description: 'We typically respond within 24-48 hours on business days.',
      },
    },
  }

  const t = content[lang]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create mailto link with form data
    const subject = encodeURIComponent(`${formData.subject} - ${formData.type}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Type: ${formData.type}\n\n` +
      `Message:\n${formData.message}`
    )

    window.location.href = `mailto:${t.contact.email}?subject=${subject}&body=${body}`
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-amber-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="absolute inset-0 bg-[url('/images/tepoztlan-pattern.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Mail className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-4">{t.title}</h1>
            <p className="text-xl opacity-90">{t.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-2 border-orange-200 dark:border-orange-900">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  {t.form.title}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-900 dark:text-white">
                      {t.form.name} *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t.form.namePlaceholder}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-900 dark:text-white">
                      {t.form.email} *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t.form.emailPlaceholder}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-900 dark:text-white">
                      {t.form.phone}
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t.form.phonePlaceholder}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Type */}
                  <div className="space-y-2">
                    <Label htmlFor="type" className="text-gray-900 dark:text-white">
                      {t.form.type}
                    </Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="general">{t.form.typeGeneral}</option>
                        <option value="business">{t.form.typeBusiness}</option>
                        <option value="partnership">{t.form.typePartnership}</option>
                      </select>
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-gray-900 dark:text-white">
                      {t.form.subject} *
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={t.form.subjectPlaceholder}
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-900 dark:text-white">
                      {t.form.message} *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t.form.messagePlaceholder}
                      rows={6}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 text-lg"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    {t.form.submit}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {t.contact.title}
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <a href={`mailto:${t.contact.email}`} className="text-gray-900 dark:text-white hover:text-orange-500">
                        {t.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {lang === 'es' ? 'Teléfono' : 'Phone'}
                      </p>
                      <a href={`tel:${t.contact.phone}`} className="text-gray-900 dark:text-white hover:text-orange-500">
                        {t.contact.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MessageCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">WhatsApp</p>
                      <a
                        href={`https://wa.me/${t.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-900 dark:text-white hover:text-orange-500"
                      >
                        {t.contact.whatsapp}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {lang === 'es' ? 'Ubicación' : 'Location'}
                      </p>
                      <p className="text-gray-900 dark:text-white">{t.contact.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {lang === 'es' ? 'Horario' : 'Hours'}
                      </p>
                      <p className="text-gray-900 dark:text-white">{t.contact.hours}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {t.response.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {t.response.description}
                </p>
              </CardContent>
            </Card>

            {/* Business CTA */}
            <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">
                  {t.business.title}
                </h3>
                <p className="text-white/90 text-sm mb-4">
                  {t.business.description}
                </p>
                <a href={`mailto:${t.contact.email}?subject=${encodeURIComponent(lang === 'es' ? 'Consulta de Negocio' : 'Business Inquiry')}`}>
                  <Button className="w-full bg-white text-orange-600 hover:bg-gray-100">
                    {t.business.cta}
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
