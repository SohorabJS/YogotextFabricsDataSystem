'use client';

import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200">
        <div className="flex items-center px-6 py-4 md:hidden">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <Navbar />
      </div>

      {/* Container below navbar: sidebar + scrollable content */}
      <div className="app-main-wrapper">
        {/* Background layer (fixed behind scrollable content) */}
        <div className="content-bg-fixed" aria-hidden />

        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Page Content (only this scrolls) */}
        <main className="content-scrollable p-6 md:p-8 z-10
bg-[radial-gradient(circle_at_center,_rgba(147,197,253,0.06)_0%,_rgba(59,130,246,0.25)_45%,_rgba(30,64,175,0.45)_65%,_#020617_85%)]">

                {/* ORBIT BACKGROUND */}
 {/* ORBIT BACKGROUND */}
<div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">

  <div className="absolute inset-0 animate-[float_80s_linear_infinite]">

    {/* ORBIT PATH */}
    <div
      className="absolute top-1/2 left-1/2
      w-[260px] h-[260px]
      -translate-x-1/2 -translate-y-1/2
      rounded-full
      scale-x-[1.5]
      rotate-[30deg]
      bg-[conic-gradient(from_0deg,
        rgba(96,165,250,0.18),
        rgba(192,132,252,0.18),
        rgba(34,211,238,0.18),
        rgba(96,165,250,0.18))]
      [mask:radial-gradient(circle,transparent_64%,black_65%)]
      animate-spin [animation-duration:60s]"
    />

    {/* PLANET 1 – Cyan */}
    <div
      className="absolute top-1/2 left-1/2
      w-[260px] h-[260px]
      -translate-x-1/2 -translate-y-1/2
      scale-x-[1.5]
      rotate-[30deg]
      animate-spin [animation-duration:60s]"
    >
      <div className="absolute top-1/2 -translate-y-1/2
        w-2 h-2 rounded-full
        bg-cyan-300
        shadow-[0_0_8px_rgba(103,232,249,0.7)]" />
    </div>

    {/* PLANET 2 – Purple (120° offset) */}
    <div
      className="absolute top-1/2 left-1/2
      w-[260px] h-[260px]
      -translate-x-1/2 -translate-y-1/2
      scale-x-[1.5]
      rotate-[150deg]
      animate-spin [animation-duration:60s]"
    >
      <div className="absolute top-1/2 -translate-y-1/2
        w-1.5 h-1.5 rounded-full
        bg-purple-300
        shadow-[0_0_7px_rgba(196,181,253,0.6)]" />
    </div>

    {/* PLANET 3 – Emerald (240° offset) */}
    <div
      className="absolute top-1/2 left-1/2
      w-[260px] h-[260px]
      -translate-x-1/2 -translate-y-1/2
      scale-x-[1.5]
      rotate-[270deg]
      animate-spin [animation-duration:60s]"
    >
      <div className="absolute top-1/2 -translate-y-1/2
        w-1.5 h-1.5 rounded-full
        bg-emerald-300
        shadow-[0_0_7px_rgba(110,231,183,0.6)]" />
    </div>

    {/* PLANET 4 – Amber (60° offset, tiniest) */}
    <div
      className="absolute top-1/2 left-1/2
      w-[260px] h-[260px]
      -translate-x-1/2 -translate-y-1/2
      scale-x-[1.5]
      rotate-[90deg]
      animate-spin [animation-duration:60s]"
    >
      <div className="absolute top-1/2 -translate-y-1/2
        w-1 h-1 rounded-full
        bg-amber-300
        shadow-[0_0_6px_rgba(252,211,77,0.6)]" />
    </div>

    <div
      className="absolute top-1/2 left-1/2
      w-[260px] h-[260px]
      -translate-x-1/2 -translate-y-1/2
      scale-x-[1.5]
      rotate-[0deg]
      animate-spin [animation-duration:60s]"
    >
      <div className="absolute top-1/2 -translate-y-1/2
        w-1 h-1 rounded-full
        bg-zinc-950
        shadow-[0_0_6px_rgba(252,211,77,0.6)]" />
    </div>

  </div>
</div>






              
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
          
        </main>
      </div>
    </div>
  );
}
