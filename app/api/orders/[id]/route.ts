import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { status } = await req.json();
    const { id } = await params;

    const order = await prisma.order.update({
      where: {
        id: Number(id),
      },
      data: {
        status,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to update status" },
      { status: 500 }
    );
  }
}