import { NextRequest, NextResponse } from 'next/server';
import books from '@/app/data/books.json';
import { writeFile } from 'fs/promises';
import path from 'path';
import { basicAuth } from '@/app/utils/auth';

export async function GET() {
  return NextResponse.json(books);
}

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
  const { title, author, isbn } = body;

  if (!title || !author || !isbn) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  const newBook = {
    id: String(books.books.length + 1),
    ...body,
    rating: 0,
    reviewCount: 0,
    inStock: true,
    featured: false,
  };

  const updatedBooks = { books: [...books.books, newBook] };

  const booksPath = path.join(process.cwd(), 'app', 'data', 'books.json');
  await writeFile(booksPath, JSON.stringify(updatedBooks, null, 2));

  return NextResponse.json(newBook, { status: 201 });
}
