'use client';

import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function ServicesPage() {
  const serviceImage = PlaceHolderImages.find(p => p.id === 'service-boom-pump');
  const mixerTruckImage = PlaceHolderImages.find(p => p.id === 'gallery-preview-1');
  const concretePlantImage = PlaceHolderImages.find(p => p.id === 'gallery-8');
  
  const faqs = [
    {
      question: "What is the maximum reach of your boom pumps?",
      answer: "Our fleet includes a variety of boom pumps with different reach capabilities, ranging from 20 meters to over 60 meters. We can select the appropriate pump to meet the specific requirements of your project site."
    },
    {
      question: "Is your team certified to operate the machinery?",
      answer: "Absolutely. All our boom pump operators are fully certified, highly trained, and have extensive experience in a wide range of construction environments. Safety and precision are our top priorities."
    },
    {
      question: "Can boom pumps be used for indoor projects?",
      answer: "Yes, depending on the size of the entrance and the ceiling height, some of our more compact boom pumps can be maneuvered indoors for projects like large-scale flooring or warehouse construction."
    },
    {
      question: "How much notice do you need to book a boom pump service?",
      answer: "We recommend booking as far in advance as possible to ensure availability. However, we can often accommodate short-notice requests. Please contact us to discuss your project timeline."
    }
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <section className="relative h-[50vh] w-full">
        {serviceImage && (
          <Image
            src={serviceImage.imageUrl}
            alt={serviceImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={serviceImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
          <h1 className="font-headline text-4xl md:text-6xl font-bold">
            Our Services
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-primary-foreground/80">
            Precision, efficiency, and reliability for every pour.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <Tabs defaultValue="boom-pump" className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-2">
              <TabsTrigger value="boom-pump">Boom Pump Placement</TabsTrigger>
              <TabsTrigger value="machinery">Our Machinery</TabsTrigger>
            </TabsList>
            <TabsContent value="boom-pump" className="mt-8 animate-in fade-in-0 duration-500">
               <div className="grid lg:grid-cols-5 gap-12">
                  <div className="lg:col-span-3">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold">Boom Pump Concrete Placement</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                      Our premier service involves the use of advanced boom pumps to deliver ready-mix concrete exactly where you need it. This method is ideal for projects with limited access, pours at height, or large surface areas that require rapid and even distribution.
                    </p>
                    <div className="mt-8 space-y-6">
                      <div>
                        <h3 className="font-headline text-xl font-semibold">Key Advantages</h3>
                        <ul className="mt-4 list-disc list-inside space-y-2 text-muted-foreground">
                          <li><strong>Increased Speed & Efficiency:</strong> Pour large volumes of concrete much faster than traditional methods, reducing labor costs and project timelines.</li>
                          <li><strong>Enhanced Accessibility:</strong> The long reach of the boom arm allows concrete to be placed over obstacles, at significant heights, or deep within a building structure.</li>
                          <li><strong>Improved Safety:</strong> Minimizes the need for manual concrete transportation on site, reducing trip hazards and physical strain on workers.</li>
                          <li><strong>Pinpoint Accuracy:</strong> Our skilled operators can place concrete with high precision, minimizing waste and ensuring a cleaner job site.</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-headline text-xl font-semibold">Ideal Applications</h3>
                        <ul className="mt-4 list-disc list-inside space-y-2 text-muted-foreground">
                          <li>High-rise building floors and columns</li>
                          <li>Large foundations and floor slabs for commercial buildings</li>
                          <li>Bridges, tunnels, and infrastructure projects</li>
                          <li>Residential projects with difficult access</li>
                          <li>Swimming pools and retaining walls</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-2">
                    <div className="sticky top-24 rounded-lg bg-card p-8 shadow-lg">
                      <h3 className="font-headline text-2xl font-bold text-center">Frequently Asked Questions</h3>
                      <Accordion type="single" collapsible className="w-full mt-6">
                        {faqs.map((faq, index) => (
                          <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </div>
                </div>
            </TabsContent>
            <TabsContent value="machinery" className="mt-8 animate-in fade-in-0 duration-500">
               <div className="grid md:grid-cols-2 gap-8">
                 <Card>
                    <CardHeader>
                        {concretePlantImage && <Image src={concretePlantImage.imageUrl} alt={concretePlantImage.description} width={600} height={400} className="rounded-t-lg object-cover aspect-video" data-ai-hint={concretePlantImage.imageHint} />}
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="font-headline text-2xl">Batching Plant</CardTitle>
                        <CardDescription className="mt-2 text-muted-foreground">
                            Our fully-automated wet batching plant ensures every mix is produced to exact specifications with unparalleled consistency. Computer-controlled weighing of aggregates, cement, and admixtures guarantees quality from the first cubic meter to the last.
                        </CardDescription>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        {mixerTruckImage && <Image src={mixerTruckImage.imageUrl} alt={mixerTruckImage.description} width={600} height={400} className="rounded-t-lg object-cover aspect-video" data-ai-hint={mixerTruckImage.imageHint} />}
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="font-headline text-2xl">Mixer Truck Fleet</CardTitle>
                        <CardDescription className="mt-2 text-muted-foreground">
                            Our modern fleet of ready-mix trucks, ranging from 6 to 8 cubic meter capacities, are equipped with GPS tracking to ensure timely delivery. The rotating drums keep the concrete in a liquid state, ready for immediate pouring upon arrival at your site.
                        </CardDescription>
                    </CardContent>
                </Card>
               </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
