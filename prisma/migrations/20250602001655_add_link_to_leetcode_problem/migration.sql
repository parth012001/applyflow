/*
  Warnings:

  - Added the required column `link` to the `LeetCodeProblem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LeetCodeProblem" ADD COLUMN     "link" TEXT NOT NULL;
