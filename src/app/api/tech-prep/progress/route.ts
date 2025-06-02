import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await req.json();
    console.log('Received request body:', body);

    const { problemId, solved, bookmarked } = body;
    
    // Validate required fields
    if (!problemId) {
      return NextResponse.json({ error: "Missing problemId" }, { status: 400 });
    }

    // Validate that at least one of solved or bookmarked is provided
    if (solved === undefined && bookmarked === undefined) {
      return NextResponse.json(
        { error: "At least one of solved or bookmarked must be provided" },
        { status: 400 }
      );
    }

    // Validate that problem exists
    const problem = await prisma.leetCodeProblem.findUnique({
      where: { id: problemId }
    });

    if (!problem) {
      return NextResponse.json({ error: "Problem not found" }, { status: 404 });
    }

    // Upsert user progress for this problem
    const progress = await prisma.userProblemProgress.upsert({
      where: {
        userId_problemId: {
          userId: user.id,
          problemId,
        },
      },
      update: {
        ...(solved !== undefined ? { solved } : {}),
        ...(bookmarked !== undefined ? { bookmarked } : {}),
      },
      create: {
        userId: user.id,
        problemId,
        solved: solved || false,
        bookmarked: bookmarked || false,
      },
    });

    console.log('Updated progress:', progress);
    
    // Always return a response with the updated progress
    return NextResponse.json({
      success: true,
      progress: {
        id: progress.id,
        problemId: progress.problemId,
        solved: progress.solved,
        bookmarked: progress.bookmarked,
        updatedAt: progress.updatedAt
      }
    });
  } catch (error) {
    console.error("Error updating progress:", error);
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to update progress", 
        details: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    );
  }
} 