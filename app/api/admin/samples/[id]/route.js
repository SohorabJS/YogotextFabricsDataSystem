import { getDb } from "@/lib/mongodb"
import { verifyAdminAccess, adminErrorResponse } from "@/lib/adminMiddleware"
import { ObjectId } from "mongodb"

/**
 * GET /api/admin/samples/:id
 * Get a specific sample
 */
export async function GET(request, { params }) {
  try {
    const adminAuth = await verifyAdminAccess(request)
    if (!adminAuth.isAdmin) {
      return adminErrorResponse(adminAuth.error)
    }

    const sampleId = params?.id
    if (!sampleId) {
      return new Response(JSON.stringify({ error: "Sample ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const db = await getDb()
    const samples = db.collection("regularsamples")
    const sample = await samples.findOne({ _id: new ObjectId(sampleId) })

    if (!sample) {
      return new Response(JSON.stringify({ error: "Sample not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    return new Response(JSON.stringify({ success: true, data: sample }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    console.error("Error fetching sample:", err)
    return new Response(JSON.stringify({ error: "Failed to fetch sample" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

/**
 * PUT /api/admin/samples/:id
 * Update a sample
 */
export async function PUT(request, { params }) {
  try {
    const adminAuth = await verifyAdminAccess(request)
    if (!adminAuth.isAdmin) {
      return adminErrorResponse(adminAuth.error)
    }

    const sampleId = params?.id
    if (!sampleId) {
      return new Response(JSON.stringify({ error: "Sample ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const updateData = await request.json()
    updateData.updatedAt = new Date()

    const db = await getDb()
    const samples = db.collection("regularsamples")

    const result = await samples.updateOne(
      { _id: new ObjectId(sampleId) },
      { $set: updateData }
    )

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ error: "Sample not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    return new Response(
      JSON.stringify({ success: true, message: "Sample updated successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )
  } catch (err) {
    console.error("Error updating sample:", err)
    return new Response(JSON.stringify({ error: "Failed to update sample" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

/**
 * DELETE /api/admin/samples/:id
 * Delete a sample
 */
export async function DELETE(request, { params }) {
  try {
    const adminAuth = await verifyAdminAccess(request)
    if (!adminAuth.isAdmin) {
      return adminErrorResponse(adminAuth.error)
    }

    const sampleId = params?.id
    if (!sampleId) {
      return new Response(JSON.stringify({ error: "Sample ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const db = await getDb()
    const samples = db.collection("regularsamples")

    const result = await samples.deleteOne({ _id: new ObjectId(sampleId) })

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ error: "Sample not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    return new Response(
      JSON.stringify({ success: true, message: "Sample deleted successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )
  } catch (err) {
    console.error("Error deleting sample:", err)
    return new Response(JSON.stringify({ error: "Failed to delete sample" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

/**
 * PATCH /api/admin/samples/:id
 * Partial update of a sample
 */
export async function PATCH(request, { params }) {
  try {
    const adminAuth = await verifyAdminAccess(request)
    if (!adminAuth.isAdmin) {
      return adminErrorResponse(adminAuth.error)
    }

    const sampleId = params?.id
    if (!sampleId) {
      return new Response(JSON.stringify({ error: "Sample ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const updateData = await request.json()
    updateData.updatedAt = new Date()

    const db = await getDb()
    const samples = db.collection("regularsamples")

    const result = await samples.updateOne(
      { _id: new ObjectId(sampleId) },
      { $set: updateData }
    )

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ error: "Sample not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    return new Response(
      JSON.stringify({ success: true, message: "Sample updated successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )
  } catch (err) {
    console.error("Error updating sample:", err)
    return new Response(JSON.stringify({ error: "Failed to update sample" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
