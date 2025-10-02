import { NextRequest, NextResponse } from 'next/server';
import reviews from '@/app/data/reviews.json';
import books from '@/app/data/books.json';

// The context parameter is typed as `any` to bypass the incorrect type inference
// during the build process. We then safely access the `id` from params.
export async function GET(req: NextRequest, context: any) {
  const { id } = context.params as { id: string };

  const bookExists = books.books.some(book => book.id === id);
  if (!bookExists) {
    return NextResponse.json({ message: 'Book not found' }, { status: 404 });
  }

  const bookReviews = reviews.reviews.filter(review => review.bookId === id);
  return NextResponse.json(bookReviews);
}

