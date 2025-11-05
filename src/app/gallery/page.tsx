import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function GalleryPage() {
  const galleryImages = PlaceHolderImages.filter(p => p.id.startsWith('gallery-'));
  const heroImage = {
    imageUrl: '/pictures/project gallery.webp',
    description: 'STR MIX project showcase background',
    imageHint: 'project background'
  };

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
            Project Gallery
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-center text-lg text-white/90">
            A visual journey through our diverse portfolio. Witness the quality, scale, and precision of STR MIX in action across various construction projects.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className="group relative h-72 w-full overflow-hidden rounded-lg shadow-lg"
              >
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
                  data-ai-hint={image.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <p className="text-white text-sm font-medium">{image.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
