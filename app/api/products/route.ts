console.log("✅ PRODUCTS API LOADED");
import { getCurrentUser } from "@/lib/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

console.log("BODY:", body);

const {
  name,
  description,
  price,
  image,
  categoryId,
} = body;

const user = await getCurrentUser();

if (!user) {
  return NextResponse.json(
    { message: "Unauthorized" },
    { status: 401 }
  );
}

console.log({
  name,
  description,
  price,
  image,
  userId: user.id,
  categoryId,
});

try{
    const product = await prisma.product.create({
  data: {
    name,
    description,
    price: Number(price),
    image,
    userId: user.id,
    categoryId: Number(categoryId),
  },
});

    return NextResponse.json({
      message: "Product Created Successfully",
      product,
    });

    } catch (e) {
  console.log("PRISMA ERROR:");
  console.error(e);

  throw e;
}

 } catch (error) {
  console.error("MAIN ERROR:", error);

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

// 👇 Add this new function below POST
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const pageParam = searchParams.get("page");

    // Support customer category filtering
    const categoryParam = searchParams.get("category");

    // Support admin category filtering
    const categoryIdParam = searchParams.get("categoryId");

    const categoryValue =
      categoryParam ?? categoryIdParam;

    const categoryId = categoryValue
      ? Number(categoryValue)
      : undefined;

    // --------------------------------
    // ADMIN PRODUCTS
    // --------------------------------

    if (pageParam) {
      const page = Number(pageParam);
      const limit = 5;

      const products = await prisma.product.findMany({
        include: {
          user: true,
          category: true,
        },

        where: {
          isDeleted: false,

          ...(categoryId
            ? {
                categoryId,
              }
            : {}),
        },

        orderBy: {
          id: "desc",
        },

        skip: (page - 1) * limit,
        take: limit,
      });

      const totalProducts = await prisma.product.count({
        where: {
          isDeleted: false,

          ...(categoryId
            ? {
                categoryId,
              }
            : {}),
        },
      });

      return NextResponse.json({
        products,
        totalProducts,
        page,
        totalPages: Math.ceil(
          totalProducts / limit
        ),
        currentPage: page,
      });
    }

    // --------------------------------
    // CUSTOMER PRODUCTS
    // --------------------------------

    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        isDeleted: false,

        ...(categoryId
          ? {
              categoryId,
            }
          : {}),
      },

      include: {
        category: true,
      },

      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json({
      products,
    });

  } catch (error) {
    console.error("PRODUCT GET ERROR:", error);

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
