'use server';

import { z } from 'zod';
import { promises as fs } from 'fs';
import path from 'path';
import { sendContactNotification } from '@/lib/notifications';

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

type FormState = {
  message: string;
  success: boolean;
  errors?: Record<string, string[] | undefined>;
};

export async function handleContactSubmission(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = contactSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      message: 'Validation failed. Please check your input.',
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    // Send email and SMS notifications
    const notificationResult = await sendContactNotification(validatedFields.data);

    console.log('New Contact Inquiry:', validatedFields.data);
    console.log('Notifications sent - Email:', notificationResult.emailSent, 'SMS:', notificationResult.smsSent);

    // Return appropriate message based on notification success
    if (notificationResult.emailSent) {
      return {
        message: 'Thank you for your inquiry! We have received your message and will get back to you shortly.',
        success: true
      };
    } else {
      return {
        message: 'Your message was received, but there was an issue sending notifications. Please try again or contact us directly.',
        success: false
      };
    }
  } catch (error) {
    console.error('Error processing contact form:', error);
    return {
      message: 'There was an error processing your request. Please try again later.',
      success: false
    };
  }
}

export async function handleReviewSubmission(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
    const validatedFields = reviewSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      message: 'Validation failed. Please check your input.',
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    // For production (Firebase), we'll use a database approach
    // For now, we'll store in a file that can be written to in production
    const reviewsPath = path.join(process.cwd(), 'reviews.json');

    let reviews = [];
    try {
      const reviewsData = await fs.readFile(reviewsPath, 'utf-8');
      reviews = JSON.parse(reviewsData);
    } catch (readError) {
      // File doesn't exist or can't be read, start with existing reviews
      console.log('Reviews file not found, initializing with default reviews');
      const defaultReviewsPath = path.join(process.cwd(), 'src/lib/reviews.json');
      try {
        const defaultData = await fs.readFile(defaultReviewsPath, 'utf-8');
        reviews = JSON.parse(defaultData);
      } catch (defaultError) {
        console.error('Could not load default reviews:', defaultError);
        reviews = [];
      }
    }

    // Add new review
    const newReview = {
      quote: validatedFields.data.review,
      author: validatedFields.data.name,
      rating: validatedFields.data.rating
    };
    reviews.push(newReview);

    // Write to writable location
    await fs.writeFile(reviewsPath, JSON.stringify(reviews, null, 2));

    console.log('New Review Submitted:', validatedFields.data);

    return { message: 'Thank you for your review! It will appear on our homepage shortly.', success: true };
  } catch (error) {
    console.error('Error saving review:', error);
    return { message: 'There was an error submitting your review. Please try again.', success: false };
  }
}
