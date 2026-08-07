import { getCurrentUser } from "@/lib/getCurrentUser";
import { sendOrderEmail } from "@/lib/sendEmail";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      fullName,
      mobile,
      email,
      address,
      city,
      state,
      pincode,
      landmark,
      paymentMethod,
      productId,
    } = body;

    // --------------------------------
    // CHECK AUTHENTICATION
    // --------------------------------

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    // --------------------------------
    // VALIDATE ORDER INFORMATION
    // --------------------------------

    if (!fullName || fullName.trim().length < 3) {
      return NextResponse.json(
        { message: "Invalid Full Name" },
        { status: 400 }
      );
    }

    if (!mobile || !/^[0-9]{10}$/.test(mobile)) {
      return NextResponse.json(
        { message: "Invalid Mobile Number" },
        { status: 400 }
      );
    }

    if (
      !email ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
    ) {
      return NextResponse.json(
        { message: "Invalid Email" },
        { status: 400 }
      );
    }

    if (!address || address.trim().length < 10) {
      return NextResponse.json(
        { message: "Invalid Address" },
        { status: 400 }
      );
    }

    if (!city || !/^[A-Za-z ]+$/.test(city)) {
      return NextResponse.json(
        { message: "Invalid City" },
        { status: 400 }
      );
    }

    if (!state || !/^[A-Za-z ]+$/.test(state)) {
      return NextResponse.json(
        { message: "Invalid State" },
        { status: 400 }
      );
    }

    if (!pincode || !/^[0-9]{6}$/.test(pincode)) {
      return NextResponse.json(
        { message: "Invalid Pincode" },
        { status: 400 }
      );
    }

    if (!productId) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    // --------------------------------
    // CREATE ORDER
    // --------------------------------

    const order = await prisma.order.create({
      data: {
        fullName,
        mobile,
        email,
        address,
        city,
        state,
        pincode,
        landmark,
        paymentMethod,
        productId: Number(productId),

        // IMPORTANT:
        // Never take userId from frontend.
        // Always use authenticated user.
        userId: user.id,
      },

      include: {
        product: true,
        user: true,
      },
    });

    // --------------------------------
    // SEND ORDER EMAIL
    // --------------------------------

    await sendOrderEmail(email, fullName);

    return NextResponse.json(
      {
        message: "Order Placed Successfully",
        order,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("ORDER ERROR:", error);

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