import { ApplicationsTable } from "@/components/forms/applications-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ApplicationsPage() {
  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Job Applications</h1>
        <Link href="/dashboard/applications/new">
          <Button>Add New Application</Button>
        </Link>
      </div>
      <ApplicationsTable />
    </div>
  );
} 