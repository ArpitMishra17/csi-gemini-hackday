import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Scenario from '@/models/Scenario';
import UserScenarioProgress from '@/models/UserScenarioProgress';
import Career from '@/models/Career';
import { generateScenarioNarration } from '@/lib/gemini';
import { CAREER_SYSTEM_PROMPTS } from '@/lib/prompts';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ scenarioId: string }> }
) {
  try {
    await dbConnect();

    const { scenarioId } = await params;
    const body = await request.json();
    const { userId, optionId } = body;

    if (!userId || !optionId) {
      return NextResponse.json(
        { error: 'User ID and option ID are required' },
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

    const progress = await UserScenarioProgress.findOne({
      odUserId: userId,
      scenarioId: scenario._id,
    });

    if (!progress) {
      return NextResponse.json(
        { error: 'No active progress found. Please start the scenario first.' },
        { status: 400 }
      );
    }

    // Find current stage
    const currentStage = scenario.stages.find(
      (s) => s.stageId === progress.currentStageId
    );

    if (!currentStage) {
      return NextResponse.json(
        { error: 'Current stage not found' },
        { status: 400 }
      );
    }

    // Find selected option
    const selectedOption = currentStage.options.find((o) => o.id === optionId);
    if (!selectedOption) {
      return NextResponse.json(
        { error: 'Invalid option selected' },
        { status: 400 }
      );
    }

    // Record the choice
    progress.choices.push({
      stageId: currentStage.stageId,
      optionId: selectedOption.id,
      timestamp: new Date(),
    });

    // Build previous choices summary for AI context
    const previousChoices = progress.choices.map((choice) => {
      const stage = scenario.stages.find((s) => s.stageId === choice.stageId);
      const option = stage?.options.find((o) => o.id === choice.optionId);
      return `Stage: ${stage?.prompt || 'Unknown'} - Chose: ${option?.text || 'Unknown'}`;
    });

    // Check if there's a next stage
    if (!selectedOption.nextStageId) {
      // Scenario completed
      progress.completed = true;
      progress.currentStageId = 'completed';
      await progress.save();

      return NextResponse.json({
        completed: true,
        message: 'Scenario completed! Please request your evaluation.',
        stageNumber: scenario.stages.length,
        totalStages: scenario.stages.length,
      });
    }

    // Find next stage
    const nextStage = scenario.stages.find(
      (s) => s.stageId === selectedOption.nextStageId
    );

    if (!nextStage) {
      return NextResponse.json(
        { error: 'Next stage not found' },
        { status: 500 }
      );
    }

    // Update progress
    progress.currentStageId = nextStage.stageId;
    await progress.save();

    // Generate AI narration for the next stage
    let narration: string;
    try {
      const systemPrompt = CAREER_SYSTEM_PROMPTS[career.slug] || '';
      narration = await generateScenarioNarration(
        scenario.context + '\n\n' + systemPrompt,
        nextStage.prompt,
        previousChoices
      );
    } catch (error) {
      console.error('Error generating narration:', error);
      narration = nextStage.prompt;
    }

    // Calculate stage number
    const stageIndex = scenario.stages.findIndex(
      (s) => s.stageId === nextStage.stageId
    );

    return NextResponse.json({
      completed: false,
      currentStage: {
        stageId: nextStage.stageId,
        narration,
        options: nextStage.options.map((opt) => ({
          id: opt.id,
          text: opt.text,
        })),
      },
      stageNumber: stageIndex + 1,
      totalStages: scenario.stages.length,
      previousChoice: {
        text: selectedOption.text,
        skillsRevealed: selectedOption.skillsRevealed,
      },
    });
  } catch (error) {
    console.error('Error responding to scenario:', error);
    return NextResponse.json(
      { error: 'Failed to process response' },
      { status: 500 }
    );
  }
}
