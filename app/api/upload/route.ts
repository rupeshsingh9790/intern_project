import { NextRequest, NextResponse } from  "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No image Selected" },
        { status: 400 }
      );
    }
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public/products");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = `${Date.now()}-${file.name}`;

    fs.writeFileSync(path.join(uploadDir, fileName), buffer);

    return NextResponse.json(
      { imageUrl: `/products/${fileName}` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { message: "Error uploading image" },
      { status: 500 }
    );
  }
};
