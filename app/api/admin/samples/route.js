import { getDb } from "@/lib/mongodb"
import { verifyAdminAccess, adminErrorResponse } from "@/lib/adminMiddleware"
import RegularSample from "@/models/regularSample"
import { ObjectId } from "mongodb"

/**
 * GET /api/admin/samples/regular
 * Get all regular samples with filtering and pagination
 */
export async function GET(request) {
  try {
    const adminAuth = await verifyAdminAccess(request)
    if (!adminAuth.isAdmin) {
      return adminErrorResponse(adminAuth.error)
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page")) || 1
    const limit = parseInt(searchParams.get("limit")) || 20
    const skip = (page - 1) * limit

    const db = await getDb()
    const samples = db.collection("regularsamples")

    // Get total count
    const total = await samples.countDocuments()

    // Get samples with pagination
    const sampleList = await samples
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()

    return new Response(
      JSON.stringify({
        success: true,
        data: sampleList,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )
  } catch (err) {
    console.error("Error fetching samples:", err)
    return new Response(JSON.stringify({ error: "Failed to fetch samples" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

/**
 * POST /api/admin/samples/regular/bulk
 * Create multiple samples at once
 */
export async function POST(request) {
  try {
    const adminAuth = await verifyAdminAccess(request)
    if (!adminAuth.isAdmin) {
      return adminErrorResponse(adminAuth.error)
    }

    const { samples } = await request.json()

    if (!Array.isArray(samples) || samples.length === 0) {
      return new Response(
        JSON.stringify({ error: "Samples array is required and must not be empty" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      )
    }

    const db = await getDb()
    const samplesCollection = db.collection("regularsamples")

    // Add timestamps to all samples
    const samplesWithTimestamp = samples.map((sample) => ({
      ...sample,
      createdAt: new Date(),
      updatedAt: new Date(),
    }))

    const result = await samplesCollection.insertMany(samplesWithTimestamp)

    return new Response(
      JSON.stringify({
        success: true,
        message: `${result.insertedCount} samples created successfully`,
        insertedIds: result.insertedIds,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    )
  } catch (err) {
    console.error("Error creating samples:", err)
    return new Response(JSON.stringify({ error: "Failed to create samples" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
