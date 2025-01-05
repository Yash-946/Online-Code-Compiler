import { createResponse } from '@/helpers/responseHelper';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
export const runtime = 'edge';

export async function POST(request: Request) {
  const { question} = await request.json();
  const prompt = `${question}`;
  // console.log("prompt", prompt);

  try { 
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    // console.log("Ai Response",text);

    return createResponse(true, text, 200);

  } catch (error) {
    console.error("Error generating content:", error);
    return createResponse(false, "Failed to generate content", 500);
  }
}