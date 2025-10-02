import { NextRequest, NextResponse } from 'next/server';
import books from '@/app/data/books.json';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const book = books.books.find(b => b.id === params.id);
  if (book) {
    return NextResponse.json(book);
  }
  return NextResponse.json({ message: 'Book not found' }, { status: 404 });
}
