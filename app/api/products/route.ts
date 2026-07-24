import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("BODY:", body);

    const { name, description, price, image, userId } = body;

    console.log({
  name,
  description,
  price,
  image,
  userId,
});

try{
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        image,
        userId,
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

    let products;

if (pageParam) {
  const page = Number(pageParam);
  const limit = 5;

  products = await prisma.product.findMany({
    include: {
      user: true,
    },
    where:{
      isDeleted: false,
    },
    orderBy: {
      id: "desc",
    },
    skip: (page - 1) * limit,
    take: limit,
  });

  const totalProducts = await prisma.product.count();

  return NextResponse.json({
    products,
    totalProducts,
    page,
    totalPages: Math.ceil(totalProducts / limit),
    currentPage: page,
  });
}

// Customer Listing
// Customer Listing
products = await prisma.product.findMany({
  where: {
    isActive: true,
    isDeleted: false,
  },
  orderBy: {
    id: "desc",
  },
});

return NextResponse.json({
  products,
});

return NextResponse.json({
  products,
});

    } catch (error) {
    // 👈 REPLACE YOUR OLD CATCH BLOCK WITH THIS
    console.error(error);

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