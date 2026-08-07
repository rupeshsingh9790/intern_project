import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

//read the cookies//
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }
//verify JWT//
    const decoded = jwt.verify(
  token,
  process.env.JWT_SECRET!
) as {
  id: number;
  email: string;
  role: string;
};
//fetch user//
const user = await prisma.user.findUnique({
  where: {
    id: decoded.id,
  },
});

if (!user || user.isDeleted) {
  return NextResponse.json(
    {
      message: "User not found",
    },
    {
      status: 404,
    }
  );
}
return NextResponse.json({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
});

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
