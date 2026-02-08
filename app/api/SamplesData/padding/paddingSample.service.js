import PaddingSample from "@/models/paddingSample.js"
import mongoose from "mongoose"

export const paddingSampleService = {
  async createSample(sampleData) {
    try {
      const newSample = new PaddingSample(sampleData)
      const savedSample = await newSample.save()
      return { success: true, data: savedSample, message: "Sample created successfully" }
    } catch (error) {
      return { success: false, error: error.message, message: "Failed to create sample" }
    }
  },

  async getAllSamples(query = {}) {
    try {
      const { page = 1, limit = 10, sampleCode, customerName, color, processingType, sortBy = "createdAt", sortOrder = -1 } = query

      const filter = {}
      if (sampleCode) filter.sampleCode = { $regex: sampleCode, $options: "i" }
      if (customerName) filter.customerName = { $regex: customerName, $options: "i" }
      if (color) filter.color = { $regex: color, $options: "i" }
      if (processingType) filter.processingType = processingType

      const pageNum = parseInt(page) || 1
      const limitNum = parseInt(limit) || 10
      const skip = (pageNum - 1) * limitNum

      const samples = await PaddingSample.find(filter).sort({ [sortBy]: sortOrder }).skip(skip).limit(limitNum)
      const totalCount = await PaddingSample.countDocuments(filter)
      const totalPages = Math.ceil(totalCount / limitNum)

      return { success: true, data: samples, pagination: { page: pageNum, limit: limitNum, totalCount, totalPages, hasNextPage: pageNum < totalPages }, message: "Samples retrieved successfully" }
    } catch (error) {
      return { success: false, error: error.message, message: "Failed to retrieve samples" }
    }
  },

  async getSampleById(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) return { success: false, error: "Invalid sample ID", message: "The provided ID is not a valid MongoDB ID" }

      const sample = await PaddingSample.findById(id)
      if (!sample) return { success: false, error: "Sample not found", message: "No sample found with the provided ID" }

      return { success: true, data: sample, message: "Sample retrieved successfully" }
    } catch (error) {
      return { success: false, error: error.message, message: "Failed to retrieve sample" }
    }
  },

  async updateSample(id, updateData) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) return { success: false, error: "Invalid sample ID", message: "The provided ID is not a valid MongoDB ID" }

      const updatedSample = await PaddingSample.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
      if (!updatedSample) return { success: false, error: "Sample not found", message: "No sample found with the provided ID" }

      return { success: true, data: updatedSample, message: "Sample updated successfully" }
    } catch (error) {
      return { success: false, error: error.message, message: "Failed to update sample" }
    }
  },

  async partialUpdateSample(id, partialData) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) return { success: false, error: "Invalid sample ID", message: "The provided ID is not a valid MongoDB ID" }

      const filteredData = {}
      for (const [key, value] of Object.entries(partialData)) {
        if (value !== undefined && value !== null) filteredData[key] = value
      }

      const updatedSample = await PaddingSample.findByIdAndUpdate(id, { $set: filteredData }, { new: true, runValidators: true })
      if (!updatedSample) return { success: false, error: "Sample not found", message: "No sample found with the provided ID" }

      return { success: true, data: updatedSample, message: "Sample partially updated successfully" }
    } catch (error) {
      return { success: false, error: error.message, message: "Failed to partially update sample" }
    }
  },

  async deleteSample(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) return { success: false, error: "Invalid sample ID", message: "The provided ID is not a valid MongoDB ID" }

      const deletedSample = await PaddingSample.findByIdAndDelete(id)
      if (!deletedSample) return { success: false, error: "Sample not found", message: "No sample found with the provided ID" }

      return { success: true, data: deletedSample, message: "Sample deleted successfully" }
    } catch (error) {
      return { success: false, error: error.message, message: "Failed to delete sample" }
    }
  },

  async searchBySampleCode(sampleCode) {
    try {
      const samples = await PaddingSample.find({ sampleCode: { $regex: sampleCode, $options: "i" } }).sort({ createdAt: -1 })
      if (samples.length === 0) return { success: false, error: "No samples found", message: "No samples found with the provided sample code" }
      return { success: true, data: samples, count: samples.length, message: `Found ${samples.length} sample(s) successfully` }
    } catch (error) {
      return { success: false, error: error.message, message: "Failed to search samples by code" }
    }
  },

  async searchBySampleItemCode(sampleItemCode) {
    try {
      const samples = await PaddingSample.find({ sampleItemCode: { $regex: sampleItemCode, $options: "i" } }).sort({ createdAt: -1 })
      if (samples.length === 0) return { success: false, error: "No samples found", message: "No samples found with the provided sample item code" }
      return { success: true, data: samples, count: samples.length, message: `Found ${samples.length} sample(s) successfully` }
    } catch (error) {
      return { success: false, error: error.message, message: "Failed to search samples by item code" }
    }
  },

  async getSamplesByCustomer(customerName) {
    try {
      const samples = await PaddingSample.find({ customerName: { $regex: customerName, $options: "i" } }).sort({ createdAt: -1 })
      if (samples.length === 0) return { success: false, error: "No samples found", message: "No samples found with the provided customer name" }
      return { success: true, data: samples, count: samples.length, message: `Found ${samples.length} sample(s) successfully` }
    } catch (error) {
      return { success: false, error: error.message, message: "Failed to retrieve samples by customer" }
    }
  }
}