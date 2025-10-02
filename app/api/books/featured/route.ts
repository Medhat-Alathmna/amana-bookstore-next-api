import { NextResponse } from 'next/server';
import books from '@/app/data/books.json';

export async function GET() {
  const featuredBooks = books.books.filter(book => book.featured);
  return NextResponse.json(featuredBooks);
}
