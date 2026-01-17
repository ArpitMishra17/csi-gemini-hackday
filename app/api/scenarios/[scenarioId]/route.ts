import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Scenario from '@/models/Scenario';
import Career from '@/models/Career';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ scenarioId: string }> }
) {
  try {
    await dbConnect();

    const { scenarioId } = await params;

    const scenario = await Scenario.findById(scenarioId);
    if (!scenario) {
      return NextResponse.json(
        { error: 'Scenario not found' },
        { status: 404 }
      );
    }

    const career = await Career.findById(scenario.careerId);

    return NextResponse.json({
      scenario,
      career: career ? {
        _id: career._id,
        name: career.name,
        slug: career.slug,
        icon: career.icon,
      } : null,
    });
  } catch (error) {
    console.error('Error fetching scenario:', error);
    return NextResponse.json(
      { error: 'Failed to fetch scenario' },
      { status: 500 }
    );
  }
}
