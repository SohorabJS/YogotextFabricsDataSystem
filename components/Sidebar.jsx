'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'Fabrics Management', href: '/fabrics' },
  { name: 'Operation', href: '/operations' },
  { name: 'Machine Tools & Equipment', href: '/equipment' },
  { name: 'About Us', href: '/about' },
  { name: 'Settings', href: '/settings' },
  { name: 'Account', href: '/account' },
];

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
  }, []);

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0  bg-opacity-50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 bg-blue-900/55 bg-opacity-90 text-white overflow-y-auto pt-20 md:static md:inset-auto md:translate-x-0 md:pt-0 md:w-1/5 md:h-screen md:fixed md:top-16 md:left-0 md:bg-opacity-70 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
        style={{ zIndex: 50, height: 'calc(100vh - 4rem)', height:'100vh' }}
      >
        {/* Close button for mobile */} 
        <button
          className="absolute top-4 right-4 md:hidden"
          onClick={onClose}
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* User Profile Section */}
        {user && (
          <div className="p-4 border-b border-gray-700 bg-gray-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center font-bold text-sm">
                {user.first_name?.charAt(0)?.toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{user.first_name} {user.last_name}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
            </div>
            <Link
              href="/profile"
              className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:bg-gray-700 rounded transition"
            >
              👤 View Profile
            </Link>
          </div>
        )}

        {/* Menu Items */}
        <nav className="pt-6 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`block px-0.5 py-0.5 rounded-lg transition ${
                  isActive
                    ? 'bg-blue-800 text-white font-semibold'
                    : 'text-gray-300 hover:bg-gray-600 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
