import { JobApplicationForm } from "@/components/forms/job-application-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NewApplicationPage() {
  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Add New Job Application</h1>
        <Link href="/dashboard/applications">
          <Button variant="outline">Back to Applications</Button>
        </Link>
      </div>
      <JobApplicationForm />
    </div>
  );
} 