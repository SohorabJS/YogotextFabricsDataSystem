// Validation rules for Regular Sample
export const regularSampleValidation = {
  validateCreateSample(data) {
    const errors = {}

    // Required fields validation
    if (!data.sampleCode || typeof data.sampleCode !== "string" || data.sampleCode.trim() === "") {
      errors.sampleCode = "Sample code is required and must be a non-empty string"
    }


    // Optional string fields validation
    const stringFields = ["construction", "color", "customerName", "customerRequiredWidth", 
                        "customerRequirementLengthPercent", "customerRequirementWidthPercent",
                        "weightBW", "yard", "afterDryerWidthInch", "dryerSkewCM",
                        "afterShrinkageSkewCM", "afterShrinkageWidthInch", "boxPercentRightHand",
                        "boxPercentLeftHand", "afterWashWidthPercent", "afterWashLengthPercent",
                        "afterWashWidthInch", "sampleProcessingDetails", "afterWashSkewCM"]

    stringFields.forEach(field => {
      if (data[field] !== undefined && data[field] !== null) {
        if (typeof data[field] !== "string") {
          errors[field] = `${field} must be a string`
        }
      }
    })

    // Optional number fields validation
    const numberFields = ["loomNo", "warpingNo", "weavingPPI", "afterShrinkagePPI", "ppiPlus", "afterWashPPI"]

    numberFields.forEach(field => {
      if (data[field] !== undefined && data[field] !== null) {
        if (typeof data[field] !== "number" || isNaN(data[field])) {
          errors[field] = `${field} must be a valid number`
        }
      }
    })

    // Date fields validation
    const dateFields = ["sampleIssueDate", "finishingDate"]

    dateFields.forEach(field => {
      if (data[field] !== undefined && data[field] !== null) {
        const dateValue = new Date(data[field])
        if (isNaN(dateValue.getTime())) {
          errors[field] = `${field} must be a valid date`
        }
      }
    })

    // Processing type validation (if provided)
    if (data.processingType !== undefined && typeof data.processingType !== "string") {
      errors.processingType = "Processing type must be a string"
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  },

  validateUpdateSample(data) {
    // Similar to create but without requiring any fields
    const errors = {}

    const stringFields = ["sampleCode", "sampleItemCode", "construction", "color", "customerName", 
                        "customerRequiredWidth", "customerRequirementLengthPercent", 
                        "customerRequirementWidthPercent", "weightBW", "yard", "afterDryerWidthInch",
                        "dryerSkewCM", "afterShrinkageSkewCM", "afterShrinkageWidthInch",
                        "boxPercentRightHand", "boxPercentLeftHand", "afterWashWidthPercent",
                        "afterWashLengthPercent", "afterWashWidthInch", "sampleProcessingDetails",
                        "afterWashSkewCM", "processingType"]

    stringFields.forEach(field => {
      if (data[field] !== undefined && data[field] !== null) {
        if (typeof data[field] !== "string") {
          errors[field] = `${field} must be a string`
        }
      }
    })

    const numberFields = ["loomNo", "warpingNo", "weavingPPI", "afterShrinkagePPI", 
                        "ppiPlus", "afterWashPPI"]

    numberFields.forEach(field => {
      if (data[field] !== undefined && data[field] !== null) {
        if (typeof data[field] !== "number" || isNaN(data[field])) {
          errors[field] = `${field} must be a valid number`
        }
      }
    })

    const dateFields = ["sampleIssueDate", "finishingDate"]

    dateFields.forEach(field => {
      if (data[field] !== undefined && data[field] !== null) {
        const dateValue = new Date(data[field])
        if (isNaN(dateValue.getTime())) {
          errors[field] = `${field} must be a valid date`
        }
      }
    })

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  },

  validateQueryParams(query) {
    const errors = {}

    // Validate pagination params
    if (query.page !== undefined) {
      const pageNum = parseInt(query.page)
      if (isNaN(pageNum) || pageNum < 1) {
        errors.page = "Page must be a positive number"
      }
    }

    if (query.limit !== undefined) {
      const limitNum = parseInt(query.limit)
      if (isNaN(limitNum) || limitNum < 1) {
        errors.limit = "Limit must be a positive number"
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }
}