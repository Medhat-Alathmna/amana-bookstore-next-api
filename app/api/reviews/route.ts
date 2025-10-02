import { NextRequest, NextResponse } from 'next/server';
import reviews from '@/app/data/reviews.json';
import books from '@/app/data/books.json';
import { writeFile } from 'fs/promises';
import path from 'path';
import { basicAuth } from '@/app/utils/auth';

export async function POST(req: NextRequest) {
    const auth = basicAuth(req);
    if (!auth) {
        return new NextResponse('Authentication required.', {
            status: 401,
            headers: { 'WWW-Authenticate': 'Basic realm="Restricted Area"' },
        });
    }

    const { username, password } = auth;
    if (username !== 'admin' || password !== 'password') {
        return new NextResponse('Authentication failed: Invalid credentials.', {
            status: 401,
            headers: { 'WWW-Authenticate': 'Basic realm="Restricted Area"' },
        });
    }

  const body = await req.json();
  const { bookId, author, rating, comment } = body;

  if (!bookId || !author || !rating || !comment) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }
  
  const bookExists = books.books.some(book => book.id === bookId);
  if (!bookExists) {
      return NextResponse.json({ message: 'Book not found. Cannot add a review for a non-existent book.' }, { status: 404 });
  }

  const newReview = {
    id: `review-${Date.now()}`,
    ...body,
    timestamp: new Date().toISOString(),
    verified: false,
  };

  const updatedReviews = { reviews: [...reviews.reviews, newReview] };

  const reviewsPath = path.join(process.cwd(), 'app', 'data', 'reviews.json');
  await writeFile(reviewsPath, JSON.stringify(updatedReviews, null, 2));

  return NextResponse.json(newReview, { status: 201 });
}
