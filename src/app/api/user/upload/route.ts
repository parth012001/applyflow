import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/auth.config";
import { v2 as cloudinary } from "cloudinary";
import { prisma } from "@/lib/prisma";
import { Session } from "next-auth";

// Configure Cloudinary
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.error("Missing Cloudinary credentials");
  throw new Error("Cloudinary credentials are not configured");
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions) as Session;
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64String = buffer.toString("base64");
    const dataURI = `data:${file.type};base64,${base64String}`;

    try {
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "profile_pictures",
        resource_type: "auto",
      });

      console.log("Cloudinary upload successful:", result.secure_url);

      // Update user's image URL in database
      const updatedUser = await prisma.user.update({
        where: { email: session.user.email },
        data: { image: result.secure_url },
        select: {
          image: true,
        },
      });

      console.log("Database updated with new image URL:", updatedUser.image);

      return NextResponse.json({ 
        url: updatedUser.image,
        message: "Image uploaded successfully" 
      });
    } catch (uploadError) {
      console.error("Cloudinary upload error:", uploadError);
      return NextResponse.json(
        { error: "Failed to upload image to storage service" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in upload route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 