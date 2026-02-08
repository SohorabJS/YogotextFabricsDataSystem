export const paddingSampleValidation = {
  validateCreateSample(data) {
    const errors = {}

    if (!data.sampleCode || typeof data.sampleCode !== "string" || data.sampleCode.trim() === "") {
      errors.sampleCode = "Sample code is required and must be a non-empty string"
    }

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

    const numberFields = ["loomNo", "warpingNo", "weavingPPI", "afterShrinkagePPI", "ppiPlus", "afterWashPPI"]

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

    if (data.processingType !== undefined && typeof data.processingType !== "string") {
      errors.processingType = "Processing type must be a string"
    }

    return { isValid: Object.keys(errors).length === 0, errors }
  },

  validateUpdateSample(data) {
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

    return { isValid: Object.keys(errors).length === 0, errors }
  },

  validateQueryParams(query) {
    const errors = {}

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

    return { isValid: Object.keys(errors).length === 0, errors }
  }
}