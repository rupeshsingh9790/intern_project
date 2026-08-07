import { getCurrentUser } from "@/lib/getCurrentUser";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({
           message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const cart = await prisma.cart.findMany({
      where: {
        userId: user.id,
      },
    });

    const count = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );

    return NextResponse.json({
      count,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}