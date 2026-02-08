import { getDb } from "@/lib/mongodb"
import { verifyAdminAccess, adminErrorResponse } from "@/lib/adminMiddleware"
import { ObjectId } from "mongodb"

/**
 * GET /api/admin/users
 * Get all users with pagination and statistics
 */
export async function GET(request) {
  try {
    const adminAuth = await verifyAdminAccess(request)
    if (!adminAuth.isAdmin) {
      return adminErrorResponse(adminAuth.error)
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page")) || 1
    const limit = parseInt(searchParams.get("limit")) || 10
    const skip = (page - 1) * limit

    const db = await getDb()
    const users = db.collection("users")

    // Get total count
    const total = await users.countDocuments()

    // Get verified count
    const verifiedCount = await users.countDocuments({ verified: true })

    // Get users
    const userList = await users
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()

    // Remove sensitive data
    const cleanedUsers = userList.map((user) => ({
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      verified: user.verified || false,
      authorized: user.authorized || false,
      isAdmin: user.isAdmin || false,
      createdAt: user.createdAt,
    }))

    return new Response(
      JSON.stringify({
        success: true,
        data: cleanedUsers,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
        stats: {
          totalUsers: total,
          verifiedUsers: verifiedCount,
          unverifiedUsers: total - verifiedCount,
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )
  } catch (err) {
    console.error("Error fetching users:", err)
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

/**
 * PUT /api/admin/users/:id
 * Update user status (authorized, verified, isAdmin)
 */
export async function PUT(request, { params }) {
  try {
    const adminAuth = await verifyAdminAccess(request)
    if (!adminAuth.isAdmin) {
      return adminErrorResponse(adminAuth.error)
    }

    const userId = params?.id
    if (!userId) {
      return new Response(JSON.stringify({ error: "User ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const { authorized, verified, isAdmin } = await request.json()

    const db = await getDb()
    const users = db.collection("users")

    const updateData = {}
    if (authorized !== undefined) updateData.authorized = authorized
    if (verified !== undefined) updateData.verified = verified
    if (isAdmin !== undefined) updateData.isAdmin = isAdmin

    const result = await users.updateOne(
      { _id: new ObjectId(userId) },
      { $set: updateData }
    )

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    return new Response(
      JSON.stringify({ success: true, message: "User updated successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )
  } catch (err) {
    console.error("Error updating user:", err)
    return new Response(JSON.stringify({ error: "Failed to update user" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

/**
 * DELETE /api/admin/users/:id
 * Delete a user
 */
export async function DELETE(request, { params }) {
  try {
    const adminAuth = await verifyAdminAccess(request)
    if (!adminAuth.isAdmin) {
      return adminErrorResponse(adminAuth.error)
    }

    const userId = params?.id
    if (!userId) {
      return new Response(JSON.stringify({ error: "User ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Prevent deleting admin account
    if (userId === adminAuth.userId) {
      return new Response(
        JSON.stringify({ error: "Cannot delete your own admin account" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      )
    }

    const db = await getDb()
    const users = db.collection("users")

    const result = await users.deleteOne({ _id: new ObjectId(userId) })

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    return new Response(
      JSON.stringify({ success: true, message: "User deleted successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )
  } catch (err) {
    console.error("Error deleting user:", err)
    return new Response(JSON.stringify({ error: "Failed to delete user" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
