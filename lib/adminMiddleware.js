import { getDb } from "./mongodb"
import { ObjectId } from "mongodb"
import { verifyAccessToken } from "./jwt"

/**
 * Verify if the request is from an admin user
 * @param {Request} request - The incoming request
 * @returns {Object} { isAdmin: boolean, userId: string, user: Object, error: string }
 */
export async function verifyAdminAccess(request) {
  try {
    // Get token from cookies
    const cookies = request.headers.get("cookie")
    if (!cookies) {
      return { isAdmin: false, error: "No authentication token found" }
    }

    const accessTokenMatch = cookies.match(/accessToken=([^;]+)/)
    if (!accessTokenMatch) {
      return { isAdmin: false, error: "No access token found" }
    }

    const token = accessTokenMatch[1]

    // Verify token
    const decoded = verifyAccessToken(token)
    if (!decoded) {
      return { isAdmin: false, error: "Invalid or expired token" }
    }

    const userId = decoded.userId
    if (!userId) {
      return { isAdmin: false, error: "Invalid token payload" }
    }

    // Get user from database
    const db = await getDb()
    const users = db.collection("users")
    const user = await users.findOne({ _id: new ObjectId(userId) })

    if (!user) {
      return { isAdmin: false, error: "User not found" }
    }

    if (!user.isAdmin) {
      return { isAdmin: false, error: "User is not an admin" }
    }

    return { isAdmin: true, userId, user }
  } catch (err) {
    console.error("Admin verification error:", err)
    return { isAdmin: false, error: "Admin verification failed: " + err.message }
  }
}

/**
 * Create an admin-only response
 * @param {string} message - Error message
 * @param {number} status - HTTP status code
 * @returns {Response}
 */
export function adminErrorResponse(message, status = 403) {
  return new Response(
    JSON.stringify({ error: message }),
    {
      status,
      headers: { "Content-Type": "application/json" },
    }
  )
}
