import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Scenario from '@/models/Scenario';
import UserScenarioProgress from '@/models/UserScenarioProgress';
import Career from '@/models/Career';
import { generateScenarioNarrationStream } from '@/lib/gemini';
import { CAREER_SYSTEM_PROMPTS } from '@/lib/prompts';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ scenarioId: string }> }
) {
  try {
    await dbConnect();

    const { scenarioId } = await params;
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const scenario = await Scenario.findById(scenarioId);
    if (!scenario) {
      return NextResponse.json(
        { error: 'Scenario not found' },
        { status: 404 }
      );
    }

    const career = await Career.findById(scenario.careerId);
    if (!career) {
      return NextResponse.json(
        { error: 'Career not found' },
        { status: 404 }
      );
    }

    // Get first stage
    const firstStage = scenario.stages[0];
    if (!firstStage) {
      return NextResponse.json(
        { error: 'Scenario has no stages' },
        { status: 400 }
      );
    }

    // Check if user has existing progress
    let progress = await UserScenarioProgress.findOne({
      odUserId: userId,
      scenarioId: scenario._id,
    });

    if (progress) {
      // Reset progress if restarting
      progress.currentStageId = firstStage.stageId;
      progress.choices = [];
      progress.completed = false;
      progress.evaluation = null;
      await progress.save();
    } else {
      // Create new progress
      progress = await UserScenarioProgress.create({
        odUserId: userId,
        scenarioId: scenario._id,
        careerId: scenario.careerId,
        currentStageId: firstStage.stageId,
        choices: [],
        completed: false,
        evaluation: null,
      });
    }

    const metadata = {
      progressId: progress._id,
      scenario: {
        _id: scenario._id,
        title: scenario.title,
        description: scenario.description,
      },
      career: {
        name: career.name,
        icon: career.icon,
      },
      currentStage: {
        stageId: firstStage.stageId,
        options: firstStage.options.map((opt) => ({
          id: opt.id,
          text: opt.text,
        })),
      },
      stageNumber: 1,
      totalStages: scenario.stages.length,
    };

    const systemPrompt = CAREER_SYSTEM_PROMPTS[career.slug] || '';
    const narrationStream = await generateScenarioNarrationStream(
      scenario.context + '\n\n' + systemPrompt,
      firstStage.prompt,
      []
    );

    // Combine metadata and narration into a single stream
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        // Send metadata first, followed by our delimiter
        controller.enqueue(encoder.encode(JSON.stringify(metadata) + '\n--METADATA_END--\n'));

        const reader = narrationStream.getReader();
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            controller.enqueue(value);
          }
        } finally {
          reader.releaseLock();
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    console.error('Error starting scenario:', error);
    return NextResponse.json(
      { error: 'Failed to start scenario' },
      { status: 500 }
    );
  }
}
