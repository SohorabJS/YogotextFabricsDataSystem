import mongoose from "mongoose"

const paddingSampleSchema = new mongoose.Schema({
  // =========================
  // 1. BASIC SAMPLE INFO
  // =========================
  sampleCode: {
    type: String,
    required: true,
    trim: true,
  },

  sampleItemCode: {
    type: String,
    required: true,
    trim: true,
  },

  processingType: {
    type: String,
    default: "Padding",
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
    type: String,
  },

  customerRequirementLengthPercent: {
    type: String,
  },

  customerRequirementWidthPercent: {
    type: String,
  },

  weightBW: {
    type: String,
  },

  // =========================
  // 2. PADDING DETAILS
  // =========================
  paddingChemical: {
    type: String, // e.g., "Reactive dye", "Vat dye", "Direct dye"
  },

  paddingConcentration: {
    type: String, // e.g., "2%", "5%"
  },

  paddingTemperature: {
    type: String, // e.g., "80°C", "100°C"
  },

  paddingTime: {
    type: String, // e.g., "30 seconds", "1 minute"
  },

  paddingPickup: {
    type: String, // e.g., "75%", "80%"
  },

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
    type: String,
  },

  // =========================
  // 3. COLOR MEASUREMENT
  // =========================
  colorIndex: {
    type: String,
  },

  colorFastness: {
    type: String, // Washing, Light, Rubbing fastness rating
  },

  levelness: {
    type: String, // Even or Uneven
  },

  shadeVariation: {
    type: String, // None, Slight, Moderate
  },

  // =========================
  // 4. MEASUREMENTS
  // =========================
  afterPaddingWidthInch: {
    type: String,
  },

  weavingPPI: {
    type: Number,
  },

  afterPaddingSkewCM: {
    type: String,
  },

  afterPaddingPPI: {
    type: Number,
  },

  absorptionRate: {
    type: String,
  },

  moistureContent: {
    type: String, // e.g., "8%"
  },

  // =========================
  // 5. QUALITY TESTING
  // =========================
  washFastness: {
    type: String, // Grade 3-5
  },

  lightFastness: {
    type: String, // Grade 3-5
  },

  rubbingFastness: {
    type: String, // Grade 3-5
  },

  tensileStrength: {
    type: String,
  },

  pilling: {
    type: String,
  },

  qualityGrade: {
    type: String, // A, B, C
  },

  // =========================
  // 6. PROCESSING DETAILS
  // =========================
  sampleProcessingDetails: {
    type: String,
    // Example:
    // Singeing → Desizing → Bleaching → Padding (Reactive dye, 2%, 80°C, 1min) → Fixation → Drying
  },

}, {
  timestamps: true
})

export default mongoose.models.PaddingSample || mongoose.model("PaddingSample", paddingSampleSchema)
