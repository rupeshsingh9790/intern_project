import { getCurrentUser } from "@/lib/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { productId } = await req.json();

const user = await getCurrentUser();

if (!user) {
  return NextResponse.json(
    {
      message: "Unauthorized",
    },
    {
      status: 401,
    }
  );
}

    // Check if already exists
    const existing = await prisma.wishlist.findFirst({
      where: {
  userId: user.id,
  productId,
},
    });

    if (existing) {
      return NextResponse.json(
        { message: "Product already in wishlist" },
        { status: 400 }
      );
    }

    const wishlist = await prisma.wishlist.create({
      data: {
  userId: user.id,
  productId,
},
    });

    return NextResponse.json(wishlist, { status: 201 });

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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const productId = Number(searchParams.get("productId"));

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const wishlist = await prisma.wishlist.findFirst({
      where: {
        userId: user.id,
        productId,
      },
    });

    return NextResponse.json({
      liked: !!wishlist,
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

export async function DELETE(req: Request) {
  try {
    const { productId } = await req.json();

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    await prisma.wishlist.deleteMany({
      where: {
        userId: user.id,
        productId,
      },
    });

    return NextResponse.json({
      message: "Removed from wishlist",
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