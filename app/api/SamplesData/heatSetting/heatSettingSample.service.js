import HeatSettingSample from "@/models/heatSettingSample.js"
import mongoose from "mongoose"

export const heatSettingSampleService = {
  // CREATE a new heat setting sample
  async createSample(sampleData) {
    try {
      const newSample = new HeatSettingSample(sampleData)
      const savedSample = await newSample.save()
      return {
        success: true,
        data: savedSample,
        message: "Sample created successfully"
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: "Failed to create sample"
      }
    }
  },

  // READ all heat setting samples with pagination and filtering
  async getAllSamples(query = {}) {
    try {
      const { 
        page = 1, 
        limit = 10, 
        sampleCode, 
        customerName,
        color,
        processingType,
        sortBy = "createdAt",
        sortOrder = -1
      } = query

      // Build filter object
      const filter = {}
      if (sampleCode) filter.sampleCode = { $regex: sampleCode, $options: "i" }
      if (customerName) filter.customerName = { $regex: customerName, $options: "i" }
      if (color) filter.color = { $regex: color, $options: "i" }
      if (processingType) filter.processingType = processingType

      // Calculate pagination
      const pageNum = parseInt(page) || 1
      const limitNum = parseInt(limit) || 10
      const skip = (pageNum - 1) * limitNum

      // Fetch samples and total count
      const samples = await HeatSettingSample.find(filter)
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limitNum)

      const totalCount = await HeatSettingSample.countDocuments(filter)
      const totalPages = Math.ceil(totalCount / limitNum)

      return {
        success: true,
        data: samples,
        pagination: {
          page: pageNum,
          limit: limitNum,
          totalCount,
          totalPages,
          hasNextPage: pageNum < totalPages
        },
        message: "Samples retrieved successfully"
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: "Failed to retrieve samples"
      }
    }
  },

  // READ a single sample by ID
  async getSampleById(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return {
          success: false,
          error: "Invalid sample ID",
          message: "The provided ID is not a valid MongoDB ID"
        }
      }

      const sample = await HeatSettingSample.findById(id)
      if (!sample) {
        return {
          success: false,
          error: "Sample not found",
          message: "No sample found with the provided ID"
        }
      }

      return {
        success: true,
        data: sample,
        message: "Sample retrieved successfully"
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: "Failed to retrieve sample"
      }
    }
  },

  // UPDATE entire sample (full update)
  async updateSample(id, updateData) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return {
          success: false,
          error: "Invalid sample ID",
          message: "The provided ID is not a valid MongoDB ID"
        }
      }

      const updatedSample = await HeatSettingSample.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      )

      if (!updatedSample) {
        return {
          success: false,
          error: "Sample not found",
          message: "No sample found with the provided ID"
        }
      }

      return {
        success: true,
        data: updatedSample,
        message: "Sample updated successfully"
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: "Failed to update sample"
      }
    }
  },

  // PARTIAL UPDATE (update specific fields only)
  async partialUpdateSample(id, partialData) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return {
          success: false,
          error: "Invalid sample ID",
          message: "The provided ID is not a valid MongoDB ID"
        }
      }

      // Only update provided fields
      const filteredData = {}
      for (const [key, value] of Object.entries(partialData)) {
        if (value !== undefined && value !== null) {
          filteredData[key] = value
        }
      }

      const updatedSample = await HeatSettingSample.findByIdAndUpdate(
        id,
        { $set: filteredData },
        { new: true, runValidators: true }
      )

      if (!updatedSample) {
        return {
          success: false,
          error: "Sample not found",
          message: "No sample found with the provided ID"
        }
      }

      return {
        success: true,
        data: updatedSample,
        message: "Sample partially updated successfully"
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: "Failed to partially update sample"
      }
    }
  },

  // DELETE a sample
  async deleteSample(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return {
          success: false,
          error: "Invalid sample ID",
          message: "The provided ID is not a valid MongoDB ID"
        }
      }

      const deletedSample = await HeatSettingSample.findByIdAndDelete(id)

      if (!deletedSample) {
        return {
          success: false,
          error: "Sample not found",
          message: "No sample found with the provided ID"
        }
      }

      return {
        success: true,
        data: deletedSample,
        message: "Sample deleted successfully"
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: "Failed to delete sample"
      }
    }
  },

  // SEARCH by sample code - returns ALL matching samples
  async searchBySampleCode(sampleCode) {
    try {
      const samples = await HeatSettingSample.find({
        sampleCode: { $regex: sampleCode, $options: "i" }
      }).sort({ createdAt: -1 })

      if (samples.length === 0) {
        return {
          success: false,
          error: "No samples found",
          message: "No samples found with the provided sample code"
        }
      }

      return {
        success: true,
        data: samples,
        count: samples.length,
        message: `Found ${samples.length} sample(s) successfully`
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: "Failed to search samples by code"
      }
    }
  },

  // SEARCH by sample item code
  async searchBySampleItemCode(sampleItemCode) {
    try {
      const samples = await HeatSettingSample.find({
        sampleItemCode: { $regex: sampleItemCode, $options: "i" }
      }).sort({ createdAt: -1 })

      if (samples.length === 0) {
        return {
          success: false,
          error: "No samples found",
          message: "No samples found with the provided sample item code"
        }
      }

      return {
        success: true,
        data: samples,
        count: samples.length,
        message: `Found ${samples.length} sample(s) successfully`
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: "Failed to search samples by item code"
      }
    }
  },

  // GET samples by customer name
  async getSamplesByCustomer(customerName) {
    try {
      const samples = await HeatSettingSample.find({
        customerName: { $regex: customerName, $options: "i" }
      }).sort({ createdAt: -1 })

      if (samples.length === 0) {
        return {
          success: false,
          error: "No samples found",
          message: "No samples found with the provided customer name"
        }
      }

      return {
        success: true,
        data: samples,
        count: samples.length,
        message: `Found ${samples.length} sample(s) successfully`
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: "Failed to retrieve samples by customer"
      }
    }
  }
}
