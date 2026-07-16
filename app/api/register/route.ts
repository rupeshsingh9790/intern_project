import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {

    const body = await req.json();

    const {
      name,
      email,
      mobile,
      password,
      role
    } = body;


    // Check existing user
    const existingUser = await prisma.user.findUnique({
      where: {
        email
      }
    });


    if (existingUser) {
      return NextResponse.json(
        {
          message: "Email already registered"
        },
        {
          status: 400
        }
      );
    }


    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);


    // Save user in database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        mobile,
        password: hashedPassword,
        role
      }
    });


    return NextResponse.json({
      message: "Registration successful",
      user
    });


  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        message: "Something went wrong"
      },
      {
        status: 500
      }
    );

  }
}