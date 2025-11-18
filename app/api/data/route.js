import prisma from "@/lib/prisma"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get("limit") || "50", 10)
    const offset = parseInt(searchParams.get("offset") || "0", 10)

    const samples = await prisma.sampleData.findMany({
      take: limit,
      skip: offset,
      orderBy: { createdAt: "desc" },
    })
    const total = await prisma.sampleData.count()

    return new Response(JSON.stringify({ data: samples, total, limit, offset }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: "Error fetching sample data" }), { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()

    const newSample = await prisma.sampleData.create({
      data: {
        sampleCode: body.sampleCode,
        sampleItemName: body.sampleItemName,
        processingType: body.processingType,
        constructionNote: body.constructionNote,
        color: body.color,
        customerName: body.customerName,
        customerRequirementWidthPercent: body.customerRequirementWidthPercent,
        customerRequirementLengthPercent: body.customerRequirementLengthPercent,
        customerRequirementWidth: body.customerRequirementWidth,
        requirementWeight: body.requirementWeight,
        finishingDate: body.finishingDate ? new Date(body.finishingDate) : new Date(),
        loom: parseInt(body.loom, 10) || 0,
        warpingNo: parseInt(body.warpingNo, 10) || 0,
        yard: parseInt(body.yard, 10) || 0,
        afterDryerWidth: body.afterDryerWidth,
        weavingPPI: parseInt(body.weavingPPI, 10) || 0,
        sanforizedPPI: parseInt(body.sanforizedPPI, 10) || 0,
        ppiPlus: parseInt(body.ppiPlus, 10) || 0,
        dryerSkew: parseFloat(body.dryerSkew) || 0.0,
        sanfoSkew: parseFloat(body.sanfoSkew) || 0.0,
        afterWashSkew: parseFloat(body.afterWashSkew) || 0.0,
        bowingTestRightHand: parseFloat(body.bowingTestRightHand) || 0.0,
        bowingTestLeftHand: parseFloat(body.bowingTestLeftHand) || 0.0,
        washWidthPercentage: parseFloat(body.washWidthPercentage) || 0.0,
        washLengthPercentage: parseFloat(body.washLengthPercentage) || 0.0,
        washShrinkageWidth: body.washShrinkageWidth,
        washShrinkagePPI: parseInt(body.washShrinkagePPI, 10) || 0,
        processingDetails: body.processingDetails,
        remarks: body.remarks,
      },
    })

    return new Response(JSON.stringify(newSample), { status: 201 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: "Error creating sample data", details: error.message }), { status: 500 })
  }
}
