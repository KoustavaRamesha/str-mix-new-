'use client';

import { products } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

export default function ProductsPage() {
  const standardProducts = products.filter((p) => p.type === 'standard');
  const reinforcedProducts = products.filter((p) => p.type === 'reinforced');
  const heroImage = PlaceHolderImages.find(p => p.id === 'product-standard-commercial');

  return (
    <div className="animate-in fade-in duration-500">
      <section className="relative bg-card py-16 md:py-24">
        {heroImage && (
            <>
                <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={heroImage.imageHint}
                />
                <div className="absolute inset-0 bg-black/60" />
            </>
        )}
        <div className="container relative z-10">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-center text-white">
            Our Concrete Products
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-center text-lg text-white/90">
            We offer a comprehensive range of concrete mixes to meet the diverse needs of any construction project, from simple domestic applications to large-scale commercial structures.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Standard Concrete Mixes</h2>
          <p className="mt-2 text-muted-foreground">Versatile and reliable mixes for a wide variety of applications.</p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {standardProducts.map((product) => {
               const image = PlaceHolderImages.find(p => p.id === product.imageId);
               return (
                <Card key={product.name} className="flex flex-col transition-shadow duration-300 hover:shadow-xl">
                  {image && (
                    <div className="relative aspect-video">
                        <Image src={image.imageUrl} alt={image.description} fill className="object-cover rounded-t-lg" data-ai-hint={image.imageHint} />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="font-headline text-2xl">{product.name} Grade</span>
                      <Badge>{product.strength}</Badge>
                    </CardTitle>
                    <CardDescription>{product.use}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{product.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <Separator className="my-16" />

          <h2 className="font-headline text-3xl md:text-4xl font-bold">Reinforced Concrete Mixes</h2>
          <p className="mt-2 text-muted-foreground">Specially designed mixes for use with steel reinforcement.</p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reinforcedProducts.map((product) => {
              const image = PlaceHolderImages.find(p => p.id === product.imageId);
              return (
                <Card key={product.name} className="flex flex-col bg-primary/10 border-primary/50 transition-shadow duration-300 hover:shadow-xl">
                    {image && (
                        <div className="relative aspect-video">
                            <Image src={image.imageUrl} alt={image.description} fill className="object-cover rounded-t-lg" data-ai-hint={image.imageHint} />
                        </div>
                    )}
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="font-headline text-2xl">{product.name} Grade</span>
                      <Badge variant="destructive" className="bg-accent text-accent-foreground">{product.strength}</Badge>
                    </CardTitle>
                    <CardDescription>{product.use}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{product.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
