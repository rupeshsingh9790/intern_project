import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page")) || 1;
  const role = searchParams.get("role");
const status = searchParams.get("status");
  const limit = 5;

  const where: any = {};

if (role && role !== "ALL") {
  where.role = role;
}

if (status && status !== "ALL") {
  where.isActive = status === "ACTIVE";
}
  const users = await prisma.user.findMany({
  where,
  skip: (page - 1) * limit,
  take: limit,
});

const totalUsers = await prisma.user.count({
  where,
});

  return NextResponse.json({
    users,
    totalUsers,
    totalPages: Math.ceil(totalUsers / limit),
    currentPage: page,
  });
}