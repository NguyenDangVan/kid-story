// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
    GoogleGenAI,
  } from '@google/genai';
  
const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});
const config = {
    responseMimeType: 'application/json',
};
const model = 'gemini-1.5-flash';

export async function geminiChat(prompt: string) {
  const contents = [
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];

  const response = await ai.models.generateContent({
    model,
    config,
    contents,
  });

  // Tùy vào response, bạn có thể cần parse JSON ở đây
  return response;
}
