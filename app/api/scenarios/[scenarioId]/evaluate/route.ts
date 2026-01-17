import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Scenario from '@/models/Scenario';
import UserScenarioProgress from '@/models/UserScenarioProgress';
import Career from '@/models/Career';
import { generateEvaluation } from '@/lib/gemini';

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

    const progress = await UserScenarioProgress.findOne({
      odUserId: userId,
      scenarioId: scenario._id,
    });

    if (!progress) {
      return NextResponse.json(
        { error: 'No progress found for this scenario' },
        { status: 404 }
      );
    }

    if (!progress.completed) {
      return NextResponse.json(
        { error: 'Scenario not yet completed' },
        { status: 400 }
      );
    }

    // If evaluation already exists, return it
    if (progress.evaluation) {
      return NextResponse.json({
        evaluation: progress.evaluation,
        scenarioTitle: scenario.title,
        careerName: career.name,
        choicesSummary: buildChoicesSummary(scenario, progress.choices),
      });
    }

    // Build choices data for evaluation
    const choicesData = progress.choices.map((choice) => {
      const stage = scenario.stages.find((s) => s.stageId === choice.stageId);
      const option = stage?.options.find((o) => o.id === choice.optionId);
      return {
        stage: stage?.prompt || 'Unknown',
        choice: option?.text || 'Unknown',
        skillsRevealed: option?.skillsRevealed || [],
      };
    });

    // Generate AI evaluation
    let evaluation;
    try {
      evaluation = await generateEvaluation(
        career.name,
        scenario.title,
        choicesData
      );
    } catch (error) {
      console.error('Error generating evaluation:', error);
      // Fallback evaluation based on revealed skills
      const allSkills = choicesData.flatMap((c) => c.skillsRevealed);
      const uniqueSkills = [...new Set(allSkills)];
      evaluation = {
        strengths: uniqueSkills.slice(0, 3) || ['Engaged with the scenario'],
        areasToImprove: ['Continue exploring different approaches', 'Consider multiple perspectives'],
      };
    }

    // Save evaluation to progress
    progress.evaluation = evaluation;
    await progress.save();

    return NextResponse.json({
      evaluation,
      scenarioTitle: scenario.title,
      careerName: career.name,
      choicesSummary: buildChoicesSummary(scenario, progress.choices),
    });
  } catch (error) {
    console.error('Error evaluating scenario:', error);
    return NextResponse.json(
      { error: 'Failed to generate evaluation' },
      { status: 500 }
    );
  }
}

function buildChoicesSummary(
  scenario: { stages: { stageId: string; prompt: string; options: { id: string; text: string }[] }[] },
  choices: { stageId: string; optionId: string }[]
) {
  return choices.map((choice) => {
    const stage = scenario.stages.find((s) => s.stageId === choice.stageId);
    const option = stage?.options.find((o) => o.id === choice.optionId);
    return {
      situation: stage?.prompt || 'Unknown',
      choice: option?.text || 'Unknown',
    };
  });
}
