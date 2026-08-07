import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
  where: {
    email,
  },
});

if (!user) { //find user//
  return NextResponse.json(
    {
      message: "Invalid email or password",
    },
    {
      status: 401,
    }
  );
}

//check password//
const isPasswordValid = await bcrypt.compare(
  password,
  user.password
);

if (!isPasswordValid) {
  return NextResponse.json(
    {
      message: "Invalid email or password",
    },
    {
      status: 401,
    }
  );
}
//creating JWT
const token = jwt.sign(
  {
    id: user.id,
    email: user.email,
    role: user.role,
  },
  process.env.JWT_SECRET!,
  {
    expiresIn: "7d",
  }
);
//response//
const response = NextResponse.json({
  message: "Login successful",
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  },
});
//storing cookies//
response.cookies.set("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 60 * 60 * 24 * 7,
  path: "/",
});
return response;
}catch (error) {
  console.error(error);

  return NextResponse.json(
    {
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    },
    {
      status: 500,
    }
  );
}
}
