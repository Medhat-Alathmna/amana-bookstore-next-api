import { NextRequest, NextResponse } from 'next/server';
import reviews from '@/app/data/reviews.json';
import books from '@/app/data/books.json';

// Define a type for the context parameter to ensure type safety
type RouteContext = {
  params: {
    id: string;
  };
};

export async function GET(req: NextRequest, context: RouteContext) {
  const { id } = context.params;

  const bookExists = books.books.some(book => book.id === id);
  if (!bookExists) {
    return NextResponse.json({ message: 'Book not found' }, { status: 404 });
  }

  const bookReviews = reviews.reviews.filter(review => review.bookId === id);
  return NextResponse.json(bookReviews);
}

