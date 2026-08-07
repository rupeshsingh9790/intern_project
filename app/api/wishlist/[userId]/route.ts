import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    const wishlistId = Number(userId);

    await prisma.wishlist.delete({
      where: {
        id: wishlistId,
      },
    });

    return NextResponse.json({
      message: "Removed successfully",
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

export async function GET(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    const wishlist = await prisma.wishlist.findMany({
      where: {
        userId: Number(userId),
      },
      include: {
        product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(wishlist);
  } catch (error) {
  console.error(error);

  return NextResponse.json(
    {
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    },
    { status: 500 }
  );
}
}