import { NextRequest, NextResponse } from 'next/server';
import reviews from '@/app/data/reviews.json';
import books from '@/app/data/books.json';


export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const bookExists = books.books.some(book => book.id === params.id);
  if (!bookExists) {
    return NextResponse.json({ message: 'Book not found' }, { status: 404 });
  }

  const bookReviews = reviews.reviews.filter(review => review.bookId === params.id);
  return NextResponse.json(bookReviews);
}
