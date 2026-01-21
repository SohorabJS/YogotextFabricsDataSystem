import mongoose from "mongoose"

const regularSampleSchema = new mongoose.Schema({
  // =========================
  // 1. BASIC SAMPLE INFO
  // =========================
  sampleCode: {
    type: String,
    required: true
  },

  sampleItemCode: {
    type: String
  },

  processingType: {
    type: String,
    default: "Regular Finish",
  },

  construction: {
    type: String,
  },

  color: {
    type: String,
  },

  customerName: {
    type: String,
  },

  customerRequiredWidth: {
    type: String, // example: 62~63''
  },

  customerRequirementLengthPercent: {
    type: String, // example: +/-(3~4)%
  },

  customerRequirementWidthPercent: {
    type: String, // example: +/-(3~4)%
  },

  weightBW: {
    type: String, // 10.00 oz
  },

  // =========================
  // 3. PRODUCTION DETAILS
  // =========================
  sampleIssueDate: {
    type: Date,
  },

  finishingDate: {
    type: Date,
  },

  loomNo: {
    type: Number,
  },

  warpingNo: {
    type: Number,
  },

  yard: {
    type: String, // "102Y"
  },

  // =========================
  // 4. MEASUREMENTS
  // =========================
  afterDryerWidthInch: {
    type: String, // C:64.3'' F:65.3''
  },

  weavingPPI: {
    type: Number,
  },

  dryerSkewCM: {
    type: String,
  },

  afterShrinkageSkewCM: {
    type: String,
  },

  afterShrinkagePPI: {
    type: Number,
  },

  ppiPlus: {
    type: Number, // +7
  },

  afterWashSkewCM: {
    type: String,
  },

  afterShrinkageWidthInch: {
    type: String, // C:65'' F:66''
  },

  // =========================
  // 5. SHRINKAGE / BOX %
  // =========================
  boxPercentRightHand: {
    type: String,
  },

  boxPercentLeftHand: {
    type: String,
  },

  afterWashWidthPercent: {
    type: String,
  },

  afterWashLengthPercent: {
    type: String,
  },

  afterWashWidthInch: {
    type: String,
  },

  afterWashPPI: {
    type: String,
  },

  sampleProcessingDetails: {
    type: String,
    // Example:
    // Singeing → Dryer(5box 60°C) → Sanforized
  },
}, {
  timestamps: true
})

export default mongoose.models.RegularSample || mongoose.model("RegularSample", regularSampleSchema)
