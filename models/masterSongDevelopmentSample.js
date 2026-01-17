import mongoose from 'mongoose'

const masterSongDevelopmentSampleSchema = new mongoose.Schema(
  {
    // Basic Information
    sampleCode: {
      type: String,
      required: true,
      index: true,
      description: 'Unique sample code (e.g., MSD-2025-001)'
    },
    sampleItemCode: {
      type: String,
      description: 'Internal item code'
    },
    processingType: {
      type: String,
      required: true,
      default: 'Master Song Development',
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

    // Master Song Development Specific Fields
    designName: {
      type: String,
      required: true,
      description: 'Name of the design'
    },
    designCode: {
      type: String,
      description: 'Unique design code'
    },
    designPhase: {
      type: String,
      enum: ['Conceptual', 'Development', 'Testing', 'Final', 'Production Ready'],
      default: 'Development',
      description: 'Phase of design development'
    },
    developmentStage: {
      type: String,
      description: 'Current development stage details'
    },

    // Pattern and Weave Information
    warpCount: {
      type: String,
      description: 'Warp thread count'
    },
    weftCount: {
      type: String,
      description: 'Weft thread count'
    },
    patternRepeatWidth: {
      type: String,
      description: 'Pattern repeat width in inches/cm'
    },
    patternRepeatHeight: {
      type: String,
      description: 'Pattern repeat height in inches/cm'
    },

    // Yarn Properties
    yarnComposition: {
      type: String,
      description: 'Yarn material composition'
    },
    yarnCount: {
      type: String,
      description: 'Yarn count/thickness'
    },

    // Testing and Quality
    tensileStrength: {
      type: String,
      description: 'Tensile strength in N/5cm'
    },
    elasticity: {
      type: String,
      description: 'Elasticity rating'
    },
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

    // Performance Metrics
    durability: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Very High'],
      description: 'Expected durability level'
    },
    breathability: {
      type: String,
      description: 'Breathability rating'
    },
    drapeability: {
      type: String,
      description: 'How well fabric drapes'
    },

    // Development Timeline
    designStartDate: {
      type: Date,
      description: 'Date when design development started'
    },
    targetCompletionDate: {
      type: Date,
      description: 'Expected completion date'
    },
    lastRevisionDate: {
      type: Date,
      description: 'Date of last revision'
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
      enum: ['Pending', 'Approved', 'Rejected', 'Under Review', 'Ready for Production'],
      default: 'Pending',
      description: 'Development and approval status'
    },

    // Development Team
    designedBy: {
      type: String,
      description: 'Name of designer'
    },
    reviewedBy: {
      type: String,
      description: 'Name of reviewer'
    },
    approvedBy: {
      type: String,
      description: 'Name of approver'
    },

    // Costs and Feasibility
    estimatedProductionCost: {
      type: String,
      description: 'Estimated cost per meter in currency'
    },
    productionFeasibility: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      description: 'How feasible design is for mass production'
    },

    // Notes and Comments
    remarks: {
      type: String,
      description: 'Additional remarks about the sample'
    },
    feedbackNotes: {
      type: String,
      description: 'Feedback from testing and reviews'
    },
    nextSteps: {
      type: String,
      description: 'Planned next steps in development'
    }
  },
  {
    timestamps: true,
    collection: 'MasterSongDevelopmentSampleData'
  }
)

// Create or retrieve the model
const MasterSongDevelopmentSample = mongoose.models.MasterSongDevelopmentSample || mongoose.model('MasterSongDevelopmentSample', masterSongDevelopmentSampleSchema)

export default MasterSongDevelopmentSample
