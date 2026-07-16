import { sendStatusMail } from "@/lib/mail";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Find user
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
if (user?.role === "ADMIN") {
  return NextResponse.json(
    {
      message: "Admin cannot be deactivated",
    },
    {
      status: 400,
    }
  );
}
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Toggle Active/Inactive
  const updatedUser = await prisma.user.update({
  where: {
    id: Number(id),
  },
  data: {
    isActive: !(user as any).isActive,
  },
});
await sendStatusMail(
  updatedUser.email,
  updatedUser.name,
  updatedUser.mobile,
  updatedUser.role,
  updatedUser.isActive
);

    return NextResponse.json({
      message: "User status updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}