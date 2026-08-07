import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

//post function//
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      password,
    } = body;

    //validate inputs//
    if (!name || name.trim().length < 3) {
  return NextResponse.json(
    { message: "Invalid Name" },
    { status: 400 }
  );
}

if (
  !email ||
  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
) {
  return NextResponse.json(
    { message: "Invalid Email" },
    { status: 400 }
  );
}
//check email already exists//
if (!password || password.length < 6) {
  return NextResponse.json(
    { message: "Password must be at least 6 characters" },
    { status: 400 }
  );
}

const existingUser = await prisma.user.findUnique({
  where: {
    email,
  },
});

if (existingUser) {
  return NextResponse.json(
    {
      message: "Email already exists",
    },
    {
      status: 400,
    }
  );
}
//hasing the pasword//
const hashedPassword = await bcrypt.hash(password, 10);
const user = await prisma.user.create({ //creating the user//
  data: {
    name,
    email,
    password: hashedPassword,
    role: "USER",
  },
});

return NextResponse.json(
  {
    message: "Account created successfully",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  },
  {
    status: 201,
  }
);

} catch (error) {
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