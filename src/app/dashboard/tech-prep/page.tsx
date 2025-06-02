"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Problem {
  id: string;
  title: string;
  difficulty: string;
  category: string;
  description: string;
  solution: string | null;
  link: string;
  solved: boolean;
  bookmarked: boolean;
}

const difficultyColors: Record<string, string> = {
  Easy: "bg-green-100 text-green-800",
  Medium: "bg-yellow-100 text-yellow-800",
  Hard: "bg-red-100 text-red-800",
};

export default function TechPrepPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/tech-prep/problems");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch problems");
        setProblems(data.problems);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch problems");
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  const filtered = problems.filter((p) =>
    (p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())) &&
    (filter ? p.difficulty === filter : true)
  );

  const solvedCount = problems.filter((p) => p.solved).length;
  const totalCount = problems.length;
  const percent = totalCount ? Math.round((solvedCount / totalCount) * 100) : 0;

  const handleToggle = async (id: string, field: "solved" | "bookmarked", value: boolean) => {
    try {
      const payload = {
        problemId: id,
        [field]: !value
      };

      const res = await fetch(`/api/tech-prep/progress`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Cache-Control": "no-cache"
        },
        body: JSON.stringify(payload),
      });
      
      // Only try to parse JSON if there's content
      let data;
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      }

      if (!res.ok) {
        // Only show a toast if there's a real error
        const errorMsg = data?.error || `Failed to update progress: ${res.status} ${res.statusText}`;
        toast.error(errorMsg);
        // Only log real errors
        console.error("Progress update error:", errorMsg, data);
        return;
      }
      
      // Update the UI optimistically
      setProblems((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, [field]: !value } : p
        )
      );
      toast.success(`Marked as ${!value ? field : `un${field}`}`);
    } catch (err) {
      // Only log and show errors if something actually failed
      const errorMsg = err instanceof Error ? err.message : "Failed to update progress";
      toast.error(errorMsg);
      console.error("Toggle error details:", errorMsg, err);
    }
  };

  return (
    <div className="py-8 max-w-5xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Master These {totalCount} Questions and Nail the Interview!</h1>
        <p className="text-lg text-gray-600 mb-4">Track your progress, bookmark questions, and get ready to ace your tech interviews.</p>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
          <div
            className="bg-blue-600 h-4 rounded-full transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="text-sm text-gray-700">{solvedCount} / {totalCount} solved ({percent}%)</div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <Input
          placeholder="Search by title or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-48"
        >
          <option value="">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
      {loading ? (
        <div>Loading problems...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Difficulty</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Solved</th>
                <th className="px-4 py-2 text-left">Bookmark</th>
                <th className="px-4 py-2 text-left">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td className="px-4 py-2 font-medium">{p.title}</td>
                  <td className={`px-4 py-2`}>
                    <span className={`inline-block rounded px-2 py-1 text-xs font-semibold ${difficultyColors[p.difficulty] || "bg-gray-100 text-gray-800"}`}>{p.difficulty}</span>
                  </td>
                  <td className="px-4 py-2">{p.category}</td>
                  <td className="px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={p.solved}
                      onChange={() => handleToggle(p.id, "solved", p.solved)}
                      className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={p.bookmarked}
                      onChange={() => handleToggle(p.id, "bookmarked", p.bookmarked)}
                      className="h-5 w-5 text-yellow-500 rounded focus:ring-yellow-500"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">LeetCode</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 