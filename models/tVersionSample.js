import mongoose from 'mongoose'

const tVersionSampleSchema = new mongoose.Schema(
  {
    // Basic Information
    sampleCode: {
      type: String,
      required: true,
      index: true,
      description: 'Unique sample code (e.g., TVS-2025-001)'
    },
    sampleItemCode: {
      type: String,
      required: true,
      description: 'Internal item code'
    },
    processingType: {
      type: String,
      required: true,
      default: 'T-Version',
      description: 'Type of processing'
    },

    // Fabric Details
    construction: {
      type: String,
      required: true,
      description: 'Fabric construction type'
    },
    color: {
      type: String,
      required: true,
      description: 'Fabric color'
    },
    customerName: {
      type: String,
      required: true,
      description: 'Customer name'
    },

    // T-Version Specific Fields
    tVersionDesignation: {
      type: String,
      required: true,
      description: 'T-version designation (e.g., T-1, T-2, T-3)'
    },
    baseVersion: {
      type: String,
      description: 'Reference to base sample version'
    },
    modificationDescription: {
      type: String,
      description: 'Description of modifications from base version'
    },

    // Testing Parameters
    tensileStrength: {
      type: String,
      description: 'Tensile strength in N/5cm'
    },
    tearStrength: {
      type: String,
      description: 'Tear strength in N'
    },
    elongationPercentage: {
      type: String,
      description: 'Elongation percentage'
    },

    // Dyeing Properties
    colorFastness: {
      type: String,
      description: 'Overall color fastness grade'
    },
    washFastness: {
      type: String,
      description: 'Wash fastness rating (Grade 3-5)'
    },
    lightFastness: {
      type: String,
      description: 'Light fastness rating (Grade 3-5)'
    },
    rubbingFastness: {
      type: String,
      description: 'Rubbing fastness rating (Grade 3-5)'
    },

    // Quality Assessment
    qualityGrade: {
      type: String,
      enum: ['A', 'A+', 'B', 'C'],
      default: 'A',
      description: 'Overall quality grade'
    },
    approvalStatus: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected', 'Under Review'],
      default: 'Pending',
      description: 'Approval status for production'
    },

    // Notes and Comments
    remarks: {
      type: String,
      description: 'Additional remarks about the sample'
    },
    testingNotes: {
      type: String,
      description: 'Notes from testing process'
    },

    // Metadata
    costPerMeter: {
      type: String,
      description: 'Cost per meter in currency'
    },
    productionStartDate: {
      type: String,
      description: 'Date when production started'
    }
  },
  {
    timestamps: true,
    collection: 'TVersionSampleData'
  }
)

// Create or retrieve the model
const TVersionSample = mongoose.models.TVersionSample || mongoose.model('TVersionSample', tVersionSampleSchema)

export default TVersionSample
