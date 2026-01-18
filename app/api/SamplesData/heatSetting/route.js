import { heatSettingSampleController } from "./heatSettingSample.controller.js"

export async function GET(req, { params }) {
  const { searchParams } = new URL(req.url)
  
  // If there's an id in params, it means we're fetching a specific sample
  if (params?.id) {
    return heatSettingSampleController.getSampleById(req, { params })
  }

  // Check for search parameters
  const sampleCode = searchParams.get("sampleCode")
  const sampleItemCode = searchParams.get("sampleItemCode")
  const customerName = searchParams.get("customerName")

  if (sampleCode) {
    return heatSettingSampleController.searchBySampleCode(req)
  }

  if (sampleItemCode) {
    return heatSettingSampleController.searchBySampleItemCode(req)
  }

  if (customerName) {
    return heatSettingSampleController.getSamplesByCustomer(req)
  }

  // Default: get all samples with pagination and filters
  return heatSettingSampleController.getAllSamples(req)
}

export async function POST(req) {
  // Create a new sample
  return heatSettingSampleController.createSample(req)
}

export async function PUT(req, { params }) {
  // Full update of a sample
  return heatSettingSampleController.updateSample(req, { params })
}

export async function PATCH(req, { params }) {
  // Partial update (edit specific fields) of a sample
  return heatSettingSampleController.partialUpdateSample(req, { params })
}

export async function DELETE(req, { params }) {
  // Delete a sample
  return heatSettingSampleController.deleteSample(req, { params })
}
