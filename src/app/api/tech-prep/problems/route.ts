import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const problems = await prisma.leetCodeProblem.findMany({
      orderBy: { title: "asc" },
      include: {
        userProgress: {
          where: { userId: user.id },
          select: { solved: true, bookmarked: true },
        },
      },
    });

    // Flatten user progress for each problem
    const problemsWithProgress = problems.map((p: any) => ({
      ...p,
      solved: p.userProgress[0]?.solved || false,
      bookmarked: p.userProgress[0]?.bookmarked || false,
      userProgress: undefined,
    }));

    return NextResponse.json({ problems: problemsWithProgress });
  } catch (error) {
    console.error("Error fetching tech prep problems:", error);
    return NextResponse.json({ error: "Failed to fetch problems" }, { status: 500 });
  }
} 