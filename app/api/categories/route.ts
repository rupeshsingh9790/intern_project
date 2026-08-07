import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        id: "asc",
      },
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    });

    return NextResponse.json({
      categories,
    });
  } catch (error) {
    console.error("GET CATEGORIES ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to load categories",
      },
      {
        status: 500,
      }
    );
  }
}

// ADD new category
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = body.name?.trim();

    if (!name) {
      return NextResponse.json(
        {
          message: "Category name is required",
        },
        {
          status: 400,
        }
      );
    }

    const existingCategory = await prisma.category.findUnique({
      where: {
        name,
      },
    });

    if (existingCategory) {
      return NextResponse.json(
        {
          message: "Category already exists",
        },
        {
          status: 400,
        }
      );
    }

    const category = await prisma.category.create({
      data: {
        name,
      },
    });

    return NextResponse.json(
      {
        message: "Category created successfully",
        category,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("CREATE CATEGORY ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to create category",
      },
      {
        status: 500,
      }
    );
  }
}