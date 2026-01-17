 import mongoose from "mongoose";

const heatSettingSampleSchema = new mongoose.Schema(
  {
    // =========================
    // 1. BASIC SAMPLE INFO
    // =========================
    sampleCode: {
      type: String,
      required: true,
      trim: true,
    },

    sampleName: {
      type: String,
      trim: true,
    },

    warpCount: {
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

    customerRequirementWidthPercent: {
      type: String,
    },

    customerRequirementLengthPercent: {
      type: String,
    },

    requiredWeight: {
      type: String,
    },

    processingType: {
      type: String,
      default: "Heat Setting",
    },

    // =========================
    // 2. LOOM & PRODUCTION INFO
    // =========================
    loomNo: {
      type: Number,
    },

    warpingNo: {
      type: Number,
    },

    yard: {
      type: String,
    },

    weavingPPI: {
      type: Number,
    },

    // =========================
    // 3. HEAT SETTING WIDTH DATA
    // =========================
    beforeHSWidth: {
      type: String,
    },

    afterHSWidth: {
      type: String,
    },

    afterDryerWidthInch: {
      type: String,
    },

    dryerSkewCM: {
      type: String,
    },

    // =========================
    // 4. SHRINKAGE & WASH DATA
    // =========================
    afterShrinkageSkewCM: {
      type: String,
    },

    afterShrinkagePPI: {
      type: Number,
    },

    afterShrinkagePPIPlus: {
      type: Number,
    },

    afterWashSkewCM: {
      type: String,
    },

    afterShrinkageWidthInch: {
      type: String,
    },

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
      type: Number,
    },

    // =========================
    // 5. MACHINE & HEAT DETAILS
    // =========================
    burnerCut: {
      type: String,
    },

    machineSpeed: {
      type: String,
    },

    machineWidthSetting: {
      type: String,
    },

    tempSetting: {
      type: String, // e.g. "180°C", "170–190°C", "Medium"
    },

    // =========================
    // 6. DATES & NOTES
    // =========================
    sampleIssues: {
      type: String,
    },

    sampleIssueDate: {
      type: Date,
    },

    finishingDate: {
      type: Date,
    },

    sampleProcessingDetails: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.HeatSettingSample ||
mongoose.model("HeatSettingSample", heatSettingSampleSchema);
