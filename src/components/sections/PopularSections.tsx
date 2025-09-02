'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Locale } from '@/lib/i18n'

interface PopularSectionsProps {
  lang: Locale
  translations: any
}

export default function PopularSections({ lang, translations }: PopularSectionsProps) {
  return (
    <section className="section-container">
      <Tabs defaultValue="attractions" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="attractions">{translations.home.sections.attractions}</TabsTrigger>
          <TabsTrigger value="hotels">{translations.home.sections.hotels}</TabsTrigger>
          <TabsTrigger value="restaurants">{translations.home.sections.restaurants}</TabsTrigger>
          <TabsTrigger value="events">{translations.home.sections.events}</TabsTrigger>
          <TabsTrigger value="experiences">{translations.home.sections.experiences}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="attractions" className="mt-6">
          <div className="grid-attractions">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="card-attraction">
                <div className="aspect-card bg-muted" />
                <CardHeader>
                  <CardTitle>Attraction {i}</CardTitle>
                  <CardDescription>Description of the attraction</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary">Popular</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="hotels" className="mt-6">
          <div className="grid-hotels">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="card-hotel">
                <div className="aspect-card bg-muted" />
                <CardHeader>
                  <CardTitle>Hotel {i}</CardTitle>
                  <CardDescription>Luxury accommodation</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline">5 stars</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="restaurants" className="mt-6">
          <div className="grid-restaurants">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="card-restaurant">
                <div className="aspect-card bg-muted" />
                <CardHeader>
                  <CardTitle>Restaurant {i}</CardTitle>
                  <CardDescription>Mexican cuisine</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge>Open Now</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="events" className="mt-6">
          <div className="grid-attractions">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>Event {i}</CardTitle>
                  <CardDescription>Upcoming festival</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="accent">This Weekend</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="experiences" className="mt-6">
          <div className="grid-attractions">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="card-attraction">
                <div className="aspect-card bg-muted" />
                <CardHeader>
                  <CardTitle>Experience {i}</CardTitle>
                  <CardDescription>Unique adventure</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary">Must Try</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}