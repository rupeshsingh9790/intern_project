import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { action } = await req.json();

    const { id } = await params;

    const cart = await prisma.cart.findUnique({
      where: {
        id: Number(id),
      },
    });


    if (!cart) {
      return NextResponse.json(
        {
          message: "Cart item not found",
        },
        {
          status: 404,
        }
      );
    }

    

    // Increase Quantity
    if (action === "increase") {
      const updatedCart = await prisma.cart.update({
        where: {
          id: Number(id),
        },
        data: {
          quantity: {
            increment: 1,
          },
        },
      });

      return NextResponse.json(updatedCart);
    }

    // Decrease Quantity
   if (action === "decrease") {
  if (cart.quantity <= 1) {
    return NextResponse.json(cart);
  }

  const updatedCart = await prisma.cart.update({
    where: {
      id: Number(id),
    },
    data: {
      quantity: {
        decrement: 1,
      },
    },
  });

  return NextResponse.json(updatedCart);
}

    return NextResponse.json(
      {
        message: "Invalid action",
      },
      {
        status: 400,
      }
    );
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

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.cart.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      message: "Item removed successfully",
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