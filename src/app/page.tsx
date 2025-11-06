import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, Building, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { products } from '@/lib/data';
import type { Testimonial } from './api/testimonials/route';

export default async function Home() {
  const heroImage = {
    imageUrl: '/pictures/Screenshot 2025-10-31 202427.png',
    description: 'STR MIX home page hero background',
    imageHint: 'hero background'
  };
  const serviceImage = PlaceHolderImages.find(p => p.id === 'service-boom-pump-small');
  const galleryImages = PlaceHolderImages.filter(p => p.id.startsWith('gallery-preview'));

  let testimonials: Testimonial[] = [];
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9002'}/api/testimonials`;
    console.log('Fetching testimonials from:', apiUrl);

    const response = await fetch(apiUrl, {
      cache: 'no-store' // Ensure fresh data on each request
    });

    console.log('API response status:', response.status);

    if (response.ok) {
      testimonials = await response.json();
      console.log('Fetched testimonials count:', testimonials.length);
    } else {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      // Fallback to direct file read for debugging
      console.log('Falling back to direct file read...');
      try {
        const fs = await import('fs/promises');
        const path = await import('path');

        // Try production reviews file first
        let reviewsPath = path.join(process.cwd(), 'reviews.json');
        try {
          const data = await fs.readFile(reviewsPath, 'utf-8');
          testimonials = JSON.parse(data);
          console.log('API fallback successful, loaded testimonials:', testimonials.length);
        } catch (prodError) {
          // Fall back to development reviews file
          reviewsPath = path.join(process.cwd(), 'src/lib/reviews.json');
          const data = await fs.readFile(reviewsPath, 'utf-8');
          testimonials = JSON.parse(data);
          console.log('API fallback successful, loaded testimonials:', testimonials.length);
        }
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
      }
    }
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    // Fallback to direct file read
    try {
      const fs = await import('fs/promises');
      const path = await import('path');

      // Try production reviews file first
      let reviewsPath = path.join(process.cwd(), 'reviews.json');
      try {
        const data = await fs.readFile(reviewsPath, 'utf-8');
        testimonials = JSON.parse(data);
        console.log('Production fallback successful, loaded testimonials:', testimonials.length);
      } catch (prodError) {
        // Fall back to development reviews file
        reviewsPath = path.join(process.cwd(), 'src/lib/reviews.json');
        const data = await fs.readFile(reviewsPath, 'utf-8');
        testimonials = JSON.parse(data);
        console.log('Development fallback successful, loaded testimonials:', testimonials.length);
      }
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError);
    }
  }

  return (
    <div className="flex flex-col animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            sizes="100vw"
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
          <h1 className="font-headline text-4xl md:text-6xl font-bold">
            Building the Foundations of Tomorrow
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-white/90">
            STR MIX delivers premium ready-mix concrete and expert boom pump services for projects of any scale.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/contact">
              Get a Free Quote <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* About Us Preview */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className='order-2 lg:order-1'>
              <h2 className="font-headline text-3xl md:text-4xl font-bold">Our Journey in Concrete</h2>
              <p className="mt-4 text-muted-foreground text-lg text-justify">
                With over 20 years of experience, Tulsi Concretes has been a cornerstone of strength and reliability in the concrete industry since its establishment in 2005. From humble beginnings, we have grown into one of the most trusted and respected concrete solution providers, proudly serving residential, commercial, and industrial clients across the region.
              </p>
              <p className="mt-2 text-muted-foreground text-justify">
                Driven by innovation and a passion for excellence, we recently embarked on a new chapter — rebranding as STR Mix. This new identity reflects our continued evolution, integrating modern technology, advanced equipment, and sustainable practices to meet the ever-growing demands of the construction industry.
              </p>

              <h3 className="font-headline text-2xl md:text-3xl font-bold mt-8">Our Philosophy</h3>
              <p className="mt-4 text-muted-foreground text-justify">
                At STR Mix, we believe that quality is the foundation of every great structure. Our state-of-the-art batching systems, stringent quality assurance processes, and skilled technical team ensure that every mix meets the highest performance and safety standards. We are dedicated to delivering concrete that not only meets specifications but exceeds expectations — every single time.
              </p>
              <p className="mt-2 text-muted-foreground text-justify">
                Over the past two decades, our loyal customer base has been built on trust, consistency, and dependable service. From small-scale residential builds to large infrastructure projects, our clients know they can count on us for timely delivery, customized solutions, and uncompromised quality.
              </p>
              <p className="mt-2 text-muted-foreground text-justify">
                As a 24/7 service provider, STR Mix stands ready around the clock to support your projects whenever you need us. Because at STR Mix, your vision is our foundation — and quality is our promise.
              </p>
              <div className="text-center mt-8">
                <Button asChild variant="outline">
                  <Link href="/about">Learn More About Our Story</Link>
                </Button>
              </div>
            </div>
            <div className='order-1 lg:order-2 grid grid-cols-2 gap-4'>
                <div className="flex flex-col items-center justify-center p-6 bg-background rounded-lg text-center shadow">
                    <Image
                        src="/tulsi-logo.jpg"
                        alt="Tulsi Concretes Logo"
                        width={120}
                        height={60}
                        className="object-contain"
                    />
                    <p className="mt-2 text-4xl font-bold font-headline text-primary">2005</p>
                    <p className="text-sm text-muted-foreground">Tulasi Concretes Founded</p>
                </div>
                <div className="flex flex-col items-center justify-center p-6 bg-background rounded-lg text-center shadow">
                    <Image
                        src="/logo.png"
                        alt="STR MIX Logo"
                        width={120}
                        height={60}
                        className="object-contain"
                    />
                    <p className="mt-2 text-4xl font-bold font-headline text-primary">2025</p>
                    <p className="text-sm text-muted-foreground">Rebranded to STR MIX</p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Our Concrete Products</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              From foundational work to specialized applications, we have the right mix for you.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product) => (
              <Card key={product.name} className="flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="font-headline">{product.name} Grade</span>
                    <Badge variant="secondary">{product.strength}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{product.use}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-lg overflow-hidden shadow-lg">
            {serviceImage && (
              <Image
                src={serviceImage.imageUrl}
                alt={serviceImage.description}
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                data-ai-hint={serviceImage.imageHint}
              />
            )}
          </div>
          <div>
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Efficient Boom Pump Services</h2>
            <p className="mt-4 text-muted-foreground">
              Our state-of-the-art boom pumps allow for precise and rapid concrete placement, even in the most challenging locations. Save time and labor costs on your next project with STR MIX.
            </p>
            <ul className="mt-6 space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">✓ Vertical and horizontal reach</li>
              <li className="flex items-center gap-2">✓ Suitable for high-rise buildings and large slabs</li>
              <li className="flex items-center gap-2">✓ Operated by certified professionals</li>
            </ul>
            <Button asChild className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/services">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Gallery Preview */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Project Showcase</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              See the quality and scale of our work in action.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((image) => (
              <div key={image.id} className="relative aspect-square overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                  data-ai-hint={image.imageHint}
                />
              </div>
            ))}
          </div>
           <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/gallery">Explore Gallery</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">What Our Clients Say</h2>
          </div>
          <Carousel
            opts={{ align: 'start', loop: true }}
            className="w-full max-w-4xl mx-auto mt-12"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-video flex-col justify-center p-6">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < (testimonial.rating || 5)
                                  ? 'text-primary fill-primary'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="mt-4 text-muted-foreground italic">"{testimonial.quote}"</p>
                        <p className="mt-4 font-bold text-right">- {testimonial.author}</p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </div>
  );
}
