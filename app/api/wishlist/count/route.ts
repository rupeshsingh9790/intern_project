import { getCurrentUser } from "@/lib/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { count: 0 },
        { status: 200 }
      );
    }

    const count = await prisma.wishlist.count({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json({
      count,
    });
  } catch (error) {
    console.error("WISHLIST COUNT ERROR:", error);

    return NextResponse.json(
      {
        message: "Something went wrong",
        count: 0,
      },
      { status: 500 }
    );
  }
}