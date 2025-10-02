import { NextRequest, NextResponse } from 'next/server';
import reviews from '@/app/data/reviews.json';
import books from '@/app/data/books.json';

// We no longer need the separate RouteContext type for this approach

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const bookExists = books.books.some(book => book.id === id);
  if (!bookExists) {
    return NextResponse.json({ message: 'Book not found' }, { status: 404 });
  }

  const bookReviews = reviews.reviews.filter(review => review.bookId === id);
  return NextResponse.json(bookReviews);
}

