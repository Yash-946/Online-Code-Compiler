import prisma from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Extract userID from query parameters
    const { searchParams } = new URL(request.url);
    console.log(searchParams);
    const userID = searchParams.get("userID");
    console.log(userID);
    if (!userID) {
      return NextResponse.json(
        { message: "userID is required" },
        { status: 400 }
      );
    }

    // Fetch all codes for the given userID
    const codes = await prisma.code.findMany({
      where: {
        userId: userID,
      },
    });

    return NextResponse.json({
      message: "Codes retrieved successfully",
      codes,
    });
  } catch (error: any) {
    console.error("Error retrieving codes:", error);
    return NextResponse.json(
      {
        message: "Failed to retrieve codes",
        error: error.message,
      },
      { status: 500 }
    );
  }
}