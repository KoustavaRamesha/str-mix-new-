'use client';

import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useActionState } from 'react';
import Image from 'next/image';
import { Phone, Clock, MapPin, Instagram, Mail } from 'lucide-react';
import Link from 'next/link';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { handleContactSubmission, handleReviewSubmission } from './actions';
import { StarRating } from '@/components/star-rating';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject must be at least 3 characters.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

const reviewSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  rating: z.coerce.number().min(1, "Please select a rating.").max(5),
  review: z.string().min(10, 'Review must be at least 10 characters.'),
});

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
      {pending ? 'Submitting...' : children}
    </Button>
  );
}

function ContactForm() {
  const { toast } = useToast();
  const [formState, formAction] = useActionState(handleContactSubmission, {
    message: '',
    success: false,
  });

  useEffect(() => {
    if (formState.message) {
      toast({
        title: formState.success ? 'Success!' : 'Error',
        description: formState.message,
        variant: formState.success ? 'default' : 'destructive',
      });
    }
  }, [formState, toast]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required />
          {formState.errors?.name && <p className="text-sm text-destructive">{formState.errors.name[0]}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
          {formState.errors?.email && <p className="text-sm text-destructive">{formState.errors.email[0]}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone (Optional)</Label>
        <Input id="phone" name="phone" type="tel" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" name="subject" required />
        {formState.errors?.subject && <p className="text-sm text-destructive">{formState.errors.subject[0]}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" rows={5} required />
        {formState.errors?.message && <p className="text-sm text-destructive">{formState.errors.message[0]}</p>}
      </div>
      <SubmitButton>Send Message</SubmitButton>
    </form>
  );
}

function ReviewForm() {
    const { toast } = useToast();
    const reviewForm = useForm<z.infer<typeof reviewSchema>>({
        resolver: zodResolver(reviewSchema),
        defaultValues: { name: "", rating: 0, review: "" },
    });
    
    const [formState, formAction] = useActionState(handleReviewSubmission, { message: '', success: false });

    useEffect(() => {
        if (formState.message) {
            toast({
                title: formState.success ? 'Success!' : 'Error',
                description: formState.message,
                variant: formState.success ? 'default' : 'destructive',
            });
            if (formState.success) {
                reviewForm.reset();
            }
        }
    }, [formState, toast, reviewForm]);

    return (
        <Form {...reviewForm}>
            <form action={formAction} className="space-y-6">
                <FormField
                    control={reviewForm.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={reviewForm.control}
                    name="rating"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your Rating</FormLabel>
                            <FormControl>
                               <StarRating field={field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={reviewForm.control}
                    name="review"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your Review</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Tell us about your experience..." {...field} rows={5} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <SubmitButton>Submit Review</SubmitButton>
            </form>
        </Form>
    );
}

export default function ContactPage() {
    const heroImage = PlaceHolderImages.find(p => p.id === 'gallery-6');
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
            Get in Touch
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-center text-lg text-white/90">
            Have a question, need a quote, or want to share your experience? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-12">
                <div>
                    <Tabs defaultValue="contact" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="contact">Contact Us</TabsTrigger>
                        <TabsTrigger value="review">Leave a Review</TabsTrigger>
                        </TabsList>
                        <TabsContent value="contact" className="animate-in fade-in-0 duration-500">
                        <Card>
                            <CardHeader>
                            <CardTitle>Contact Form</CardTitle>
                            <CardDescription>
                                Fill out the form below and a member of our team will get back to you as soon as possible.
                            </CardDescription>
                            </CardHeader>
                            <CardContent>
                            <ContactForm />
                            </CardContent>
                        </Card>
                        </TabsContent>
                        <TabsContent value="review" className="animate-in fade-in-0 duration-500">
                        <Card>
                            <CardHeader>
                            <CardTitle>Share Your Experience</CardTitle>
                            <CardDescription>
                                Your feedback helps us improve and lets others know about the quality of our work.
                            </CardDescription>
                            </CardHeader>
                            <CardContent>
                            <ReviewForm />
                            </CardContent>
                        </Card>
                        </TabsContent>
                    </Tabs>
                </div>
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Our Information</CardTitle>
                             <CardDescription>
                                Stop by our office or get in touch with us.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4 text-sm text-muted-foreground">
                                <div className="flex items-start gap-4">
                                    <MapPin className="h-5 w-5 text-accent mt-1" />
                                    <span>Sy.No.:104, Post, Anjanapura, Gollahalli, Bengaluru, Karnataka 560108</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Phone className="h-5 w-5 text-accent" />
                                    <a href="tel:09741499909" className="hover:text-primary">09741499909</a>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Mail className="h-5 w-5 text-accent" />
                                    <a href="mailto:strmixconcrete@gmail.com" className="hover:text-primary">strmixconcrete@gmail.com</a>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Clock className="h-5 w-5 text-accent" />
                                    <span>Open 24/7</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Instagram className="h-5 w-5 text-accent" />
                                     <Link href="https://www.instagram.com/strmix_9/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                                        @strmix_9
                                    </Link>
                                </div>
                            </div>
                             <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg border">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.600989335688!2d77.56831007588219!3d12.868779916603223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae40f0b45a5555%3A0x86133032d845753b!2sSTR%20MIX!5e0!3m2!1sen!2sin!4v1729792601740!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
