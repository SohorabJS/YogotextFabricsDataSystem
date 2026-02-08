'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfilePanel({ user, isOpen, onClose }) {
  const router = useRouter();
  const [userData, setUserData] = useState(user);

  useEffect(() => {
    setUserData(user);
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    onClose();
    router.push('/signin');
  };

  if (!isOpen || !userData) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
        onClick={onClose}
      />

      {/* Profile Panel - Slide in from right */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-blue-800 text-white p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">My Profile</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-blue-700 p-1 rounded-lg transition"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Profile Card */}
          <div className="text-center">
            <div className="w-20 h-20 bg-linear-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-4xl mx-auto mb-4">
              {userData.first_name?.charAt(0)?.toUpperCase()}
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              {userData.first_name} {userData.last_name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{userData.email}</p>
          </div>

          {/* User Information */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">First Name</label>
              <p className="text-gray-900 font-semibold mt-1">{userData.first_name}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">Last Name</label>
              <p className="text-gray-900 font-semibold mt-1">{userData.last_name}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">Email</label>
              <p className="text-gray-900 font-semibold mt-1">{userData.email}</p>
            </div>
            {userData.id_number && (
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">ID Card Number</label>
                <p className="text-gray-900 font-semibold mt-1">{userData.id_number}</p>
              </div>
            )}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">Verification Status</label>
              <div className="flex items-center gap-2 mt-1">
                {userData.verified ? (
                  <>
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    <p className="text-green-600 font-semibold">✅ Verified</p>
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 bg-yellow-600 rounded-full"></span>
                    <p className="text-yellow-600 font-semibold">⏳ Pending Verification</p>
                  </>
                )}
              </div>
            </div>
          </div>

              nullable

          {/* Account Creation Date */}
          {userData.createdAt && (
            <div className="bg-blue-50 rounded-lg p-4">
              <label className="text-xs font-semibold text-gray-500 uppercase">Account Created</label>
              <p className="text-gray-900 font-semibold mt-1">
                {new Date(userData.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          )}

          {/* Admin Badge */}
          {userData.isAdmin && (
            <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-600">
              <label className="text-xs font-semibold text-purple-600 uppercase">Account Status</label>
              <p className="text-purple-600 font-semibold mt-1">👑 Administrator</p>
            </div>
          )}

          {/* Authorization Status */}
          <div className="bg-gray-50 rounded-lg p-4">
            <label className="text-xs font-semibold text-gray-500 uppercase">Authorization Status</label>
            <div className="flex items-center gap-2 mt-1">
              {userData.authorized ? (
                <>
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  <p className="text-green-600 font-semibold">✅ Authorized</p>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 bg-yellow-600 rounded-full"></span>
                  <p className="text-yellow-600 font-semibold">⏳ Pending Authorization</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 p-6 space-y-3">
          {userData.isAdmin && (
            <Link
              href="/admin"
              onClick={onClose}
              className="w-full px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition text-center block"
            >
              ⚙️ Admin Panel
            </Link>
          )}
          <Link
            href="/profile"
            onClick={onClose}
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition text-center block"
          >
            👤 View Full Profile
          </Link>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </>
  );
}
