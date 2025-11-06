import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Milestone, ArrowDown, Star, Heart } from 'lucide-react';
import { Logo } from '@/components/logo';

function OldLogo() {
    return (
        <div className='flex items-center gap-2 font-headline text-2xl font-black tracking-tighter text-foreground/70 transition-opacity hover:opacity-80'>
            <Image
                src="/tulsi.png"
                alt="Tulsi Concretes Logo"
                width={120}
                height={60}
                className="object-contain"
            />
            <span>
                Tulsi<span className="font-medium text-muted-foreground">CONCRETES</span>
            </span>
        </div>
    );
}

export default function AboutPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'gallery-1');

  return (
    <div className="animate-in fade-in duration-500">
      <section className="relative bg-card py-16 md:py-24">
        {heroImage && (
          <>
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              sizes="100vw"
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
            />
            <div className="absolute inset-0 bg-black/60" />
          </>
        )}
        <div className="container relative z-10">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-center text-white">
            About STR MIX
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-center text-lg text-white/90">
            Building on a legacy of strength and reliability, from our foundations as Tulasi Concretes to the future as STR MIX.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-headline text-3xl md:text-4xl font-bold">Our Journey in Concrete</h2>
                <p className="mt-4 text-lg text-muted-foreground text-justify">
                    With over 20 years of experience, Tulsi Concretes has been a cornerstone of strength and reliability in the concrete industry since its establishment in 2005. From humble beginnings, we have grown into one of the most trusted and respected concrete solution providers, proudly serving residential, commercial, and industrial clients across the region.
                </p>
                <p className="mt-4 text-muted-foreground text-justify">
                    Driven by innovation and a passion for excellence, we recently embarked on a new chapter — rebranding as STR Mix. This new identity reflects our continued evolution, integrating modern technology, advanced equipment, and sustainable practices to meet the ever-growing demands of the construction industry.
                </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-6 p-8 bg-background rounded-lg shadow-inner">
                <div className="flex items-center justify-center">
                    <OldLogo />
                </div>
                <ArrowDown className="h-10 w-10 text-primary shrink-0" />
                <div className="flex items-center justify-center">
                    <Image src="/logo.png" alt="STR MIX Logo" width={120} height={60} className="object-contain" />
                    <span className="ml-2 font-headline text-2xl font-black tracking-tighter text-foreground">
                        STR<span className="font-medium text-primary">MIX</span>
                    </span>
                </div>
            </div>
          </div>

           <div className="mt-20 text-center max-w-4xl mx-auto">
             <h3 className="font-headline text-2xl md:text-3xl font-bold">Our Philosophy</h3>
             <p className="mt-4 text-muted-foreground text-justify">
                At STR Mix, we believe that quality is the foundation of every great structure. Our state-of-the-art batching systems, stringent quality assurance processes, and skilled technical team ensure that every mix meets the highest performance and safety standards. We are dedicated to delivering concrete that not only meets specifications but exceeds expectations — every single time.
             </p>
             <p className="mt-4 text-muted-foreground text-justify">
                Over the past two decades, our loyal customer base has been built on trust, consistency, and dependable service. From small-scale residential builds to large infrastructure projects, our clients know they can count on us for timely delivery, customized solutions, and uncompromised quality.
            </p>
             <p className="mt-4 text-muted-foreground text-justify">
                As a 24/7 service provider, STR Mix stands ready around the clock to support your projects whenever you need us. Because at STR Mix, your vision is our foundation — and quality is our promise.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
