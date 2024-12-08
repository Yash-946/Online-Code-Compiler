import prisma from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userID } = await request.json();

    const dailyStatus = await prisma.dailyActivity.create({
      data: {
        userId: userID,
        isActive: true
      }
    })

    return NextResponse.json({
      message: "success",
      Data: dailyStatus

    }, { "status": 200 })

  } catch (error) {
    return NextResponse.json({
      message: "Fail",
      Error: error
    }, { "status": 400 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userID = searchParams.get("userID");

    if (!userID) {
      return NextResponse.json(
        { message: "userID is required" },
        { status: 400 }
      );
    }

    const UserdailyStatusData = await prisma.dailyActivity.findMany({
      where:{
        userId:userID
      }
    })

    return NextResponse.json({
      message: "success",
      Data: UserdailyStatusData

    }, { "status": 200 })

  } catch (error) {
    return NextResponse.json({
      message: "Fail",
      Error: error
    }, { "status": 400 })
  }
}