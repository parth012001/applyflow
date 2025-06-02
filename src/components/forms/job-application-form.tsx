"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { BriefcaseIcon, PlusIcon } from '@heroicons/react/24/solid';

const statusOptions = [
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
];

export function JobApplicationForm({ onSuccess }: { onSuccess?: () => void }) {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("Applied");
  const [appliedDate, setAppliedDate] = useState("");
  const [notes, setNotes] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
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
      if (notes) formData.append("notes", notes);
      if (followUpDate) formData.append("followUpDate", followUpDate);
      if (resume) formData.append("resume", resume);

      const response = await fetch("/api/applications", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to create application");
      }
      toast.success("Application created!");
      setCompany("");
      setPosition("");
      setStatus("Applied");
      setAppliedDate("");
      setNotes("");
      setFollowUpDate("");
      setResume(null);
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-af p-8 max-w-2xl mx-auto mt-8">
      <div className="flex items-center gap-3 mb-6">
        <BriefcaseIcon className="h-8 w-8 text-af-orange" />
        <h1 className="text-2xl md:text-3xl font-extrabold text-af-blue">Add New Application</h1>
      </div>
      <p className="text-af-blue/70 mb-8 text-base md:text-lg">Track your job search journey. Fill in the details below to add a new application!</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="company" className="font-bold text-af-blue mb-1">Company</Label>
            <Input
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              disabled={loading}
              className="rounded-xl border-af-blue/20 focus:ring-2 focus:ring-af-orange focus:outline-none text-lg px-4 py-2"
            />
          </div>
          <div>
            <Label htmlFor="position" className="font-bold text-af-blue mb-1">Position</Label>
            <Input
              id="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
              disabled={loading}
              className="rounded-xl border-af-blue/20 focus:ring-2 focus:ring-af-orange focus:outline-none text-lg px-4 py-2"
            />
          </div>
          <div>
            <Label htmlFor="status" className="font-bold text-af-blue mb-1">Status</Label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="block w-full rounded-xl border-2 border-af-blue/50 text-lg px-4 py-2 focus:border-af-orange focus:ring-2 focus:ring-af-orange focus:outline-none transition"
              disabled={loading}
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="appliedDate" className="font-bold text-af-blue mb-1">Applied Date</Label>
            <Input
              id="appliedDate"
              type="date"
              value={appliedDate}
              onChange={(e) => setAppliedDate(e.target.value)}
              required
              disabled={loading}
              className="rounded-xl border-af-blue/20 focus:ring-2 focus:ring-af-orange focus:outline-none text-lg px-4 py-2"
            />
          </div>
          <div>
            <Label htmlFor="followUpDate" className="font-bold text-af-blue mb-1">Follow Up Date</Label>
            <Input
              id="followUpDate"
              type="date"
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
              disabled={loading}
              className="rounded-xl border-af-blue/20 focus:ring-2 focus:ring-af-orange focus:outline-none text-lg px-4 py-2"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="notes" className="font-bold text-af-blue mb-1">Notes</Label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="block w-full rounded-xl border-2 border-af-blue/50 text-lg px-4 py-2 focus:border-af-orange focus:ring-2 focus:ring-af-orange focus:outline-none transition"
              disabled={loading}
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="resume" className="font-bold text-af-blue mb-1">Resume/CV</Label>
            <Input
              id="resume"
              type="file"
              accept="application/pdf,.doc,.docx"
              onChange={(e) => setResume(e.target.files?.[0] || null)}
              disabled={loading}
              className="rounded-xl border-af-blue/20 focus:ring-2 focus:ring-af-orange focus:outline-none"
            />
            <p className="mt-1 text-sm text-gray-500">PDF, DOC, or DOCX (optional)</p>
          </div>
        </div>
        <Button type="submit" disabled={loading} className="mt-6 w-full py-3 text-lg font-bold flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-900 transition-colors rounded-xl shadow-af">
          <PlusIcon className="h-5 w-5" />
          {loading ? "Submitting..." : "Add Application"}
        </Button>
      </form>
    </div>
  );
} 