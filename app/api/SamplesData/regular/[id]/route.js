import prisma from "@/lib/prisma"
import { buildUpdateData } from "@/lib/updateDataBuilder"

export async function GET(request, { params }) {
  try {
    const id = parseInt(params.id, 10)
    if (Number.isNaN(id)) {
      return new Response(JSON.stringify({ error: "Invalid id" }), { status: 400 })
    }

    const sample = await prisma.sampleData.findUnique({ where: { id } })
    if (!sample) {
      return new Response(JSON.stringify({ error: "Regular sample data not found" }), { status: 404 })
    }

    return new Response(JSON.stringify(sample), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: "Error fetching regular sample data" }), { status: 500 })
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
    return new Response(JSON.stringify({ error: "Error updating regular sample data" }), { status: 500 })
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
    return new Response(JSON.stringify({ error: "Error patching regular sample data" }), { status: 500 })
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
      return new Response(JSON.stringify({ error: "Parent regular sample data not found" }), { status: 404 })
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
        finishingDate: body.finishingDate || "",
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
    return new Response(JSON.stringify({ error: "Error creating regular sample data", details: error.message }), { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id, 10)
    if (Number.isNaN(id)) {
      return new Response(JSON.stringify({ error: "Invalid id" }), { status: 400 })
    }

    await prisma.sampleData.delete({ where: { id } })
    return new Response(JSON.stringify({ message: "Regular sample data deleted successfully" }), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: "Error deleting regular sample data" }), { status: 500 })
  }
}
