import prisma from '@/lib/dbConnect';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, name, password } = await request.json();

    // Save the user data into the database
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });

    // Return a success response
    return NextResponse.json({
      success: true,
      user,
    });

  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({
      success: false,
      message: 'Error creating user',
    }, { status: 500 });
  }
}
