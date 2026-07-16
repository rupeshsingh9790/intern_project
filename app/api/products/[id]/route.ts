import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    req: Request,
    { params }: { params: Promise< { id: string }>  }
) {
    const { id } = await params;
    const product = await prisma.product.findUnique({
        where: {
            id: Number(id),
        },
        include: {
            user: true,
        },
    });
    if (!product) {
        return NextResponse.json(
            { message: "Product not Found"},
            {status: 404}
        );
    }
    return NextResponse.json(product);

}export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await req.json();

  console.log("PUT BODY:", body);

  const { name, description, price, image } = body;

  console.log({
    name,
    description,
    price,
    image,
  });

  const product = await prisma.product.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
      description,
      price,
      image,
    },
  });

  return NextResponse.json({
    message: "Product Updated Successfully",
    product,
  });
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    const { id } = await params;

    const product = await prisma.product.delete({
        where: {
            id: Number(id),
        },
    });

    return NextResponse.json({
        message: "Product Deleted Successfully",
        product,
    });

}