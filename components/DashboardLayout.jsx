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
        <main className="content-scrollable p-6 md:p-8 z-10 overflow-hidden
bg-[radial-gradient(circle_at_center,_rgba(147,197,253,0.06)_0%,_rgba(59,130,246,0.25)_45%,_rgba(30,64,175,0.45)_65%,_#020617_85%)]">
          
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
