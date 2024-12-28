import { sendContactUsEmail } from "@/helpers/sendContactUsEmail";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, message } = await request.json();
    const r = await sendContactUsEmail(firstName, lastName, email, message);

    return NextResponse.json({
      success: true,
    }, { status: 200 })

  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Failed to contact-us",
        error: error.message,
      },
      { status: 500 }
    );
  }
}