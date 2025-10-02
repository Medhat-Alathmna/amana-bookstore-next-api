import { NextRequest, NextResponse } from 'next/server';
import books from '@/app/data/books.json';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  if (!startDate || !endDate) {
    return NextResponse.json({ message: 'Please provide both startDate and endDate' }, { status: 400 });
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return NextResponse.json({ message: 'Invalid date format' }, { status: 400 });
  }

  const filteredBooks = books.books.filter(book => {
    const publishedDate = new Date(book.datePublished);
    return publishedDate >= start && publishedDate <= end;
  });

  return NextResponse.json(filteredBooks);
}
