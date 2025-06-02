"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const mockOffers = [
  { company: "Google", title: "Software Engineer", logo: "/logos/google.png", date: "2024-05-01" },
  { company: "Meta", title: "Frontend Engineer", logo: "/logos/meta.png", date: "2024-04-15" },
];
const mockInterviews = [
  { company: "Amazon", stage: "Onsite", date: "2024-05-10" },
  { company: "Netflix", stage: "Phone Screen", date: "2024-05-05" },
  { company: "Google", stage: "Offer", date: "2024-05-01" },
];
const techPrepStats = {
  solved: 45,
  total: 75,
  easy: 20,
  medium: 18,
  hard: 7,
};
const pieData = [
  { name: "Easy", value: techPrepStats.easy, color: "#34d399" },
  { name: "Medium", value: techPrepStats.medium, color: "#fbbf24" },
  { name: "Hard", value: techPrepStats.hard, color: "#f87171" },
];

export default function DashboardPage() {
  const [quote] = useState("Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.");

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8">
        {/* Greeting & Motivation */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white rounded-xl shadow p-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">Welcome back, Partha! 👋</h1>
            <p className="text-lg text-gray-600">{quote}</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="default">Add New Application</Button>
            <Button variant="secondary">Start Solving Problems</Button>
          </div>
        </div>

        {/* Offers, Interviews, Tech Prep Progress */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Offers Received */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Offers Received</h2>
            {mockOffers.length === 0 ? (
              <p className="text-gray-500">No offers yet.</p>
            ) : (
              <ul className="space-y-3">
                {mockOffers.map((offer) => (
                  <li key={offer.company} className="flex items-center gap-3">
                    <img src={offer.logo} alt={offer.company} className="h-8 w-8 rounded-full bg-gray-100 object-contain" />
                    <div>
                      <div className="font-medium">{offer.company}</div>
                      <div className="text-sm text-gray-500">{offer.title}</div>
                      <div className="text-xs text-gray-400">{offer.date}</div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Interviews Secured */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Interviews Secured</h2>
            <div className="text-4xl font-bold text-blue-600 mb-2">{mockInterviews.length}</div>
            <ul className="space-y-2">
              {mockInterviews.map((iv) => (
                <li key={iv.company + iv.stage} className="flex items-center gap-2">
                  <span className="font-medium">{iv.company}</span>
                  <span className="text-xs bg-blue-100 text-blue-700 rounded px-2 py-0.5">{iv.stage}</span>
                  <span className="text-xs text-gray-400">{iv.date}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Tech Prep Progress */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">Tech Prep Progress</h2>
            <div className="w-full mb-2">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>{techPrepStats.solved} solved</span>
                <span>{techPrepStats.total} total</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all"
                  style={{ width: `${Math.round((techPrepStats.solved / techPrepStats.total) * 100)}%` }}
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
                  >
                    {pieData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Analytics & Insights */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Analytics & Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-gray-500 mb-1">Conversion Funnel</div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span>Applications</span>
                  <span className="font-bold">30</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Interviews</span>
                  <span className="font-bold">{mockInterviews.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Offers</span>
                  <span className="font-bold">{mockOffers.length}</span>
                </div>
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Problems Solved (Pie)</div>
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
                  >
                    {pieData.map((entry, idx) => (
                      <Cell key={`cell-analytics-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Weekly Activity</div>
              <div className="h-24 flex items-center justify-center text-gray-400">(Coming soon)</div>
            </div>
          </div>
        </div>

        {/* YouTube Video & Resources */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4">Tips from a Google Recruiter</h2>
            <p className="mb-2 text-gray-600">Watch this video for insider advice on landing your dream job at Google and other top tech companies.</p>
            <a href="https://www.youtube.com/watch?v=ck5nw7R1uEs&ab_channel=FarahSharghi" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Watch on YouTube</a>
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
    </div>
  );
} 