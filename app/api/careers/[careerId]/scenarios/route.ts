import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
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

    // Determine if searching by ID or Slug
    let career;
    if (mongoose.Types.ObjectId.isValid(careerId)) {
      career = await Career.findById(careerId);
    } else {
      career = await Career.findOne({ slug: careerId });
    }

    if (!career) {
      return NextResponse.json(
        { error: 'Career not found' },
        { status: 404 }
      );
    }

    // Use the actual _id for the scenario query
    const scenarios = await Scenario.find({ careerId: career._id })
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
