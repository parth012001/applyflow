"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { BriefcaseIcon, PhoneIcon, CheckCircleIcon, UserCircleIcon } from "@heroicons/react/24/solid";

const INTERVIEW_STATUSES = ["Phone Screen", "Onsite", "Interview", "Technical", "HR", "Final", "Assessment"];
const QUOTES = [
  "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
  "Opportunities don't happen, you create them.",
  "The future depends on what you do today.",
  "Dream big and dare to fail.",
  "Your only limit is your mind."
];

export default function DashboardPage() {
  const [offers, setOffers] = useState<any[]>([]);
  const [interviews, setInterviews] = useState<any[]>([]);
  const [techPrepStats, setTechPrepStats] = useState({ solved: 0, total: 0, easy: 0, medium: 0, hard: 0 });
  const [pieData, setPieData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const router = useRouter();
  const { data: session } = useSession();

  // Rotate motivational quote every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIdx((idx) => (idx + 1) % QUOTES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const offersRes = await fetch("/api/applications?status=Offer");
      const offersData = await offersRes.json();
      setOffers(offersData.applications || []);
      const allAppsRes = await fetch("/api/applications");
      const allAppsData = await allAppsRes.json();
      const interviewsFiltered = (allAppsData.applications || []).filter((a: any) => INTERVIEW_STATUSES.includes(a.status));
      setInterviews(interviewsFiltered);
      const prepRes = await fetch("/api/tech-prep/problems");
      const prepData = await prepRes.json();
      const problems = prepData.problems || [];
      const solved = problems.filter((p: any) => p.solved).length;
      const easy = problems.filter((p: any) => p.solved && p.difficulty === "Easy").length;
      const medium = problems.filter((p: any) => p.solved && p.difficulty === "Medium").length;
      const hard = problems.filter((p: any) => p.solved && p.difficulty === "Hard").length;
      setTechPrepStats({ solved, total: problems.length, easy, medium, hard });
      setPieData([
        { name: "Easy", value: easy, color: "#34d399" },
        { name: "Medium", value: medium, color: "#fbbf24" },
        { name: "Hard", value: hard, color: "#f87171" },
      ]);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10">
        {/* Greeting & Motivation */}
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-white/80 backdrop-blur rounded-2xl shadow-xl p-8 border border-blue-100">
          <div>
            <h1 className="text-4xl font-extrabold mb-1 text-gray-900 tracking-tight">
              Welcome back, {session?.user?.name || "there"}!
            </h1>
            <p className="text-lg text-indigo-700 font-medium transition-all duration-500 min-h-[28px]">{QUOTES[quoteIdx]}</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button size="lg" className="shadow-md" onClick={() => router.push("/dashboard/applications/new")}>+ Add New Application</Button>
            <Button size="lg" variant="secondary" className="shadow-md" onClick={() => router.push("/dashboard/tech-prep")}>🚀 Start Solving Problems</Button>
          </div>
        </div>

        {/* Main Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Offers Received */}
          <div className="group bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-lg p-7 flex flex-col border border-green-100 hover:scale-[1.025] transition-transform duration-200">
            <div className="flex items-center gap-2 mb-4">
              <BriefcaseIcon className="h-7 w-7 text-green-400" />
              <h2 className="text-xl font-bold text-green-700">Offers Received</h2>
            </div>
            {loading ? (
              <p className="text-gray-400">Loading...</p>
            ) : offers.length === 0 ? (
              <p className="text-gray-500">No offers yet.</p>
            ) : (
              <ul className="space-y-3">
                {offers.map((offer) => (
                  <li key={offer.id} className="flex flex-col gap-0.5 bg-green-100/40 rounded p-2 group-hover:bg-green-100/70 transition-colors">
                    <div className="font-semibold text-green-900">{offer.company}</div>
                    <div className="text-sm text-green-700">{offer.position}</div>
                    <div className="text-xs text-green-500">{new Date(offer.appliedDate).toLocaleDateString()}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Interviews Secured */}
          <div className="group bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-7 flex flex-col border border-blue-100 hover:scale-[1.025] transition-transform duration-200">
            <div className="flex items-center gap-2 mb-4">
              <PhoneIcon className="h-7 w-7 text-blue-400" />
              <h2 className="text-xl font-bold text-blue-700">Interviews Secured</h2>
            </div>
            {loading ? (
              <div className="text-gray-400">Loading...</div>
            ) : (
              <>
                <div className="text-4xl font-extrabold text-blue-600 mb-2 animate-pulse-slow">{interviews.length}</div>
                <ul className="space-y-2">
                  {interviews.map((iv) => (
                    <li key={iv.id} className="flex items-center gap-2 bg-blue-100/40 rounded p-2 group-hover:bg-blue-100/70 transition-colors">
                      <span className="font-semibold text-blue-900">{iv.company}</span>
                      <span className="text-xs bg-blue-200 text-blue-700 rounded px-2 py-0.5 font-medium">{iv.status}</span>
                      <span className="text-xs text-blue-500">{new Date(iv.appliedDate).toLocaleDateString()}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          {/* Tech Prep Progress */}
          <div className="group bg-gradient-to-br from-indigo-50 to-white rounded-2xl shadow-lg p-7 flex flex-col items-center border border-indigo-100 hover:scale-[1.025] transition-transform duration-200">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircleIcon className="h-7 w-7 text-indigo-400" />
              <h2 className="text-xl font-bold text-indigo-700">Tech Prep Progress</h2>
            </div>
            {loading ? (
              <div className="text-gray-400">Loading...</div>
            ) : (
              <>
                <div className="w-full mb-2">
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>{techPrepStats.solved} solved</span>
                    <span>{techPrepStats.total} total</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-indigo-400 to-blue-400 h-3 rounded-full animate-progress"
                      style={{ width: `${techPrepStats.total ? Math.round((techPrepStats.solved / techPrepStats.total) * 100) : 0}%`, transition: 'width 1s cubic-bezier(.4,2,.6,1)' }}
                    />
                  </div>
                </div>
                <div className="w-full h-40 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={120}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={50}
                        label
                        isAnimationActive={true}
                      >
                        {pieData.map((entry, idx) => (
                          <Cell key={`cell-${idx}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </>
            )}
          </div>
        </div>

        {/* YouTube Video & Resources */}
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-8 flex flex-col md:flex-row gap-10 items-center border border-indigo-100">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4 text-indigo-800 flex items-center gap-2">
              <svg className="h-7 w-7 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M10 15l5.19-3.09a1 1 0 000-1.72L10 7v8z" /><path fillRule="evenodd" d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10S2 17.52 2 12zm18 0a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" /></svg>
              Tips from a Google Recruiter
            </h2>
            <p className="mb-2 text-gray-600">Watch this video for insider advice on landing your dream job at Google and other top tech companies.</p>
            <a href="https://www.youtube.com/watch?v=ck5nw7R1uEs&ab_channel=FarahSharghi" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-medium">Watch on YouTube</a>
          </div>
          <div className="w-full md:w-96 aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/ck5nw7R1uEs"
              title="Tips from a Google Recruiter"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg shadow"
            ></iframe>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes progress {
          0% { width: 0; }
        }
        .animate-progress {
          animation: progress 1s cubic-bezier(.4,2,.6,1);
        }
        .animate-pulse-slow {
          animation: pulse 2.5s cubic-bezier(.4,0,.6,1) infinite;
        }
      `}</style>
    </div>
  );
} 