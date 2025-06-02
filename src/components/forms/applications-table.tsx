"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { PlusIcon, EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const statusOptions = [
  "",
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
];

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

function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

function ApplicationModal({ application, onClose }: { application: Application; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl font-bold"
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">Application Details</h2>
        <div className="space-y-2">
          <div><strong>Company:</strong> {application.company}</div>
          <div><strong>Position:</strong> {application.position}</div>
          <div><strong>Status:</strong> {application.status}</div>
          <div><strong>Applied Date:</strong> {application.appliedDate ? new Date(application.appliedDate).toLocaleDateString() : "-"}</div>
          <div><strong>Follow Up Date:</strong> {application.followUpDate ? new Date(application.followUpDate).toLocaleDateString() : "-"}</div>
          <div><strong>Notes:</strong> {application.notes || "-"}</div>
          <div><strong>Resume:</strong> {application.resumeUrl ? (
            <a href={application.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View Resume</a>
          ) : "-"}</div>
        </div>
      </div>
    </div>
  );
}

function EditApplicationModal({ application, onClose, onSave }: {
  application: Application;
  onClose: () => void;
  onSave: (updated: Application) => void;
}) {
  const [company, setCompany] = useState(application.company);
  const [position, setPosition] = useState(application.position);
  const [status, setStatus] = useState(application.status);
  const [appliedDate, setAppliedDate] = useState(application.appliedDate?.slice(0, 10) || "");
  const [followUpDate, setFollowUpDate] = useState(application.followUpDate?.slice(0, 10) || "");
  const [notes, setNotes] = useState(application.notes || "");
  const [resume, setResume] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("company", company);
      formData.append("position", position);
      formData.append("status", status);
      formData.append("appliedDate", appliedDate);
      if (followUpDate) formData.append("followUpDate", followUpDate);
      if (notes) formData.append("notes", notes);
      if (resume) formData.append("resume", resume);

      const res = await fetch(`/api/applications/${application.id}`, {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update application");
      toast.success("Application updated!");
      onSave(data.application);
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative space-y-4">
        <button
          onClick={onClose}
          type="button"
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl font-bold"
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-2">Edit Application</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium">Company</label>
            <input
              className="border rounded px-3 py-2 w-full"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Position</label>
            <input
              className="border rounded px-3 py-2 w-full"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              className="border rounded px-3 py-2 w-full"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
              disabled={loading}
            >
              {statusOptions.filter(Boolean).map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Applied Date</label>
            <input
              type="date"
              className="border rounded px-3 py-2 w-full"
              value={appliedDate}
              onChange={(e) => setAppliedDate(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Follow Up Date</label>
            <input
              type="date"
              className="border rounded px-3 py-2 w-full"
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Notes</label>
            <textarea
              className="border rounded px-3 py-2 w-full"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Resume/CV</label>
            <input
              type="file"
              accept="application/pdf,.doc,.docx"
              className="border rounded px-3 py-2 w-full"
              onChange={(e) => setResume(e.target.files?.[0] || null)}
              disabled={loading}
            />
            {application.resumeUrl && (
              <a href={application.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm mt-1 inline-block">View Current Resume</a>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
          <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Changes"}</Button>
        </div>
      </form>
    </div>
  );
}

function DeleteConfirmationModal({ onConfirm, onCancel, company }: { onConfirm: () => void; onCancel: () => void; company: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 relative">
        <h2 className="text-lg font-bold mb-2">Delete Application</h2>
        <p className="mb-4">Are you sure you want to delete the application for <span className="font-semibold">{company}</span>? This action cannot be undone.</p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button variant="destructive" onClick={onConfirm}>Delete</Button>
        </div>
      </div>
    </div>
  );
}

export function ApplicationsTable() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [companySearch, setCompanySearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [modalApp, setModalApp] = useState<Application | null>(null);
  const [editApp, setEditApp] = useState<Application | null>(null);
  const [deleteApp, setDeleteApp] = useState<Application | null>(null);

  const debouncedCompany = useDebounce(companySearch, 400);

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (debouncedCompany) params.set("company", debouncedCompany);
        if (statusFilter) params.set("status", statusFilter);
        const res = await fetch(`/api/applications?${params.toString()}`);
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
  }, [debouncedCompany, statusFilter]);

  const handleSaveEdit = (updated: Application) => {
    setApplications((apps) => apps.map((a) => (a.id === updated.id ? updated : a)));
  };

  const handleDelete = async (app: Application) => {
    setDeleteApp(app);
  };

  const confirmDelete = async () => {
    if (!deleteApp) return;
    try {
      const res = await fetch(`/api/applications/${deleteApp.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete application");
      setApplications((apps) => apps.filter((a) => a.id !== deleteApp.id));
      toast.success("Application deleted!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete application");
    } finally {
      setDeleteApp(null);
    }
  };

  if (loading) return <div>Loading applications...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (applications.length === 0) return <div>No applications yet. <Link href="/dashboard/applications/new" className="text-blue-600 underline">Add your first</Link>.</div>;

  return (
    <div className="relative">
      {/* Floating Add Button */}
      <Link href="/dashboard/applications/new">
        <button className="fixed z-40 bottom-8 right-8 bg-af-orange text-white rounded-full shadow-af p-4 hover:bg-af-blue transition-colors flex items-center gap-2 group">
          <PlusIcon className="h-6 w-6" />
          <span className="hidden md:inline font-semibold">Add Application</span>
        </button>
      </Link>
      {/* Card Container */}
      <div className="bg-white rounded-2xl shadow-af p-6">
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center bg-af-bg rounded-xl p-4 shadow-sm">
          <input
            type="text"
            placeholder="Search by company..."
            value={companySearch}
            onChange={(e) => setCompanySearch(e.target.value)}
            className="border border-af-blue/20 rounded-lg px-4 py-2 w-full md:w-64 focus:ring-2 focus:ring-af-orange focus:outline-none transition"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-af-blue/20 rounded-lg px-4 py-2 w-full md:w-48 focus:ring-2 focus:ring-af-orange focus:outline-none transition"
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option ? option : "All Statuses"}
              </option>
            ))}
          </select>
        </div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-af-blue/10">
            <thead className="bg-af-blue/5 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-left text-af-blue font-bold">Company</th>
                <th className="px-4 py-3 text-left text-af-blue font-bold">Position</th>
                <th className="px-4 py-3 text-left text-af-blue font-bold">Status</th>
                <th className="px-4 py-3 text-left text-af-blue font-bold">Applied</th>
                <th className="px-4 py-3 text-left text-af-blue font-bold">Follow Up</th>
                <th className="px-4 py-3 text-left text-af-blue font-bold">Notes</th>
                <th className="px-4 py-3 text-left text-af-blue font-bold">Resume</th>
                <th className="px-4 py-3 text-left text-af-blue font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, idx) => (
                <tr key={app.id} className={idx % 2 === 0 ? "bg-af-bg/60" : "bg-white hover:bg-af-orange/10 transition"}>
                  <td className="px-4 py-3 font-medium text-af-blue">{app.company}</td>
                  <td className="px-4 py-3">{app.position}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold shadow-sm transition-all duration-200
                      ${app.status === "Applied"
                        ? "bg-af-blue/10 text-af-blue"
                        : app.status === "Interview"
                        ? "bg-af-orange/20 text-af-orange"
                        : app.status === "Offer"
                        ? "bg-green-100 text-green-800"
                        : app.status === "Rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{app.appliedDate ? new Date(app.appliedDate).toLocaleDateString() : "-"}</td>
                  <td className="px-4 py-3">{app.followUpDate ? new Date(app.followUpDate).toLocaleDateString() : "-"}</td>
                  <td className="px-4 py-3 max-w-xs truncate" title={app.notes}>{app.notes || "-"}</td>
                  <td className="px-4 py-3">
                    {app.resumeUrl ? (
                      <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-af-orange underline font-semibold">View</a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-4 py-3 space-x-2 flex items-center">
                    <button
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-af-blue/10 text-af-blue hover:bg-af-blue/20 transition"
                      onClick={() => setModalApp(app)}
                      title="View"
                    >
                      <EyeIcon className="h-4 w-4" />
                      <span className="hidden md:inline">View</span>
                    </button>
                    <button
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-af-orange/10 text-af-orange hover:bg-af-orange/20 transition"
                      onClick={() => setEditApp(app)}
                      title="Edit"
                    >
                      <PencilIcon className="h-4 w-4" />
                      <span className="hidden md:inline">Edit</span>
                    </button>
                    <button
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition"
                      onClick={() => handleDelete(app)}
                      title="Delete"
                    >
                      <TrashIcon className="h-4 w-4" />
                      <span className="hidden md:inline">Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {modalApp && (
        <ApplicationModal application={modalApp} onClose={() => setModalApp(null)} />
      )}
      {editApp && (
        <EditApplicationModal
          application={editApp}
          onClose={() => setEditApp(null)}
          onSave={handleSaveEdit}
        />
      )}
      {deleteApp && (
        <DeleteConfirmationModal
          company={deleteApp.company}
          onCancel={() => setDeleteApp(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
} 