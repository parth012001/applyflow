import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db/prisma";
import { authOptions } from "@/lib/auth";

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const preferences = await req.json();

    // Validate input
    if (
      typeof preferences.applicationUpdates !== "boolean" ||
      typeof preferences.interviewReminders !== "boolean" ||
      typeof preferences.marketingEmails !== "boolean"
    ) {
      return NextResponse.json(
        { error: "Invalid preferences format" },
        { status: 400 }
      );
    }

    // Update user preferences
    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        emailPreferences: preferences,
      },
    });

    return NextResponse.json(
      { message: "Email preferences updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email preferences update error:", error);
    return NextResponse.json(
      { error: "Error updating email preferences" },
      { status: 500 }
    );
  }
} 