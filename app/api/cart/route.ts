import { getCurrentUser } from "@/lib/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Add Product to Cart
export async function POST(req: Request) {
  try {
    const body = await req.json();

const { productId } = body;

const user = await getCurrentUser();

if (!user) {
  return NextResponse.json(
    { message: "Unauthorized" },
    { status: 401 }
  );
}

    // Check if already exists
    const existingCart = await prisma.cart.findFirst({
     where: {
  userId: user.id,
  productId,
},
    });

    // Increase Quantity
    if (existingCart) {
      const updatedCart = await prisma.cart.update({
        where: {
          id: existingCart.id,
        },
        data: {
          quantity: {
            increment: 1,
          },
        },
      });

      return NextResponse.json(updatedCart);
    }

    // New Product
    const cart = await prisma.cart.create({
      data: {
  userId: user.id,
  productId,
  quantity: 1,
},
    });

    return NextResponse.json(cart);
  } catch (error) {
  console.error("CART ERROR:", error);

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

// Get Cart
export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const cart = await prisma.cart.findMany({
      where: {
        userId: user.id,
      },
      include: {
        product: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json(cart);
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