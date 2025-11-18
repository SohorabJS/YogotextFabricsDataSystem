import prisma from "@/lib/prisma"

const buildUpdateData = (body) => {
  const updateData = {}
  if (body.sampleCode !== undefined) updateData.sampleCode = body.sampleCode
  if (body.sampleItemName !== undefined) updateData.sampleItemName = body.sampleItemName
  if (body.processingType !== undefined) updateData.processingType = body.processingType
  if (body.constructionNote !== undefined) updateData.constructionNote = body.constructionNote
  if (body.color !== undefined) updateData.color = body.color
  if (body.customerName !== undefined) updateData.customerName = body.customerName
  if (body.customerRequirementWidthPercent !== undefined) updateData.customerRequirementWidthPercent = body.customerRequirementWidthPercent
  if (body.customerRequirementLengthPercent !== undefined) updateData.customerRequirementLengthPercent = body.customerRequirementLengthPercent
  if (body.customerRequirementWidth !== undefined) updateData.customerRequirementWidth = body.customerRequirementWidth
  if (body.requirementWeight !== undefined) updateData.requirementWeight = body.requirementWeight
  if (body.finishingDate !== undefined) updateData.finishingDate = new Date(body.finishingDate)
  if (body.loom !== undefined) updateData.loom = parseInt(body.loom, 10)
  if (body.warpingNo !== undefined) updateData.warpingNo = parseInt(body.warpingNo, 10)
  if (body.yard !== undefined) updateData.yard = parseInt(body.yard, 10)
  if (body.afterDryerWidth !== undefined) updateData.afterDryerWidth = body.afterDryerWidth
  if (body.weavingPPI !== undefined) updateData.weavingPPI = parseInt(body.weavingPPI, 10)
  if (body.sanforizedPPI !== undefined) updateData.sanforizedPPI = parseInt(body.sanforizedPPI, 10)
  if (body.ppiPlus !== undefined) updateData.ppiPlus = parseInt(body.ppiPlus, 10)
  if (body.dryerSkew !== undefined) updateData.dryerSkew = parseFloat(body.dryerSkew)
  if (body.sanfoSkew !== undefined) updateData.sanfoSkew = parseFloat(body.sanfoSkew)
  if (body.afterWashSkew !== undefined) updateData.afterWashSkew = parseFloat(body.afterWashSkew)
  if (body.bowingTestRightHand !== undefined) updateData.bowingTestRightHand = parseFloat(body.bowingTestRightHand)
  if (body.bowingTestLeftHand !== undefined) updateData.bowingTestLeftHand = parseFloat(body.bowingTestLeftHand)
  if (body.washWidthPercentage !== undefined) updateData.washWidthPercentage = parseFloat(body.washWidthPercentage)
  if (body.washLengthPercentage !== undefined) updateData.washLengthPercentage = parseFloat(body.washLengthPercentage)
  if (body.washShrinkageWidth !== undefined) updateData.washShrinkageWidth = body.washShrinkageWidth
  if (body.washShrinkagePPI !== undefined) updateData.washShrinkagePPI = parseInt(body.washShrinkagePPI, 10)
  if (body.processingDetails !== undefined) updateData.processingDetails = body.processingDetails
  if (body.remarks !== undefined) updateData.remarks = body.remarks
  return updateData
}

export async function GET(request, { params }) {
  try {
    const id = parseInt(params.id, 10)
    if (Number.isNaN(id)) {
      return new Response(JSON.stringify({ error: "Invalid id" }), { status: 400 })
    }

    const sample = await prisma.sampleData.findUnique({ where: { id } })
    if (!sample) {
      return new Response(JSON.stringify({ error: "Sample data not found" }), { status: 404 })
    }

    return new Response(JSON.stringify(sample), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: "Error fetching sample data" }), { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id, 10)
    if (Number.isNaN(id)) {
      return new Response(JSON.stringify({ error: "Invalid id" }), { status: 400 })
    }

    const body = await request.json()
    const updateData = buildUpdateData(body)

    const updated = await prisma.sampleData.update({
      where: { id },
      data: updateData,
    })

    return new Response(JSON.stringify(updated), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: "Error updating sample data" }), { status: 500 })
  }
}

export async function PATCH(request, { params }) {
  try {
    const id = parseInt(params.id, 10)
    if (Number.isNaN(id)) {
      return new Response(JSON.stringify({ error: "Invalid id" }), { status: 400 })
    }

    const body = await request.json()
    const updateData = buildUpdateData(body)

    const updated = await prisma.sampleData.update({
      where: { id },
      data: updateData,
    })

    return new Response(JSON.stringify(updated), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: "Error patching sample data" }), { status: 500 })
  }
}

export async function POST(request, { params }) {
  try {
    const parentId = parseInt(params.id, 10)
    if (Number.isNaN(parentId)) {
      return new Response(JSON.stringify({ error: "Invalid id" }), { status: 400 })
    }

    // Verify parent record exists
    const parentSample = await prisma.sampleData.findUnique({ where: { id: parentId } })
    if (!parentSample) {
      return new Response(JSON.stringify({ error: "Parent sample data not found" }), { status: 404 })
    }

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

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id, 10)
    if (Number.isNaN(id)) {
      return new Response(JSON.stringify({ error: "Invalid id" }), { status: 400 })
    }

    await prisma.sampleData.delete({ where: { id } })
    return new Response(JSON.stringify({ message: "Sample data deleted successfully" }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: "Error deleting sample data" }), { status: 500 })
  }
}
