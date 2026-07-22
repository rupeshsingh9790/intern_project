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
      userId,
    } = body;

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
        productId,
        userId,
      },
    });
    // Full Name
if (!fullName || fullName.trim().length < 3) {
  return NextResponse.json(
    { message: "Invalid Full Name" },
    { status: 400 }
  );
}

// Mobile
if (!/^[0-9]{10}$/.test(mobile)) {
  return NextResponse.json(
    { message: "Invalid Mobile Number" },
    { status: 400 }
  );
}

// Email
if (
  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
) {
  return NextResponse.json(
    { message: "Invalid Email" },
    { status: 400 }
  );
}

// Address
if (!address || address.trim().length < 10) {
  return NextResponse.json(
    { message: "Invalid Address" },
    { status: 400 }
  );
}

// City
if (!city || !/^[A-Za-z ]+$/.test(city)) {
  return NextResponse.json(
    { message: "Invalid City" },
    { status: 400 }
  );
}

// State
if (!state || !/^[A-Za-z ]+$/.test(state)) {
  return NextResponse.json(
    { message: "Invalid State" },
    { status: 400 }
  );
}

// Pincode
if (!/^[0-9]{6}$/.test(pincode)) {
  return NextResponse.json(
    { message: "Invalid Pincode" },
    { status: 400 }
  );
}

    await sendOrderEmail(email, fullName);

    return NextResponse.json({
      message: "Order Placed Successfully",
      order,
    });

  } catch (error) {
    console.error(error);

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