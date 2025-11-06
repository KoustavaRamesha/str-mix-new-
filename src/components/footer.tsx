import { Logo } from './logo';
import { Phone, MapPin, Instagram, Mail } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t bg-card text-muted-foreground">
      <div className="container py-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-4 text-sm">
              From Tulasi Concretes to STR MIX, building on a legacy of strength since 2005.
            </p>
          </div>
          <div>
            <h4 className="font-headline font-semibold text-foreground">Contact Us</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>Sy.No.:104, Anjanapura, Gollahalli, Bengaluru, Karnataka 560108</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:09741499909" className="hover:text-primary">09741499909</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:strmixconcrete@gmail.com" className="hover:text-primary">strmixconcrete@gmail.com</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-semibold text-foreground">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-primary">Products</Link></li>
              <li><Link href="/services" className="hover:text-primary">Services</Link></li>
              <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-semibold text-foreground">Follow Us</h4>
            <div className="mt-4 flex space-x-4">
              <Link href="https://www.instagram.com/strmix_9/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm">
          <p>&copy; {currentYear} STR MIX Concrete Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
