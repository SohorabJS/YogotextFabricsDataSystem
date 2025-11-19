import prisma from "@/lib/prisma"
import { buildSearchFilter } from "@/lib/updateDataBuilder"

/**
 * Search endpoint for finding multiple sample data records
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

    // At least one filter is required
    if (!sampleCode && !sampleItemName) {
      return new Response(
        JSON.stringify({ error: "At least one filter (sampleCode or sampleItemName) is required" }),
        { status: 400 }
      )
    }

    const where = buildSearchFilter(sampleCode, sampleItemName)

    const samples = await prisma.sampleData.findMany({
      where,
      take: limit,
      skip: offset,
      orderBy: { createdAt: "desc" },
    })

    const total = await prisma.sampleData.count({ where })

    return new Response(
      JSON.stringify({
        data: samples,
        total,
        limit,
        offset,
        filters: { sampleCode, sampleItemName },
      }),
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: "Error searching sample data", details: error.message }), { status: 500 })
  }
}
