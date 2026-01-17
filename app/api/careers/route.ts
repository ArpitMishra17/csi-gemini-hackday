import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Career from '@/models/Career';

export async function GET() {
  try {
    await dbConnect();

    const careers = await Career.find({}).sort({ name: 1 });

    return NextResponse.json({ careers });
  } catch (error) {
    console.error('Error fetching careers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch careers' },
      { status: 500 }
    );
  }
}
