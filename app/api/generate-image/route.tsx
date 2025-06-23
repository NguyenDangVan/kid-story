import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, Modality } from "@google/genai";
import * as fs from "node:fs";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});


export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    // Safely extract base64 image data from response
    const imageBase64 = response?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    console.log(response)
    if (!imageBase64) {
      return NextResponse.json({ error: "No image data returned from Gemini API" }, { status: 500 });
    }

    return NextResponse.json({ image: imageBase64 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Image generation failed" }, { status: 500 });
  }
}