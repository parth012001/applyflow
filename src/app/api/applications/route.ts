import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/auth.config";
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
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
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const company = formData.get("company") as string;
    const position = formData.get("position") as string;
    const status = formData.get("status") as string;
    const appliedDate = formData.get("appliedDate") as string;
    const notes = formData.get("notes") as string | null;
    const followUpDate = formData.get("followUpDate") as string | null;
    const resumeFile = formData.get("resume") as File | null;

    if (!company || !position || !status || !appliedDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let resumeUrl: string | undefined = undefined;
    if (resumeFile) {
      const bytes = await resumeFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64String = buffer.toString("base64");
      const dataURI = `data:${resumeFile.type};base64,${base64String}`;
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "resumes",
        resource_type: "auto",
      });
      resumeUrl = result.secure_url;
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const application = await prisma.application.create({
      data: {
        company,
        position,
        status,
        appliedDate: new Date(appliedDate),
        notes: notes || undefined,
        followUpDate: followUpDate ? new Date(followUpDate) : undefined,
        resumeUrl,
        userId: user.id,
      },
    });

    return NextResponse.json({ application });
  } catch (error) {
    console.error("Error creating application:", error);
    return NextResponse.json({ error: "Failed to create application" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions) as Session;
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Parse query params
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || undefined;
    const company = searchParams.get("company") || undefined;

    const applications = await prisma.application.findMany({
      where: {
        userId: user.id,
        ...(status ? { status } : {}),
        ...(company ? { company: { contains: company, mode: "insensitive" } } : {}),
      },
      orderBy: { appliedDate: "desc" },
    });

    return NextResponse.json({ applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
} 