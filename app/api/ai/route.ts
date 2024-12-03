import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
export const runtime = 'edge';

export async function POST(request: Request) {
  const {code, language, question} = await request.json();
  // console.log(code, language, question);
  const prompt = `${code} ${question}`;
  // console.log(prompt);

  try { 

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    console.log("Ai Response",text);

    return Response.json({
      success: true,
      message: text
    }, { status: 200 })

  } catch (error) {
    console.error("Error generating content:", error);
    return Response.json({
      success: false,
      message: "Failed to generate content"
    }, { status: 500 })
  }
}