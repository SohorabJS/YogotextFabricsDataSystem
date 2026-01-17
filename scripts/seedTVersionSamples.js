#!/usr/bin/env node
/**
 * Seed script for T-Version Sample Data
 * Creates sample data for T-version fabric samples
 * 
 * Usage: node scripts/seedTVersionSamples.js
 */

import 'dotenv/config.js'
import { getCollection } from '../lib/mongodb.js'

const tVersionSampleData = [
  {
    sampleCode: "TVS-2025-001",
    sampleItemCode: "ITEM-TVS-001",
    processingType: "T-Version",
    construction: "Plain Weave",
    color: "Navy Blue",
    customerName: "TechFabrics Ltd",
    tVersionDesignation: "T-1",
    baseVersion: "RSF-2025-001",
    modificationDescription: "Increased thread count for better durability",
    tensileStrength: "450 N/5cm",
    tearStrength: "25 N",
    elongationPercentage: "12%",
    colorFastness: "Grade 4",
    washFastness: "4",
    lightFastness: "5",
    rubbingFastness: "4",
    qualityGrade: "A",
    approvalStatus: "Under Review",
    remarks: "Enhanced durability version suitable for workwear",
    testingNotes: "All tests passed with improved metrics",
    costPerMeter: "$2.50",
    productionStartDate: "2025-01-10"
  },
  {
    sampleCode: "TVS-2025-002",
    sampleItemCode: "ITEM-TVS-002",
    processingType: "T-Version",
    construction: "Twill Weave",
    color: "White",
    customerName: "PureTextiles Inc",
    tVersionDesignation: "T-2",
    baseVersion: "RSF-2025-002",
    modificationDescription: "Improved breathability with modified weave pattern",
    tensileStrength: "420 N/5cm",
    tearStrength: "23 N",
    elongationPercentage: "14%",
    colorFastness: "Grade 5",
    washFastness: "5",
    lightFastness: "4",
    rubbingFastness: "4",
    qualityGrade: "A",
    approvalStatus: "Approved",
    remarks: "Summer weight version with enhanced comfort",
    testingNotes: "Passed all breathability tests",
    costPerMeter: "$2.75",
    productionStartDate: "2025-01-08"
  },
  {
    sampleCode: "TVS-2025-003",
    sampleItemCode: "ITEM-TVS-003",
    processingType: "T-Version",
    construction: "Oxford Cloth",
    color: "Light Gray",
    customerName: "ComfortWear Co",
    tVersionDesignation: "T-3",
    baseVersion: "RSF-2025-003",
    modificationDescription: "Softness enhancement with special finishing",
    tensileStrength: "380 N/5cm",
    tearStrength: "20 N",
    elongationPercentage: "16%",
    colorFastness: "Grade 4",
    washFastness: "4",
    lightFastness: "4",
    rubbingFastness: "3",
    qualityGrade: "A",
    approvalStatus: "Pending",
    remarks: "Premium soft finish for sensitive skin",
    testingNotes: "Softness index increased by 25%",
    costPerMeter: "$2.80",
    productionStartDate: "2025-01-12"
  },
  {
    sampleCode: "TVS-2025-004",
    sampleItemCode: "ITEM-TVS-004",
    processingType: "T-Version",
    construction: "Poplin",
    color: "Red",
    customerName: "SportsFlex Ltd",
    tVersionDesignation: "T-4",
    baseVersion: "RSF-2025-004",
    modificationDescription: "Elasticity improvement for athletic wear",
    tensileStrength: "480 N/5cm",
    tearStrength: "28 N",
    elongationPercentage: "18%",
    colorFastness: "Grade 4",
    washFastness: "4",
    lightFastness: "5",
    rubbingFastness: "4",
    qualityGrade: "A+",
    approvalStatus: "Approved",
    remarks: "Excellent elasticity for sports applications",
    testingNotes: "Exceeds elasticity requirements",
    costPerMeter: "$3.00",
    productionStartDate: "2025-01-09"
  }
]

async function seedTVersionSamples() {
  try {
    const collection = await getCollection('TVersionSampleData')
    
    // Check if data already exists
    const count = await collection.countDocuments()
    if (count > 0) {
      console.log('✅ T-Version samples already exist in database')
      return
    }

    const result = await collection.insertMany(tVersionSampleData)
    console.log(`✅ Successfully created ${result.insertedCount} T-Version samples`)
    console.log(`   Collection: TVersionSampleData`)
    console.log(`   Sample codes: TVS-2025-001 to TVS-2025-004`)
    
  } catch (error) {
    console.error(`❌ Error seeding T-Version samples: ${error.message}`)
    process.exit(1)
  }
}

seedTVersionSamples()
