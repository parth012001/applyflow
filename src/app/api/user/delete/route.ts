import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/db/prisma";
import { authOptions } from "@/lib/auth/auth.config";
import { Session } from "next-auth";

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions) as Session;

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // Delete user
    await prisma.user.delete({
      where: { email: session.user.email },
    });

    return NextResponse.json(
      { message: "Account deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Account deletion error:", error);
    return NextResponse.json(
      { error: "Error deleting account" },
      { status: 500 }
    );
  }
} 