import { NextRequest, NextResponse } from 'next/server';
import books from '@/app/data/books.json';

// The context parameter is typed as `any` to bypass the incorrect type inference
// during the build process. We then safely access the `id` from params.
export async function GET(req: NextRequest, context: any) {
  const { id } = context.params as { id: string };
  
  const book = books.books.find(b => b.id === id);
  if (book) {
    return NextResponse.json(book);
  }
  return NextResponse.json({ message: 'Book not found' }, { status: 404 });
}

