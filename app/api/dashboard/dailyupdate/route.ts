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

    const UserDailyStatus = await prisma.dailyActivity.findMany({
      where: {
        userId: userID
      }
    })

    const today = new Date();
    // const year = today.getFullYear();
    // console.log("1")
    const transformedValues = UserDailyStatus.map((item: any) => ({
      date: item.date.toISOString().slice(0, 10), // Format to YYYY-MM-DD
      count: 1,
    }));
    // console.log("2")

    const startDate = new Date(today.getFullYear(), 0, 1);
    const endDate = new Date(today.getFullYear()+1, 1, 1);


    const allDates = [];
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const formattedDate = d.toISOString().slice(0, 10); // Format to YYYY-MM-DD
      const existingEntry = transformedValues.find(
        (item: any) => item.date === formattedDate // Compare in the same format
      );
      allDates.push({
        date: formattedDate,
        count: existingEntry ? existingEntry.count : 0,
      });
    }

    return NextResponse.json({
      message: "success",
      Data: allDates
    }, { "status": 200 })

  } catch (error) {
    console.log(error)
    return NextResponse.json({
      message: "Fail",
      Error: error
    }, { "status": 400 })
  }
}