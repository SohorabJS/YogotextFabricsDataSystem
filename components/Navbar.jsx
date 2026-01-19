'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ProfilePanel from './ProfilePanel';

export default function Navbar() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfilePanelOpen, setIsProfilePanelOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const checkUserStatus = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error('Error parsing user data:', e);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    // Initial check
    checkUserStatus();
    setIsLoaded(true);

    // Listen for auth state changes
    const handleAuthStateChange = () => {
      checkUserStatus();
    };

    window.addEventListener('authStateChanged', handleAuthStateChange);
    window.addEventListener('storage', handleAuthStateChange);

    return () => {
      window.removeEventListener('authStateChanged', handleAuthStateChange);
      window.removeEventListener('storage', handleAuthStateChange);
    };
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm" style={{ height: 'var(--navbar-height)' }}>
      <div className="max-w-full px-6 py-3" style={{ height: '100%' }}>
        <div className="flex justify-between items-center">
          {/* Left Side: Logo and Company Name */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              YF
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-gray-900">YOGOTEX FABRICS</h1>
              <p className="text-xs text-gray-500">CO.LTD</p>
            </div>
          </div>

          {/* Right Side: Buttons */}
          <div className="hidden md:flex gap-4 items-center">
            {user ? (
              <button
                onClick={() => setIsProfilePanelOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-blue-600 text-sm font-bold">
                  {user.first_name?.charAt(0)?.toUpperCase()}
                </div>
                👤 Profile
              </button>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="px-6 py-2 text-blue-600 font-semibold text-sm border border-blue-600 rounded-lg hover:bg-blue-50 transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-6 text-sm py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            {user ? (
              <>
                <div className="px-4 py-3 bg-gray-100 rounded-lg mb-3">
                  <p className="text-gray-700 font-semibold">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <button
                  onClick={() => {
                    setIsProfilePanelOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                  👤 View Profile
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="block px-4 py-2 text-blue-600 font-semibold border border-blue-600 rounded-lg text-center hover:bg-blue-50 transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="block px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg text-center hover:bg-blue-700 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}

        {/* Profile Panel */}
        <ProfilePanel
          user={user}
          isOpen={isProfilePanelOpen}
          onClose={() => setIsProfilePanelOpen(false)}
        />
      </div>
    </nav>
  );
}
