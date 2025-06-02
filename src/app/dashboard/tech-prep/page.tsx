"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { CheckCircleIcon, StarIcon, FireIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

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
    <div className="py-10 max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="mb-10 text-center bg-gradient-to-br from-blue-50 via-white to-orange-50 rounded-2xl shadow-af p-8 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-af-blue tracking-tight flex items-center gap-2 justify-center">
          <FireIcon className="h-8 w-8 text-af-orange animate-bounce" />
          Master the NeetCode 75
        </h1>
        <p className="text-lg md:text-xl text-af-blue/80 mb-4">Track your progress, bookmark questions, and get ready to ace your tech interviews!</p>
        <div className="w-full max-w-xl bg-gray-200 rounded-full h-5 mb-2 overflow-hidden shadow-inner">
          {/* DEBUG: Show percent value visually */}
          <div className="text-xs text-red-500 absolute left-2 top-[-1.5rem]">DEBUG percent: {percent}</div>
          <div
            className="h-5 rounded-full animate-progress transition-all duration-700"
            style={{ width: `${percent}%`, background: percent > 0 ? 'orange' : 'transparent' }}
          />
        </div>
        <div className="flex items-center gap-2 text-base md:text-lg text-af-blue font-semibold">
          <span className="bg-af-orange text-white rounded-full px-3 py-1 shadow-af">{percent}% Complete</span>
          <span className="text-gray-500">({solvedCount} / {totalCount} solved)</span>
        </div>
        {percent >= 80 && (
          <div className="mt-4 text-2xl font-bold text-green-600 flex items-center gap-2 animate-bounce">
            <CheckCircleIcon className="h-7 w-7 text-green-500" />
            Amazing progress! Keep going!
          </div>
        )}
        {percent === 0 && (
          <div className="mt-4 text-xl font-semibold text-af-orange animate-pulse">Start your journey! Solve your first problem today 🚀</div>
        )}
      </div>
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center bg-white rounded-xl shadow-af p-4">
        <Input
          placeholder="Search by title or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80 border-2 border-af-blue/30 rounded-xl focus:ring-2 focus:ring-af-orange focus:border-af-orange text-lg"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border-2 border-af-blue/30 rounded-xl px-3 py-2 w-full md:w-48 focus:ring-2 focus:ring-af-orange focus:border-af-orange text-lg"
        >
          <option value="">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
      {/* Problems Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-af p-4">
        {loading ? (
          <div className="text-center text-af-blue text-lg">Loading problems...</div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <table className="min-w-full divide-y divide-af-blue/10">
            <thead className="bg-af-blue/5 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-left text-af-blue font-bold">Title</th>
                <th className="px-4 py-3 text-left text-af-blue font-bold">Difficulty</th>
                <th className="px-4 py-3 text-left text-af-blue font-bold">Category</th>
                <th className="px-4 py-3 text-center text-af-blue font-bold">Solved</th>
                <th className="px-4 py-3 text-center text-af-blue font-bold">Bookmark</th>
                <th className="px-4 py-3 text-left text-af-blue font-bold">Link</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, idx) => (
                <tr key={p.id} className={idx % 2 === 0 ? "bg-af-bg/60" : "bg-white hover:bg-af-orange/10 transition"}>
                  <td className="px-4 py-3 font-semibold text-af-blue text-base">{p.title}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold shadow-sm transition-all duration-200
                      ${p.difficulty === "Easy"
                        ? "bg-green-100 text-green-800"
                        : p.difficulty === "Medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : p.difficulty === "Hard"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {p.difficulty === "Easy" && <CheckCircleIcon className="h-4 w-4 text-green-400" />}
                      {p.difficulty === "Medium" && <FireIcon className="h-4 w-4 text-yellow-400" />}
                      {p.difficulty === "Hard" && <FireIcon className="h-4 w-4 text-red-400" />}
                      {p.difficulty}
                    </span>
                  </td>
                  <td className="px-4 py-3">{p.category}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleToggle(p.id, "solved", p.solved)}
                      className={`inline-flex items-center justify-center h-7 w-7 rounded-full border-2 transition-all duration-200
                        ${p.solved ? "bg-green-500 border-green-500" : "bg-white border-gray-300 hover:bg-green-50"}`}
                      title={p.solved ? "Mark as unsolved" : "Mark as solved"}
                    >
                      {p.solved ? <CheckCircleIcon className="h-5 w-5 text-white" /> : <CheckCircleIcon className="h-5 w-5 text-gray-300" />}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleToggle(p.id, "bookmarked", p.bookmarked)}
                      className={`inline-flex items-center justify-center h-7 w-7 rounded-full border-2 transition-all duration-200
                        ${p.bookmarked ? "bg-af-orange border-af-orange" : "bg-white border-gray-300 hover:bg-yellow-50"}`}
                      title={p.bookmarked ? "Remove bookmark" : "Bookmark"}
                    >
                      {p.bookmarked ? (
                        <StarIcon className="h-5 w-5 text-af-orange" />
                      ) : (
                        <StarOutlineIcon className="h-5 w-5 text-af-orange" />
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-af-blue underline font-semibold hover:text-af-orange transition">
                      LeetCode
                      <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <style jsx global>{`
        @keyframes progress {
          0% { width: 0; }
        }
        .animate-progress {
          animation: progress 1s cubic-bezier(.4,2,.6,1);
        }
        .animate-bounce {
          animation: bounce 1.2s infinite alternate;
        }
        .animate-pulse {
          animation: pulse 1.5s cubic-bezier(.4,0,.6,1) infinite;
        }
      `}</style>
    </div>
  );
} 