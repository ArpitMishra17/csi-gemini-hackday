import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export function getGeminiModel(): GenerativeModel {
  return genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || 'gemini-2.5-flash' });
}

export async function generateText(prompt: string, systemPrompt?: string): Promise<string> {
  const model = getGeminiModel();

  const fullPrompt = systemPrompt
    ? `${systemPrompt}\n\n${prompt}`
    : prompt;

  const result = await model.generateContent(fullPrompt);
  const response = result.response;
  return response.text();
}

export async function generateChatResponse(
  messages: { role: 'user' | 'model'; content: string }[],
  systemPrompt?: string
): Promise<string> {
  // Get model with system instruction built-in
  const model = systemPrompt
    ? genAI.getGenerativeModel({
        model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
        systemInstruction: systemPrompt,
      })
    : getGeminiModel();

  const chat = model.startChat({
    history: messages.slice(0, -1).map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    })),
  });

  const lastMessage = messages[messages.length - 1];
  const result = await chat.sendMessage(lastMessage.content);
  return result.response.text();
}

export async function generateChatResponseStream(
  messages: { role: 'user' | 'model'; content: string }[],
  systemPrompt?: string
): Promise<ReadableStream<Uint8Array>> {
  const model = systemPrompt
    ? genAI.getGenerativeModel({
        model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
        systemInstruction: systemPrompt,
      })
    : getGeminiModel();

  const chat = model.startChat({
    history: messages.slice(0, -1).map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    })),
  });

  const lastMessage = messages[messages.length - 1];
  const result = await chat.sendMessageStream(lastMessage.content);

  // Create a ReadableStream from the generator
  return new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          if (chunkText) {
            controller.enqueue(encoder.encode(chunkText));
          }
        }
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });
}

export async function generateScenarioNarration(
  context: string,
  stagePrompt: string,
  previousChoices: string[]
): Promise<string> {
  const model = getGeminiModel();

  const prompt = `You are narrating an interactive career simulation scenario.

Context: ${context}

Previous choices made by the user:
${previousChoices.length > 0 ? previousChoices.join('\n') : 'This is the beginning of the scenario.'}

Current stage: ${stagePrompt}

Generate an immersive, engaging narrative (2-3 paragraphs) that:
1. Sets the scene vividly
2. Presents the situation the user must respond to
3. Maintains professional realism
4. Is appropriate for high school and college students

Do not include the options - just narrate the situation.`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}

export async function generateEvaluation(
  careerName: string,
  scenarioTitle: string,
  choices: { stage: string; choice: string; skillsRevealed: string[] }[]
): Promise<{ strengths: string[]; areasToImprove: string[] }> {
  const model = getGeminiModel();

  const prompt = `You are evaluating a student's performance in a ${careerName} career simulation.

Scenario: ${scenarioTitle}

Their choices:
${choices.map((c, i) => `Stage ${i + 1}: "${c.stage}" - Chose: "${c.choice}" (Skills shown: ${c.skillsRevealed.join(', ')})`).join('\n')}

Based on these choices, provide a JSON response with:
1. "strengths": Array of 2-3 skills/traits they demonstrated well
2. "areasToImprove": Array of 2-3 areas where they could develop

Be encouraging but honest. Focus on career-relevant skills.
Respond ONLY with valid JSON, no markdown or explanation.`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  try {
    const cleaned = text.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(cleaned);
  } catch {
    return {
      strengths: ['Critical thinking', 'Decision making'],
      areasToImprove: ['Consider multiple perspectives', 'Gather more information before deciding']
    };
  }
}
