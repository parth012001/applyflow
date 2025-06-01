"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Application {
  id: string;
  company: string;
  position: string;
  status: string;
  appliedDate: string;
  notes?: string;
  followUpDate?: string;
  resumeUrl?: string;
}

export function ApplicationsTable() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/applications");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch applications");
        setApplications(data.applications);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch applications");
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  if (loading) return <div>Loading applications...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (applications.length === 0) return <div>No applications yet. <Link href="/dashboard/applications/new" className="text-blue-600 underline">Add your first</Link>.</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Company</th>
            <th className="px-4 py-2 text-left">Position</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Applied</th>
            <th className="px-4 py-2 text-left">Follow Up</th>
            <th className="px-4 py-2 text-left">Notes</th>
            <th className="px-4 py-2 text-left">Resume</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {applications.map((app) => (
            <tr key={app.id}>
              <td className="px-4 py-2">{app.company}</td>
              <td className="px-4 py-2">{app.position}</td>
              <td className="px-4 py-2">
                <span className={`inline-block rounded px-2 py-1 text-xs font-semibold ${
                  app.status === "Applied"
                    ? "bg-blue-100 text-blue-800"
                    : app.status === "Interview"
                    ? "bg-yellow-100 text-yellow-800"
                    : app.status === "Offer"
                    ? "bg-green-100 text-green-800"
                    : app.status === "Rejected"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
                }`}>
                  {app.status}
                </span>
              </td>
              <td className="px-4 py-2">{app.appliedDate ? new Date(app.appliedDate).toLocaleDateString() : "-"}</td>
              <td className="px-4 py-2">{app.followUpDate ? new Date(app.followUpDate).toLocaleDateString() : "-"}</td>
              <td className="px-4 py-2 max-w-xs truncate" title={app.notes}>{app.notes || "-"}</td>
              <td className="px-4 py-2">
                {app.resumeUrl ? (
                  <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View</a>
                ) : (
                  "-"
                )}
              </td>
              <td className="px-4 py-2 space-x-2">
                <Link href={`/dashboard/applications/${app.id}`}>
                  <Button size="sm" variant="outline">View</Button>
                </Link>
                <Link href={`/dashboard/applications/${app.id}/edit`}>
                  <Button size="sm" variant="outline">Edit</Button>
                </Link>
                <Button size="sm" variant="destructive" onClick={() => alert(`Delete ${app.id}`)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 