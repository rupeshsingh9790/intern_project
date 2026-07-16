import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);
    // Get email and password from request
    const { email, password } = body;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // Check if user exists
    if (!user) {
      return NextResponse.json(
        { message: "Invalid Email or Password" },
        { status: 401 }
      );
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    // Check password
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Invalid Email or Password" },
        { status: 401 }
      );
    }

    // Login successful
    return NextResponse.json({
      message: "Login Successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}