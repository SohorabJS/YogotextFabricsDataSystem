import { paddingSampleController } from "./paddingSample.controller.js"

export async function GET(req, { params }) {
  const { searchParams } = new URL(req.url)
  
  // If there's an id in params, it means we're fetching a specific sample
  if (params?.id) {
    return paddingSampleController.getSampleById(req, { params })
  }

  // Check for search parameters
  const sampleCode = searchParams.get("sampleCode")
  const sampleItemCode = searchParams.get("sampleItemCode")
  const customerName = searchParams.get("customerName")

  if (sampleCode) {
    return paddingSampleController.searchBySampleCode(req)
  }

  if (sampleItemCode) {
    return paddingSampleController.searchBySampleItemCode(req)
  }

  if (customerName) {
    return paddingSampleController.getSamplesByCustomer(req)
  }

  // Default: get all samples with pagination and filters
  return paddingSampleController.getAllSamples(req)
}

export async function POST(req) {
  // Create a new sample
  return paddingSampleController.createSample(req)
}

export async function PUT(req, { params }) {
  // Full update of a sample
  return paddingSampleController.updateSample(req, { params })
}

export async function PATCH(req, { params }) {
  // Partial update (edit specific fields) of a sample
  return paddingSampleController.partialUpdateSample(req, { params })
}

export async function DELETE(req, { params }) {
  // Delete a sample
  return paddingSampleController.deleteSample(req, { params })
}
