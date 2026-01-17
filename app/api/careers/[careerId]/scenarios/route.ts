import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Scenario from '@/models/Scenario';
import Career from '@/models/Career';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ careerId: string }> }
) {
  try {
    await dbConnect();

    const { careerId } = await params;

    // Verify career exists
    const career = await Career.findById(careerId);
    if (!career) {
      return NextResponse.json(
        { error: 'Career not found' },
        { status: 404 }
      );
    }

    const scenarios = await Scenario.find({ careerId })
      .select('_id title description difficulty')
      .sort({ difficulty: 1 });

    return NextResponse.json({
      career: {
        _id: career._id,
        name: career.name,
        description: career.description,
        icon: career.icon,
      },
      scenarios,
    });
  } catch (error) {
    console.error('Error fetching scenarios:', error);
    return NextResponse.json(
      { error: 'Failed to fetch scenarios' },
      { status: 500 }
    );
  }
}
