#!/usr/bin/env node
/**
 * Seed script for Master Song Development Sample Data
 * Creates sample data for master song development fabric samples
 * 
 * Usage: node scripts/seedMasterSongDevelopmentSamples.js
 */

import 'dotenv/config.js'
import { getCollection } from '../lib/mongodb.js'

const masterSongDevelopmentSampleData = [
  {
    sampleCode: "MSD-2025-001",
    sampleItemCode: "ITEM-MSD-001",
    processingType: "Master Song Development",
    construction: "Jacquard Weave",
    color: "Navy Blue",
    customerName: "EliteDesigns Inc",
    designName: "Ocean Wave Pattern",
    designCode: "OWP-2025-001",
    designPhase: "Testing",
    developmentStage: "Final prototype testing",
    warpCount: "2000",
    weftCount: "1800",
    patternRepeatWidth: "15 inches",
    patternRepeatHeight: "20 inches",
    yarnComposition: "100% Polyester",
    yarnCount: "40s",
    tensileStrength: "520 N/5cm",
    elasticity: "Very High",
    colorFastness: "Grade 5",
    washFastness: "5",
    lightFastness: "5",
    durability: "Very High",
    breathability: "High",
    drapeability: "Excellent",
    designStartDate: new Date("2024-10-15"),
    targetCompletionDate: new Date("2025-02-28"),
    lastRevisionDate: new Date("2025-01-15"),
    qualityGrade: "A+",
    approvalStatus: "Under Review",
    designedBy: "Sarah Johnson",
    reviewedBy: "Michael Chen",
    approvedBy: "Pending",
    estimatedProductionCost: "$3.50",
    productionFeasibility: "High",
    remarks: "Innovative wave pattern with complex weave structure",
    feedbackNotes: "Excellent feedback from customer testing panel",
    nextSteps: "Obtain final customer approval, prepare for production"
  },
  {
    sampleCode: "MSD-2025-002",
    sampleItemCode: "ITEM-MSD-002",
    processingType: "Master Song Development",
    construction: "Dobby Weave",
    color: "Emerald Green",
    customerName: "FashionForward Ltd",
    designName: "Leaf Texture Design",
    designCode: "LTD-2025-002",
    designPhase: "Development",
    developmentStage: "Prototype refinement",
    warpCount: "1800",
    weftCount: "1600",
    patternRepeatWidth: "8 inches",
    patternRepeatHeight: "10 inches",
    yarnComposition: "80% Cotton, 20% Polyester",
    yarnCount: "30s",
    tensileStrength: "450 N/5cm",
    elasticity: "High",
    colorFastness: "Grade 4",
    washFastness: "4",
    lightFastness: "4",
    durability: "High",
    breathability: "Very High",
    drapeability: "Very Good",
    designStartDate: new Date("2024-11-01"),
    targetCompletionDate: new Date("2025-03-15"),
    lastRevisionDate: new Date("2025-01-12"),
    qualityGrade: "A",
    approvalStatus: "Under Review",
    designedBy: "Emma Rodriguez",
    reviewedBy: "David Williams",
    approvedBy: "Pending",
    estimatedProductionCost: "$2.80",
    productionFeasibility: "High",
    remarks: "Natural leaf-inspired texture with eco-friendly materials",
    feedbackNotes: "Good feedback, minor adjustments needed",
    nextSteps: "Make refinements based on feedback, conduct additional durability tests"
  },
  {
    sampleCode: "MSD-2025-003",
    sampleItemCode: "ITEM-MSD-003",
    processingType: "Master Song Development",
    construction: "Satin Weave",
    color: "Gold",
    customerName: "LuxuryCollection Ltd",
    designName: "Golden Shimmer Pattern",
    designCode: "GSP-2025-003",
    designPhase: "Final",
    developmentStage: "Ready for customer approval",
    warpCount: "2500",
    weftCount: "2200",
    patternRepeatWidth: "12 inches",
    patternRepeatHeight: "18 inches",
    yarnComposition: "60% Silk, 40% Polyester",
    yarnCount: "50s",
    tensileStrength: "380 N/5cm",
    elasticity: "Medium",
    colorFastness: "Grade 5",
    washFastness: "4",
    lightFastness: "5",
    durability: "Medium",
    breathability: "Good",
    drapeability: "Excellent",
    designStartDate: new Date("2024-08-20"),
    targetCompletionDate: new Date("2025-01-31"),
    lastRevisionDate: new Date("2025-01-14"),
    qualityGrade: "A+",
    approvalStatus: "Ready for Production",
    designedBy: "Isabella Martinez",
    reviewedBy: "Robert Thompson",
    approvedBy: "James Anderson",
    estimatedProductionCost: "$4.50",
    productionFeasibility: "Medium",
    remarks: "Premium luxury design with silk blend for elegance",
    feedbackNotes: "Outstanding customer feedback, approved for production",
    nextSteps: "Schedule production initiation, arrange bulk yarn sourcing"
  },
  {
    sampleCode: "MSD-2025-004",
    sampleItemCode: "ITEM-MSD-004",
    processingType: "Master Song Development",
    construction: "Plain Weave with Print",
    color: "Multicolor",
    customerName: "InnovativePatterns Co",
    designName: "Geometric Art Collection",
    designCode: "GAC-2025-004",
    designPhase: "Conceptual",
    developmentStage: "Initial design phase",
    warpCount: "1600",
    weftCount: "1400",
    patternRepeatWidth: "6 inches",
    patternRepeatHeight: "6 inches",
    yarnComposition: "100% Cotton",
    yarnCount: "20s",
    tensileStrength: "400 N/5cm",
    elasticity: "Medium",
    colorFastness: "Grade 4",
    washFastness: "4",
    lightFastness: "3",
    durability: "Medium",
    breathability: "Excellent",
    drapeability: "Good",
    designStartDate: new Date("2025-01-05"),
    targetCompletionDate: new Date("2025-05-30"),
    lastRevisionDate: new Date("2025-01-15"),
    qualityGrade: "B",
    approvalStatus: "Pending",
    designedBy: "Alex Kumar",
    reviewedBy: "Pending",
    approvedBy: "Pending",
    estimatedProductionCost: "$2.00",
    productionFeasibility: "High",
    remarks: "Modern geometric patterns with vibrant colors",
    feedbackNotes: "Awaiting customer feedback on initial design",
    nextSteps: "Submit to customer for feedback, refine based on response"
  }
]

async function seedMasterSongDevelopmentSamples() {
  try {
    const collection = await getCollection('MasterSongDevelopmentSampleData')
    
    // Check if data already exists
    const count = await collection.countDocuments()
    if (count > 0) {
      console.log('✅ Master Song Development samples already exist in database')
      return
    }

    const result = await collection.insertMany(masterSongDevelopmentSampleData)
    console.log(`✅ Successfully created ${result.insertedCount} Master Song Development samples`)
    console.log(`   Collection: MasterSongDevelopmentSampleData`)
    console.log(`   Sample codes: MSD-2025-001 to MSD-2025-004`)
    
  } catch (error) {
    console.error(`❌ Error seeding Master Song Development samples: ${error.message}`)
    process.exit(1)
  }
}

seedMasterSongDevelopmentSamples()
