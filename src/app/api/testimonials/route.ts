import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export type Testimonial = {
  quote: string;
  author: string;
  rating?: number;
};

export async function GET() {
  try {
    const reviewsPath = path.resolve('src/lib/reviews.json');
    const reviewsData = await fs.readFile(reviewsPath, 'utf-8');
    const testimonials: Testimonial[] = JSON.parse(reviewsData);
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Error reading testimonials:', error);
    return NextResponse.json([], { status: 500 });
  }
}
