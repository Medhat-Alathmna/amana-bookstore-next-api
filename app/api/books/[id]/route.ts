import { NextRequest, NextResponse } from 'next/server';
import books from '@/app/data/books.json';

// Define a type for the context parameter to ensure type safety
type RouteContext = {
  params: {
    id: string;
  };
};

export async function GET(req: NextRequest, context: RouteContext) {
  const { id } = context.params;
  const book = books.books.find(b => b.id === id);
  if (book) {
    return NextResponse.json(book);
  }
  return NextResponse.json({ message: 'Book not found' }, { status: 404 });
}

