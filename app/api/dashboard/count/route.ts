import prisma from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userID = searchParams.get("userID");

  if (!userID) {
    return NextResponse.json({
      message: "false",
      Error: "USerID is required"
    }, { "status": 400 })
  }

  const CodesCount = await prisma.code.count({
    where: {
      userId: userID
    }
  })

  return NextResponse.json({
    message: "success",
    Data: CodesCount
  }, { "status": 200 })
}