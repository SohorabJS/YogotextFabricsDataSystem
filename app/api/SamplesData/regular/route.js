import { regularSampleController } from "./regularSample.controller.js"

export async function GET(req, { params }) {
  const { searchParams } = new URL(req.url)
  
  // If there's an id in params, it means we're fetching a specific sample
  if (params?.id) {
    return regularSampleController.getSampleById(req, { params })
  }

  // Check for search parameters
  const sampleCode = searchParams.get("code")
  const customerName = searchParams.get("customer")

  if (sampleCode) {
    return regularSampleController.searchBySampleCode(req)
  }

  if (customerName) {
    return regularSampleController.getSamplesByCustomer(req)
  }

  // Default: get all samples with pagination and filters
  return regularSampleController.getAllSamples(req)
}

export async function POST(req) {
  // Create a new sample
  return regularSampleController.createSample(req)
}

export async function PUT(req, { params }) {
  // Full update of a sample
  return regularSampleController.updateSample(req, { params })
}

export async function PATCH(req, { params }) {
  // Partial update (edit specific fields) of a sample
  return regularSampleController.partialUpdateSample(req, { params })
}

export async function DELETE(req, { params }) {
  // Delete a sample
  return regularSampleController.deleteSample(req, { params })
}
