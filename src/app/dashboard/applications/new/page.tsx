import { JobApplicationForm } from "@/components/forms/job-application-form";

export default function NewApplicationPage() {
  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold mb-6">Add New Job Application</h1>
      <JobApplicationForm />
    </div>
  );
} 