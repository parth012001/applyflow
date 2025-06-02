import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { compare, hash } from "bcryptjs";
import { prisma } from "@/lib/db/prisma";
import { authOptions } from "@/lib/auth/auth.config";
import { Session } from "next-auth";

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions) as Session;

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { currentPassword, newPassword } = await req.json();

    // Validate input
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get user with password
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        password: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Verify current password
    const isValid = await compare(currentPassword, user.password);

    if (!isValid) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await hash(newPassword, 12);

    // Update password
    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Password update error:", error);
    return NextResponse.json(
      { error: "Error updating password" },
      { status: 500 }
    );
  }
} 