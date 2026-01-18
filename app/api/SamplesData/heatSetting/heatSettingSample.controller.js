import { heatSettingSampleService } from "./heatSettingSample.service.js"
import { heatSettingSampleValidation } from "./heatSettingSample.validation.js"
import { connectMongoose } from "@/lib/mongoose.js"

export const heatSettingSampleController = {
  // CREATE a new sample
  async createSample(req) {
    try {
      await connectMongoose()

      const body = await req.json()
      
      // Validate input
      const validation = heatSettingSampleValidation.validateCreateSample(body)
      if (!validation.isValid) {
        return new Response(
          JSON.stringify({
            success: false,
            errors: validation.errors,
            message: "Validation failed"
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        )
      }

      const result = await heatSettingSampleService.createSample(body)

      if (!result.success) {
        return new Response(
          JSON.stringify(result),
          { status: 400, headers: { "Content-Type": "application/json" } }
        )
      }

      return new Response(
        JSON.stringify(result),
        { status: 201, headers: { "Content-Type": "application/json" } }
      )
    } catch (error) {
      return new Response(
        JSON.stringify({
          success: false,
          error: error.message,
          message: "Server error"
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      )
    }
  },

  // GET all samples
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

      // Validate query params
      const validation = heatSettingSampleValidation.validateQueryParams(query)
      if (!validation.isValid) {
        return new Response(
          JSON.stringify({
            success: false,
            errors: validation.errors,
            message: "Invalid query parameters"
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        )
      }

      const result = await heatSettingSampleService.getAllSamples(query)

      return new Response(
        JSON.stringify(result),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )
    } catch (error) {
      return new Response(
        JSON.stringify({
          success: false,
          error: error.message,
          message: "Server error"
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      )
    }
  },

  // GET sample by ID
  async getSampleById(req, { params }) {
    try {
      await connectMongoose()

      const { id } = params

      if (!id) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "ID is required",
            message: "Sample ID not provided"
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        )
      }

      const result = await heatSettingSampleService.getSampleById(id)

      const status = result.success ? 200 : 404
      return new Response(
        JSON.stringify(result),
        { status, headers: { "Content-Type": "application/json" } }
      )
    } catch (error) {
      return new Response(
        JSON.stringify({
          success: false,
          error: error.message,
          message: "Server error"
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      )
    }
  },

  // UPDATE entire sample
  async updateSample(req, { params }) {
    try {
      await connectMongoose()

      const { id } = params
      const body = await req.json()

      if (!id) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "ID is required",
            message: "Sample ID not provided"
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        )
      }

      // Validate input
      const validation = heatSettingSampleValidation.validateUpdateSample(body)
      if (!validation.isValid) {
        return new Response(
          JSON.stringify({
            success: false,
            errors: validation.errors,
            message: "Validation failed"
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        )
      }

      const result = await heatSettingSampleService.updateSample(id, body)

      const status = result.success ? 200 : 404
      return new Response(
        JSON.stringify(result),
        { status, headers: { "Content-Type": "application/json" } }
      )
    } catch (error) {
      return new Response(
        JSON.stringify({
          success: false,
          error: error.message,
          message: "Server error"
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      )
    }
  },

  // PARTIAL UPDATE (update specific fields)
  async partialUpdateSample(req, { params }) {
    try {
      await connectMongoose()

      const { id } = params
      const body = await req.json()

      if (!id) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "ID is required",
            message: "Sample ID not provided"
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        )
      }

      // Validate input (uses same validation as update)
      const validation = heatSettingSampleValidation.validateUpdateSample(body)
      if (!validation.isValid) {
        return new Response(
          JSON.stringify({
            success: false,
            errors: validation.errors,
            message: "Validation failed"
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        )
      }

      const result = await heatSettingSampleService.partialUpdateSample(id, body)

      const status = result.success ? 200 : 404
      return new Response(
        JSON.stringify(result),
        { status, headers: { "Content-Type": "application/json" } }
      )
    } catch (error) {
      return new Response(
        JSON.stringify({
          success: false,
          error: error.message,
          message: "Server error"
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      )
    }
  },

  // DELETE sample
  async deleteSample(req, { params }) {
    try {
      await connectMongoose()

      const { id } = params

      if (!id) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "ID is required",
            message: "Sample ID not provided"
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        )
      }

      const result = await heatSettingSampleService.deleteSample(id)

      const status = result.success ? 200 : 404
      return new Response(
        JSON.stringify(result),
        { status, headers: { "Content-Type": "application/json" } }
      )
    } catch (error) {
      return new Response(
        JSON.stringify({
          success: false,
          error: error.message,
          message: "Server error"
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      )
    }
  },

  // SEARCH by sample code
  async searchBySampleCode(req) {
    try {
      await connectMongoose()

      const { searchParams } = new URL(req.url)
      const sampleCode = searchParams.get("sampleCode")

      if (!sampleCode) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Sample code is required",
            message: "Please provide a sample code to search"
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        )
      }

      const result = await heatSettingSampleService.searchBySampleCode(sampleCode)

      const status = result.success ? 200 : 404
      return new Response(
        JSON.stringify(result),
        { status, headers: { "Content-Type": "application/json" } }
      )
    } catch (error) {
      return new Response(
        JSON.stringify({
          success: false,
          error: error.message,
          message: "Server error"
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      )
    }
  },

  // SEARCH by sample item code
  async searchBySampleItemCode(req) {
    try {
      await connectMongoose()

      const { searchParams } = new URL(req.url)
      const sampleItemCode = searchParams.get("sampleItemCode")

      if (!sampleItemCode) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Sample item code is required",
            message: "Please provide a sample item code to search"
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        )
      }

      const result = await heatSettingSampleService.searchBySampleItemCode(sampleItemCode)

      const status = result.success ? 200 : 404
      return new Response(
        JSON.stringify(result),
        { status, headers: { "Content-Type": "application/json" } }
      )
    } catch (error) {
      return new Response(
        JSON.stringify({
          success: false,
          error: error.message,
          message: "Server error"
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      )
    }
  },

  // GET samples by customer
  async getSamplesByCustomer(req) {
    try {
      await connectMongoose()

      const { searchParams } = new URL(req.url)
      const customerName = searchParams.get("customerName")

      if (!customerName) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Customer name is required",
            message: "Please provide a customer name to search"
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        )
      }

      const result = await heatSettingSampleService.getSamplesByCustomer(customerName)

      return new Response(
        JSON.stringify(result),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )
    } catch (error) {
      return new Response(
        JSON.stringify({
          success: false,
          error: error.message,
          message: "Server error"
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      )
    }
  }
}
