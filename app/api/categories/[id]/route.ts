import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const name = body.name?.trim();

    if (!name) {
      return NextResponse.json(
        { message: "Category name is required" },
        { status: 400 }
      );
    }

    const existingCategory = await prisma.category.findFirst({
      where: {
        name,
        NOT: {
          id: Number(id),
        },
      },
    });

    if (existingCategory) {
      return NextResponse.json(
        { message: "Category already exists" },
        { status: 400 }
      );
    }

    const category = await prisma.category.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
      },
    });

    return NextResponse.json({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.error("UPDATE CATEGORY ERROR:", error);

    return NextResponse.json(
      { message: "Failed to update category" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const productCount = await prisma.product.count({
      where: {
        categoryId: Number(id),
      },
    });

    if (productCount > 0) {
      return NextResponse.json(
        {
          message:
            "Cannot delete this category because products are using it.",
        },
        { status: 400 }
      );
    }

    await prisma.category.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("DELETE CATEGORY ERROR:", error);

    return NextResponse.json(
      { message: "Failed to delete category" },
      { status: 500 }
    );
  }
}