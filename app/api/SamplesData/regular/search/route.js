import prisma from "@/lib/prisma"
import { buildSearchFilter } from "@/lib/updateDataBuilder"

/**
 * Search endpoint for finding multiple regular sample data records
 * Supports filtering by sampleCode and/or sampleItemName
 * Returns all matching records
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const sampleCode = searchParams.get("sampleCode")
    const sampleItemName = searchParams.get("sampleItemName")
    const limit = parseInt(searchParams.get("limit") || "100", 10)
    const offset = parseInt(searchParams.get("offset") || "0", 10)

    // Log for debugging
    console.log("Search params:", { sampleCode, sampleItemName, limit, offset })

    // At least one filter is required
    if (!sampleCode && !sampleItemName) {
      return new Response(
        JSON.stringify({ 
          error: "At least one filter (sampleCode or sampleItemName) is required",
          example: "GET /api/SamplesData/regular/search?sampleCode=SC001 or ?sampleItemName=Cotton"
        }),
        { status: 400 }
      )
    }

    const where = buildSearchFilter(sampleCode, sampleItemName)
    
    console.log("Where filter:", JSON.stringify(where, null, 2))

    const samples = await prisma.sampleData.findMany({
      where,
      take: limit,
      skip: offset,
      orderBy: { createdAt: "desc" },
    })

    const total = await prisma.sampleData.count({ where })

    console.log("Found samples:", total)

    return new Response(
      JSON.stringify({
        data: samples,
        total,
        limit,
        offset,
        filters: { sampleCode, sampleItemName },
        message: total === 0 ? "No records found with these filters" : `Found ${total} matching records`
      }),
      { status: 200 }
    )
  } catch (error) {
    console.error("Search error:", error)
    return new Response(JSON.stringify({ 
      error: "Error searching regular sample data", 
      details: error.message 
    }), { status: 500 })
  }
}
