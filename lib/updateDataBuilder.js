/**
 * Builds a safe update object from request body
 * Converts types appropriately (Int, Float, String)
 * Only includes fields that are defined in the request
 * @param {Object} body - Request body with potential updates
 * @returns {Object} Sanitized update object for Prisma
 */
export const buildUpdateData = (body) => {
  const updateData = {}

  // String fields
  if (body.sampleCode !== undefined) updateData.sampleCode = body.sampleCode
  if (body.sampleItemName !== undefined) updateData.sampleItemName = body.sampleItemName
  if (body.processingType !== undefined) updateData.processingType = body.processingType
  if (body.constructionNote !== undefined) updateData.constructionNote = body.constructionNote
  if (body.color !== undefined) updateData.color = body.color
  if (body.customerName !== undefined) updateData.customerName = body.customerName
  if (body.customerRequirementWidthPercent !== undefined) updateData.customerRequirementWidthPercent = body.customerRequirementWidthPercent
  if (body.customerRequirementLengthPercent !== undefined) updateData.customerRequirementLengthPercent = body.customerRequirementLengthPercent
  if (body.customerRequirementWidth !== undefined) updateData.customerRequirementWidth = body.customerRequirementWidth
  if (body.requirementWeight !== undefined) updateData.requirementWeight = body.requirementWeight
  if (body.afterDryerWidth !== undefined) updateData.afterDryerWidth = body.afterDryerWidth
  if (body.processingDetails !== undefined) updateData.processingDetails = body.processingDetails
  if (body.remarks !== undefined) updateData.remarks = body.remarks
  if (body.washShrinkageWidth !== undefined) updateData.washShrinkageWidth = body.washShrinkageWidth
  if (body.finishingDate !== undefined) updateData.finishingDate = body.finishingDate

  // Integer fields
  if (body.loom !== undefined) updateData.loom = parseInt(body.loom, 10)
  if (body.warpingNo !== undefined) updateData.warpingNo = parseInt(body.warpingNo, 10)
  if (body.yard !== undefined) updateData.yard = parseInt(body.yard, 10)
  if (body.weavingPPI !== undefined) updateData.weavingPPI = parseInt(body.weavingPPI, 10)
  if (body.sanforizedPPI !== undefined) updateData.sanforizedPPI = parseInt(body.sanforizedPPI, 10)
  if (body.ppiPlus !== undefined) updateData.ppiPlus = parseInt(body.ppiPlus, 10)
  if (body.washShrinkagePPI !== undefined) updateData.washShrinkagePPI = parseInt(body.washShrinkagePPI, 10)

  // Float fields
  if (body.dryerSkew !== undefined) updateData.dryerSkew = parseFloat(body.dryerSkew)
  if (body.sanfoSkew !== undefined) updateData.sanfoSkew = parseFloat(body.sanfoSkew)
  if (body.afterWashSkew !== undefined) updateData.afterWashSkew = parseFloat(body.afterWashSkew)
  if (body.bowingTestRightHand !== undefined) updateData.bowingTestRightHand = parseFloat(body.bowingTestRightHand)
  if (body.bowingTestLeftHand !== undefined) updateData.bowingTestLeftHand = parseFloat(body.bowingTestLeftHand)
  if (body.washWidthPercentage !== undefined) updateData.washWidthPercentage = parseFloat(body.washWidthPercentage)
  if (body.washLengthPercentage !== undefined) updateData.washLengthPercentage = parseFloat(body.washLengthPercentage)

  return updateData
}

/**
 * Builds search filter for multiple records by sampleCode or sampleItemName
 * @param {string} sampleCode - Optional: search by sample code (case-insensitive partial match)
 * @param {string} sampleItemName - Optional: search by item name (case-insensitive partial match)
 * @returns {Object} Prisma where filter object
 */
export const buildSearchFilter = (sampleCode, sampleItemName) => {
  const where = {}

  if (!sampleCode && !sampleItemName) {
    return where // Return empty filter if no criteria
  }

  if (sampleCode && sampleItemName) {
    // Both provided: return OR condition
    where.OR = [
      {
        sampleCode: {
          contains: sampleCode,
          mode: "insensitive",
        },
      },
      {
        sampleItemName: {
          contains: sampleItemName,
          mode: "insensitive",
        },
      },
    ]
  } else if (sampleCode) {
    // Only sampleCode
    where.sampleCode = {
      contains: sampleCode,
      mode: "insensitive",
    }
  } else {
    // Only sampleItemName
    where.sampleItemName = {
      contains: sampleItemName,
      mode: "insensitive",
    }
  }

  return where
}
