import { NextRequest, NextResponse } from 'next/server';
import { generateChatResponseStream } from '@/lib/gemini';
import { CHATBOT_SYSTEM_PROMPT } from '@/lib/prompts';

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

    // Add career-specific context if provided
    if (careerContext) {
      systemPrompt += `\n\nIMPORTANT CONTEXT: The user is specifically interested in learning about the "${careerContext}" career. Focus your responses on this career path, including information about:
- What professionals in this field do day-to-day
- Required skills and qualities
- Education pathways in India and abroad
- Salary expectations
- Career growth opportunities
- Challenges and rewards of the profession
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
