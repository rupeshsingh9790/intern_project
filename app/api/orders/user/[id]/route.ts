import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params;

 const orders = await prisma.order.findMany({
  where:{
    userId:Number(id)
  },
  include:{
    items:{
      include:{
        product:true
      }
    }
  },
  orderBy:{
    createdAt:"desc"
  }
});


  return NextResponse.json(orders);

}