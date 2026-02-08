import { paddingSampleService } from "./paddingSample.service.js"
import { paddingSampleValidation } from "./paddingSample.validation.js"
import { connectMongoose } from "@/lib/mongoose.js"

export const paddingSampleController = {
  async createSample(req) {
    try {
      await connectMongoose()

      const body = await req.json()
      
      const validation = paddingSampleValidation.validateCreateSample(body)
      if (!validation.isValid) {
        return new Response(JSON.stringify({ success: false, errors: validation.errors, message: "Validation failed" }), { status: 400, headers: { "Content-Type": "application/json" } })
      }

      const result = await paddingSampleService.createSample(body)

      if (!result.success) {
        return new Response(JSON.stringify(result), { status: 400, headers: { "Content-Type": "application/json" } })
      }

      return new Response(JSON.stringify(result), { status: 201, headers: { "Content-Type": "application/json" } })
    } catch (error) {
      return new Response(JSON.stringify({ success: false, error: error.message, message: "Server error" }), { status: 500, headers: { "Content-Type": "application/json" } })
    }
  },

  async getAllSamples(req) {
    try {
      await connectMongoose()

      const { searchParams } = new URL(req.url)
      const query = {
        page: searchParams.get("page") || 1,
        limit: searchParams.get("limit") || 10,
        sampleCode: searchParams.get("sampleCode"),
        sampleItemCode: searchParams.get("sampleItemCode"),
        customerName: searchParams.get("customerName"),
        color: searchParams.get("color"),
        processingType: searchParams.get("processingType"),
        sortBy: searchParams.get("sortBy") || "createdAt",
        sortOrder: parseInt(searchParams.get("sortOrder")) || -1
      }

      const validation = paddingSampleValidation.validateQueryParams(query)
      if (!validation.isValid) {
        return new Response(JSON.stringify({ success: false, errors: validation.errors, message: "Invalid query parameters" }), { status: 400, headers: { "Content-Type": "application/json" } })
      }

      const result = await paddingSampleService.getAllSamples(query)

      return new Response(JSON.stringify(result), { status: 200, headers: { "Content-Type": "application/json" } })
    } catch (error) {
      return new Response(JSON.stringify({ success: false, error: error.message, message: "Server error" }), { status: 500, headers: { "Content-Type": "application/json" } })
    }
  },

  async getSampleById(req, { params }) {
    try {
      await connectMongoose()

      const { id } = params

      if (!id) {
        return new Response(JSON.stringify({ success: false, error: "ID is required", message: "Sample ID not provided" }), { status: 400, headers: { "Content-Type": "application/json" } })
      }

      const result = await paddingSampleService.getSampleById(id)

      const status = result.success ? 200 : 404
      return new Response(JSON.stringify(result), { status, headers: { "Content-Type": "application/json" } })
    } catch (error) {
      return new Response(JSON.stringify({ success: false, error: error.message, message: "Server error" }), { status: 500, headers: { "Content-Type": "application/json" } })
    }
  },

  async updateSample(req, { params }) {
    try {
      await connectMongoose()

      const { id } = params
      const body = await req.json()

      if (!id) {
        return new Response(JSON.stringify({ success: false, error: "ID is required", message: "Sample ID not provided" }), { status: 400, headers: { "Content-Type": "application/json" } })
      }

      const validation = paddingSampleValidation.validateUpdateSample(body)
      if (!validation.isValid) {
        return new Response(JSON.stringify({ success: false, errors: validation.errors, message: "Validation failed" }), { status: 400, headers: { "Content-Type": "application/json" } })
      }

      const result = await paddingSampleService.updateSample(id, body)

      const status = result.success ? 200 : 404
      return new Response(JSON.stringify(result), { status, headers: { "Content-Type": "application/json" } })
    } catch (error) {
      return new Response(JSON.stringify({ success: false, error: error.message, message: "Server error" }), { status: 500, headers: { "Content-Type": "application/json" } })
    }
  },

  async partialUpdateSample(req, { params }) {
    try {
      await connectMongoose()

      const { id } = params
      const body = await req.json()

      if (!id) {
        return new Response(JSON.stringify({ success: false, error: "ID is required", message: "Sample ID not provided" }), { status: 400, headers: { "Content-Type": "application/json" } })
      }

      const validation = paddingSampleValidation.validateUpdateSample(body)
      if (!validation.isValid) {
        return new Response(JSON.stringify({ success: false, errors: validation.errors, message: "Validation failed" }), { status: 400, headers: { "Content-Type": "application/json" } })
      }

      const result = await paddingSampleService.partialUpdateSample(id, body)

      const status = result.success ? 200 : 404
      return new Response(JSON.stringify(result), { status, headers: { "Content-Type": "application/json" } })
    } catch (error) {
      return new Response(JSON.stringify({ success: false, error: error.message, message: "Server error" }), { status: 500, headers: { "Content-Type": "application/json" } })
    }
  },

  async deleteSample(req, { params }) {
    try {
      await connectMongoose()

      const { id } = params

      if (!id) {
        return new Response(JSON.stringify({ success: false, error: "ID is required", message: "Sample ID not provided" }), { status: 400, headers: { "Content-Type": "application/json" } })
      }

      const result = await paddingSampleService.deleteSample(id)

      const status = result.success ? 200 : 404
      return new Response(JSON.stringify(result), { status, headers: { "Content-Type": "application/json" } })
    } catch (error) {
      return new Response(JSON.stringify({ success: false, error: error.message, message: "Server error" }), { status: 500, headers: { "Content-Type": "application/json" } })
    }
  },

  async searchBySampleCode(req) {
    try {
      await connectMongoose()

      const { searchParams } = new URL(req.url)
      const sampleCode = searchParams.get("sampleCode")

      if (!sampleCode) {
        return new Response(JSON.stringify({ success: false, error: "Sample code is required", message: "Please provide a sample code to search" }), { status: 400, headers: { "Content-Type": "application/json" } })
      }

      const result = await paddingSampleService.searchBySampleCode(sampleCode)

      const status = result.success ? 200 : 404
      return new Response(JSON.stringify(result), { status, headers: { "Content-Type": "application/json" } })
    } catch (error) {
      return new Response(JSON.stringify({ success: false, error: error.message, message: "Server error" }), { status: 500, headers: { "Content-Type": "application/json" } })
    }
  },

  async searchBySampleItemCode(req) {
    try {
      await connectMongoose()

      const { searchParams } = new URL(req.url)
      const sampleItemCode = searchParams.get("sampleItemCode")

      if (!sampleItemCode) {
        return new Response(JSON.stringify({ success: false, error: "Sample item code is required", message: "Please provide a sample item code to search" }), { status: 400, headers: { "Content-Type": "application/json" } })
      }

      const result = await paddingSampleService.searchBySampleItemCode(sampleItemCode)

      const status = result.success ? 200 : 404
      return new Response(JSON.stringify(result), { status, headers: { "Content-Type": "application/json" } })
    } catch (error) {
      return new Response(JSON.stringify({ success: false, error: error.message, message: "Server error" }), { status: 500, headers: { "Content-Type": "application/json" } })
    }
  },

  async getSamplesByCustomer(req) {
    try {
      await connectMongoose()

      const { searchParams } = new URL(req.url)
      const customerName = searchParams.get("customerName")

      if (!customerName) {
        return new Response(JSON.stringify({ success: false, error: "Customer name is required", message: "Please provide a customer name to search" }), { status: 400, headers: { "Content-Type": "application/json" } })
      }

      const result = await paddingSampleService.getSamplesByCustomer(customerName)

      return new Response(JSON.stringify(result), { status: 200, headers: { "Content-Type": "application/json" } })
    } catch (error) {
      return new Response(JSON.stringify({ success: false, error: error.message, message: "Server error" }), { status: 500, headers: { "Content-Type": "application/json" } })
    }
  }
}