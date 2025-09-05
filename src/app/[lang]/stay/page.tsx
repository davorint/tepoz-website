import { Locale, getTranslation } from '@/lib/i18n'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default async function StayPage({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}) {
  const { lang } = await params
  const t = getTranslation(lang)

  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-b from-primary/10 to-background py-16">
        <div className="section-container">
          <h1 className="text-center mb-4">{t.stay.title}</h1>
          <p className="text-center text-xl text-muted-foreground max-w-3xl mx-auto">
            {t.stay.subtitle}
          </p>
        </div>
      </section>

      <section className="section-container">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-7">
            <TabsTrigger value="all">{t.stay.categories.all}</TabsTrigger>
            <TabsTrigger value="hotels">{t.stay.categories.hotels}</TabsTrigger>
            <TabsTrigger value="ecoLodges">{t.stay.categories.ecoLodges}</TabsTrigger>
            <TabsTrigger value="vacationRentals">{t.stay.categories.vacationRentals}</TabsTrigger>
            <TabsTrigger value="hostels">{t.stay.categories.hostels}</TabsTrigger>
            <TabsTrigger value="retreats">{t.stay.categories.retreats}</TabsTrigger>
            <TabsTrigger value="camping">{t.stay.categories.camping}</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-8">
            <div className="grid-hotels">
              {[
                { name: 'Casa Fernanda', type: 'Hotel Boutique', price: '$$$', rating: '4.8' },
                { name: 'Amomoxtli', type: 'Eco-Lodge', price: '$$$$', rating: '4.9' },
                { name: 'Posada del Tepozteco', type: 'Hotel', price: '$$', rating: '4.5' },
                { name: 'Casa Isabella', type: 'Vacation Rental', price: '$$$', rating: '4.7' },
                { name: 'Hostal de la Luz', type: 'Hostel', price: '$', rating: '4.3' },
                { name: 'Coatl Retreat', type: 'Wellness Retreat', price: '$$$$', rating: '5.0' },
              ].map((hotel, i) => (
                <Card key={i} className="card-hotel">
                  <div className="aspect-card bg-muted" />
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{hotel.name}</CardTitle>
                        <CardDescription>{hotel.type}</CardDescription>
                      </div>
                      <Badge variant="secondary">{hotel.rating} ⭐</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-semibold">{hotel.price}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {lang === 'es' ? 'Por noche' : 'Per night'}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      {lang === 'es' ? 'Ver Detalles' : 'View Details'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  )
}