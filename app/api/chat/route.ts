import { NextRequest, NextResponse } from 'next/server';
import { generateChatResponseStream } from '@/lib/gemini';
import { CHATBOT_SYSTEM_PROMPT } from '@/lib/prompts';
import dbConnect from '@/lib/mongodb';
import Career from '@/models/Career';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface UserProfile {
  age?: number;
  grade?: string;
  interests?: string[];
  skills?: string[];
  preferredLocation?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history = [], userProfile = {}, careerContext } = body as {
      message: string;
      history: ChatMessage[];
      userProfile: UserProfile;
      careerContext?: string;
    };

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Build system prompt with user profile and career context
    let systemPrompt = CHATBOT_SYSTEM_PROMPT(userProfile);

    // Fetch available careers/demos from DB to allow intelligent routing
    try {
      await dbConnect();
      const availableCareers = await Career.find({}).select('name _id');

      if (availableCareers.length > 0) {
        const demoList = availableCareers.map(c => `- ${c.name}: /demo/${c._id}`).join('\n');
        systemPrompt += `\n\nAVAILABLE INTERACTIVE DEMOS:\nThe following careers have interactive simulations available:\n${demoList}\n\nINSTRUCTION: If the user asks about these specific careers or expresses interest in experiencing them, YOU MUST strictly recommend trying the interactive demo. Provide the link in markdown format, like: [Try ${availableCareers[0].name} Demo](/demo/${availableCareers[0]._id}).`;
      }
    } catch (dbError) {
      console.error('Failed to fetch careers for system prompt context:', dbError);
      // Continue without demo context if DB fails
    }

    // Add career-specific context if provided
    if (careerContext) {
      systemPrompt += `\n\nIMPORTANT CONTEXT: The user is specifically interested in learning about the "${careerContext}" career. Focus your responses on this career path, including information about:
- What professionals in this field do day-to-day
- Required skills and qualities
- Education pathways in India and abroad
- Salary expectations
- Career growth opportunities
- Challenges and rewards of the profession
- Suggesting the interactive demo if available for this career
Be detailed and helpful while keeping responses conversational and encouraging.`;
    }

    // Convert history to Gemini format
    const geminiHistory = history.map((msg) => ({
      role: msg.role === 'assistant' ? 'model' as const : 'user' as const,
      content: msg.content,
    }));

    // Add current message
    geminiHistory.push({
      role: 'user' as const,
      content: message,
    });

    // Generate streaming response
    const stream = await generateChatResponseStream(geminiHistory, systemPrompt);

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });

  } catch (error) {
    console.error('Error in chat:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate response',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
