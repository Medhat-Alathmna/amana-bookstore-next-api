import { NextResponse } from 'next/server';
import books from '@/app/data/books.json';

export async function GET() {
  const topBooks = books.books
    .map(book => ({
      ...book,
      ratingScore: book.rating * book.reviewCount
    }))
    .sort((a, b) => b.ratingScore - a.ratingScore)
    .slice(0, 10);

  return NextResponse.json(topBooks);
}
