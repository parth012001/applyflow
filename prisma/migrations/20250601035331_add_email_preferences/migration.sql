-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailPreferences" JSONB DEFAULT '{"applicationUpdates":true,"interviewReminders":true,"marketingEmails":false}';
