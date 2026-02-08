'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Toast from './Toast'

export default function AdminPanel() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('users')
  const [loading, setLoading] = useState(false)

  // User management state
  const [users, setUsers] = useState([])
  const [userStats, setUserStats] = useState({ totalUsers: 0, verifiedUsers: 0, unverifiedUsers: 0 })
  const [userPage, setUserPage] = useState(1)
  const [userLimit] = useState(10)
  const [updateUserModal, setUpdateUserModal] = useState(null)
  const [updateUserData, setUpdateUserData] = useState({})

  // Sample management state
  const [samples, setSamples] = useState([])
  const [samplePage, setSamplePage] = useState(1)
  const [sampleLimit] = useState(20)
  const [editSampleModal, setEditSampleModal] = useState(null)
  const [editSampleData, setEditSampleData] = useState({})
  const [bulkUploadMode, setBulkUploadMode] = useState(false)
  const [bulkSampleJSON, setBulkSampleJSON] = useState('')

  // Toast state
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState('success')

  // Check if user is admin
  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/signin')
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      if (!parsedUser.isAdmin) {
        router.push('/')
        return
      }
      setUser(parsedUser)
    } catch (err) {
      router.push('/signin')
    }
  }, [router])

  // Fetch users
  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/users?page=${page}&limit=${userLimit}`)
      if (!response.ok) throw new Error('Failed to fetch users')

      const data = await response.json()
      setUsers(data.data || [])
      setUserStats(data.stats || {})
      setUserPage(page)
    } catch (err) {
      displayToast(err.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  // Fetch samples
  const fetchSamples = async (page = 1) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/samples?page=${page}&limit=${sampleLimit}`)
      if (!response.ok) throw new Error('Failed to fetch samples')

      const data = await response.json()
      setSamples(data.data || [])
      setSamplePage(page)
    } catch (err) {
      displayToast(err.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  // Update user status
  const handleUpdateUser = async () => {
    if (!updateUserModal) return

    try {
      setLoading(true)
      const response = await fetch(`/api/admin/users/${updateUserModal._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateUserData),
      })

      if (!response.ok) throw new Error('Failed to update user')

      displayToast('User updated successfully', 'success')
      setUpdateUserModal(null)
      setUpdateUserData({})
      fetchUsers(userPage)
    } catch (err) {
      displayToast(err.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  // Delete user
  const handleDeleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return

    try {
      setLoading(true)
      const response = await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Failed to delete user')

      displayToast('User deleted successfully', 'success')
      fetchUsers(userPage)
    } catch (err) {
      displayToast(err.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  // Update sample
  const handleUpdateSample = async () => {
    if (!editSampleModal) return

    try {
      setLoading(true)
      const response = await fetch(`/api/admin/samples/${editSampleModal._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editSampleData),
      })

      if (!response.ok) throw new Error('Failed to update sample')

      displayToast('Sample updated successfully', 'success')
      setEditSampleModal(null)
      setEditSampleData({})
      fetchSamples(samplePage)
    } catch (err) {
      displayToast(err.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  // Delete sample
  const handleDeleteSample = async (sampleId) => {
    if (!confirm('Are you sure you want to delete this sample?')) return

    try {
      setLoading(true)
      const response = await fetch(`/api/admin/samples/${sampleId}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Failed to delete sample')

      displayToast('Sample deleted successfully', 'success')
      fetchSamples(samplePage)
    } catch (err) {
      displayToast(err.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  // Bulk upload samples
  const handleBulkUpload = async () => {
    if (!bulkSampleJSON.trim()) {
      displayToast('Please enter sample data in JSON format', 'error')
      return
    }

    try {
      setLoading(true)
      const samples = JSON.parse(bulkSampleJSON)

      if (!Array.isArray(samples)) {
        displayToast('Data must be an array of samples', 'error')
        return
      }

      const response = await fetch('/api/admin/samples', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ samples }),
      })

      if (!response.ok) throw new Error('Failed to upload samples')

      displayToast(`${samples.length} samples uploaded successfully`, 'success')
      setBulkSampleJSON('')
      setBulkUploadMode(false)
      fetchSamples(1)
    } catch (err) {
      displayToast(err.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  const displayToast = (message, type = 'info') => {
    setToastMessage(message)
    setToastType(type)
    setShowToast(true)
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <Toast
        message={toastMessage}
        type={toastType}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600">Manage users and sample data</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b">
          <button
            onClick={() => { setActiveTab('users'); fetchUsers(1) }}
            className={`px-4 py-2 font-semibold transition ${
              activeTab === 'users'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Users Management
          </button>
          <button
            onClick={() => { setActiveTab('samples'); fetchSamples(1) }}
            className={`px-4 py-2 font-semibold transition ${
              activeTab === 'samples'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Sample Data Management
          </button>
        </div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-600 text-sm">Total Users</p>
                <p className="text-3xl font-bold text-blue-600">{userStats.totalUsers}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-600 text-sm">Verified Users</p>
                <p className="text-3xl font-bold text-green-600">{userStats.verifiedUsers}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-600 text-sm">Unverified Users</p>
                <p className="text-3xl font-bold text-red-600">{userStats.unverifiedUsers}</p>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Verified</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Authorized</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Admin</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u._id} className="border-t hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm">{u.first_name} {u.last_name}</td>
                        <td className="px-6 py-4 text-sm">{u.email}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${u.verified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {u.verified ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${u.authorized ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {u.authorized ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${u.isAdmin ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                            {u.isAdmin ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <button
                            onClick={() => { setUpdateUserModal(u); setUpdateUserData({ authorized: !u.authorized }) }}
                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteUser(u._id)}
                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Samples Tab */}
        {activeTab === 'samples' && (
          <div>
            {/* Bulk Upload */}
            <div className="mb-6">
              <button
                onClick={() => setBulkUploadMode(!bulkUploadMode)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
              >
                {bulkUploadMode ? 'Cancel Bulk Upload' : 'Bulk Upload Samples'}
              </button>
            </div>

            {bulkUploadMode && (
              <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h3 className="text-lg font-semibold mb-4">Bulk Upload Samples</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Paste an array of sample objects in JSON format:
                </p>
                <textarea
                  value={bulkSampleJSON}
                  onChange={(e) => setBulkSampleJSON(e.target.value)}
                  placeholder='[{"sampleCode": "S001", "sampleItemCode": "SIC001", ...}, ...]'
                  className="w-full h-48 p-4 border rounded-lg font-mono text-sm mb-4"
                />
                <button
                  onClick={handleBulkUpload}
                  disabled={loading}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? 'Uploading...' : 'Upload Samples'}
                </button>
              </div>
            )}

            {/* Samples Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Sample Code</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Item Code</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Customer</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Color</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {samples.map((sample) => (
                      <tr key={sample._id} className="border-t hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium">{sample.sampleCode}</td>
                        <td className="px-6 py-4 text-sm">{sample.sampleItemCode}</td>
                        <td className="px-6 py-4 text-sm">{sample.customerName}</td>
                        <td className="px-6 py-4 text-sm">{sample.color}</td>
                        <td className="px-6 py-4 text-sm">
                          <button
                            onClick={() => { setEditSampleModal(sample); setEditSampleData({ ...sample }) }}
                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteSample(sample._id)}
                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Update User Modal */}
      {updateUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Update User: {updateUserModal.first_name}</h3>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={updateUserData.authorized || false}
                  onChange={(e) => setUpdateUserData({ ...updateUserData, authorized: e.target.checked })}
                  className="mr-2"
                />
                <span>Authorized</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={updateUserData.verified || false}
                  onChange={(e) => setUpdateUserData({ ...updateUserData, verified: e.target.checked })}
                  className="mr-2"
                />
                <span>Verified</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={updateUserData.isAdmin || false}
                  onChange={(e) => setUpdateUserData({ ...updateUserData, isAdmin: e.target.checked })}
                  className="mr-2"
                />
                <span>Admin</span>
              </label>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setUpdateUserModal(null)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-900 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateUser}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Sample Modal */}
      {editSampleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 my-8">
            <h3 className="text-lg font-semibold mb-4">Edit Sample: {editSampleModal.sampleCode}</h3>
            <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto mb-6">
              {Object.keys(editSampleData).map((key) => (
                key !== '_id' && key !== 'createdAt' && (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </label>
                    <input
                      type="text"
                      value={editSampleData[key] || ''}
                      onChange={(e) => setEditSampleData({ ...editSampleData, [key]: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                )
              ))}
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setEditSampleModal(null)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-900 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateSample}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
