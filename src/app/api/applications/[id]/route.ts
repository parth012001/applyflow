import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

export async function GET(req: Request, context: { params: { id: string } }) {
  const { id } = await context.params;
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const application = await prisma.application.findUnique({
      where: { id },
    });

    if (!application || application.userId !== user.id) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    return NextResponse.json({ application });
  } catch (error) {
    console.error("Error fetching application:", error);
    return NextResponse.json({ error: "Failed to fetch application" }, { status: 500 });
  }
}

export async function PUT(req: Request, context: { params: { id: string } }) {
  const { id } = await context.params;
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const formData = await req.formData();
    const company = formData.get("company") as string;
    const position = formData.get("position") as string;
    const status = formData.get("status") as string;
    const appliedDate = formData.get("appliedDate") as string;
    const notes = formData.get("notes") as string | null;
    const followUpDate = formData.get("followUpDate") as string | null;
    const resumeFile = formData.get("resume") as File | null;

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

    const application = await prisma.application.findUnique({
      where: { id },
    });

    if (!application || application.userId !== user.id) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    const updated = await prisma.application.update({
      where: { id },
      data: {
        company,
        position,
        status,
        appliedDate: new Date(appliedDate),
        notes: notes || undefined,
        followUpDate: followUpDate ? new Date(followUpDate) : undefined,
        ...(resumeUrl ? { resumeUrl } : {}),
      },
    });

    return NextResponse.json({ application: updated });
  } catch (error) {
    console.error("Error updating application:", error);
    return NextResponse.json({ error: "Failed to update application" }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
  const { id } = await context.params;
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const application = await prisma.application.findUnique({ where: { id } });
    if (!application || application.userId !== user.id) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    await prisma.application.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting application:", error);
    return NextResponse.json({ error: "Failed to delete application" }, { status: 500 });
  }
} 