"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

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
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
      <div className="space-y-4">
        <div>
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <Label htmlFor="position">Position</Label>
          <Input
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
          <Label htmlFor="appliedDate">Applied Date</Label>
          <Input
            id="appliedDate"
            type="date"
            value={appliedDate}
            onChange={(e) => setAppliedDate(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <Label htmlFor="followUpDate">Follow Up Date</Label>
          <Input
            id="followUpDate"
            type="date"
            value={followUpDate}
            onChange={(e) => setFollowUpDate(e.target.value)}
            disabled={loading}
          />
        </div>
        <div>
          <Label htmlFor="notes">Notes</Label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            disabled={loading}
          />
        </div>
        <div>
          <Label htmlFor="resume">Resume/CV</Label>
          <Input
            id="resume"
            type="file"
            accept="application/pdf,.doc,.docx"
            onChange={(e) => setResume(e.target.files?.[0] || null)}
            disabled={loading}
          />
          <p className="mt-1 text-sm text-gray-500">PDF, DOC, or DOCX (optional)</p>
        </div>
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Add Application"}
      </Button>
    </form>
  );
} 