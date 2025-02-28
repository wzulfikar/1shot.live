import { createError } from '../utils/createError.ts';

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

export const generateGameInfoFromImage = async (image_url: string): Promise<{
  title: string;
  description: string;
  tags: string[];
  author: string;
}> => {
  try {
    const prompt = 'Analyze this game screenshot and provide a concise description focusing on the gameplay, visual style, and any unique features. Keep it under 100 words. Returns a JSON object with the following fields: title, description, tags, author.'

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              { type: 'image_url', image_url }
            ]
          }
        ],
        max_tokens: 500
      })
    });

    return response.json();
  } catch (error) {
    throw createError('generateGameInfoFromImage', {
      error,
      where: 'lib',
      kind: 'UPSTREAM_API_ERROR',
      userMessage: {
        code: 'ERROR_GENERATING_GAME_INFO',
        message: 'Error generating game info',
      },
    });
  }
};
