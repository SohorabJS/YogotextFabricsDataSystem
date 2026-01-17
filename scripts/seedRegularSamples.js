#!/usr/bin/env node
/**
 * Seed script for Regular Sample Data
 * Creates sample data for regular fabric samples
 * 
 * Usage: node scripts/seedRegularSamples.js
 */

import 'dotenv/config.js'
import { getCollection } from '../lib/mongodb.js'

const regularSampleData = [
  {
    sampleCode: "X26004",
    sampleItemCode: "",
    processingType: "Regular Finish",
    construction: "4500x42 / 9rn(Nishat)X10ring(Badsha),3/1 R.H.T",
    color: "Navy Blue",
    customerName: "ABC Textiles",
    customerRequiredWidth: "62~63''",
    customerRequirementLengthPercent: "+/-(3~4)%",
    customerRequirementWidthPercent: "+/-(3~4)%",
    weightBW: "10.00 oz",
    sampleIssueDate: new Date("2025-01-15"),
    finishingDate: new Date("2025-01-16"),
    loomNo: 5,
    warpingNo: 102,
    yard: "102Y",
    afterDryerWidthInch: "C:64.3'' F:65.3''",
    weavingPPI: 108,
    dryerSkewCM: "0.5",
    afterShrinkageSkewCM: "0.3",
    afterShrinkagePPI: 110,
    ppiPlus: 2,
    afterWashSkewCM: "0.2",
    afterShrinkageWidthInch: "C:65'' F:66''",
    boxPercentRightHand: "2.5%",
    boxPercentLeftHand: "2.3%",
    afterWashWidthPercent: "1.5%",
    afterWashLengthPercent: "2.0%",
    afterWashWidthInch: "64.5",
    afterWashPPI: 112,
    sampleProcessingDetails: "Singeing → Dryer(5box 60°C) → Sanforized"
  },
  {
    sampleCode: "RSF-2025-002",
    sampleItemCode: "RN085-07R5",
    processingType: "Regular Finish",
    construction: "4500x42 / 9rn(Nishat)X10ring(Badsha),3/1 R.H.T",
    color: "White",
    customerName: "XYZ Corporation",
    customerRequiredWidth: "60~62''",
    customerRequirementLengthPercent: "+/-(2~3)%",
    customerRequirementWidthPercent: "+/-(2~3)%",
    weightBW: "12.50 oz",
    sampleIssueDate: new Date("2025-01-14"),
    finishingDate: new Date("2025-01-15"),
    loomNo: 3,
    warpingNo: 98,
    yard: "98Y",
    afterDryerWidthInch: "C:61.5'' F:62.5''",
    weavingPPI: 105,
    dryerSkewCM: "0.4",
    afterShrinkageSkewCM: "0.25",
    afterShrinkagePPI: 107,
    ppiPlus: 2,
    afterWashSkewCM: "0.15",
    afterShrinkageWidthInch: "C:62'' F:63''",
    boxPercentRightHand: "2.0%",
    boxPercentLeftHand: "1.8%",
    afterWashWidthPercent: "1.2%",
    afterWashLengthPercent: "1.8%",
    afterWashWidthInch: "62.0",
    afterWashPPI: 110,
    sampleProcessingDetails: "Singeing → Dryer(5box 60°C) → Sanforized"
  },
  {
    sampleCode: "X25430",
    sampleItemCode: "",
    processingType: "Regular Finish",
    construction: "4500x42 / 9rn(Nishat)X10ring(Badsha),3/1 R.H.T",
    color: "Light Gray",
    customerName: "Premium Fabrics Ltd",
    customerRequiredWidth: "58~60''",
    customerRequirementLengthPercent: "+/-(3~5)%",
    customerRequirementWidthPercent: "+/-(2~4)%",
    weightBW: "11.00 oz",
    sampleIssueDate: new Date("2025-01-13"),
    finishingDate: new Date("2025-01-14"),
    loomNo: 250,
    warpingNo: 260016,
    yard: "105Y",
    afterDryerWidthInch: "C:59.5'' F:60.5''",
    weavingPPI: 42,
    dryerSkewCM: "21cm",
    afterShrinkageSkewCM: "17.5cm",
    afterShrinkagePPI: 45,
    ppiPlus: +3,
    afterWashSkewCM: "17",
    afterShrinkageWidthInch: "C:60'' F:61''",
    boxPercentRightHand: "3.0%",
    boxPercentLeftHand: "2.8%",
    afterWashWidthPercent: "2.0%",
    afterWashLengthPercent: "2.5%",
    afterWashWidthInch: "60.5''",
    afterWashPPI: 46,
    sampleProcessingDetails: "Singeing → Dryer(5box 60°C) → Sanforized"
  },
  {
    sampleCode: "X25432",
    sampleItemCode: "",
    processingType: "Regular Finish",
    construction: "Poplin",
    color: "Red",
    customerName: "Fashion Textiles Inc",
    customerRequiredWidth: "63~65''",
    customerRequirementLengthPercent: "+/-(2~3)%",
    customerRequirementWidthPercent: "+/-(3~4)%",
    weightBW: "9.50 oz",
    sampleIssueDate: new Date("2025-01-12"),
    finishingDate: new Date("2025-01-13"),
    loomNo: 315,
    warpingNo:254658,
    yard: "110Y",
    afterDryerWidthInch: "C:64'' F:65''",
    weavingPPI: 120,
    dryerSkewCM: "0.3",
    afterShrinkageSkewCM: "0.2",
    afterShrinkagePPI: 122,
    ppiPlus: 2,
    afterWashSkewCM: "0.1",
    afterShrinkageWidthInch: "C:64.5'' F:65.5''",
    boxPercentRightHand: "1.8%",
    boxPercentLeftHand: "1.6%",
    afterWashWidthPercent: "1.0%",
    afterWashLengthPercent: "1.5%",
    afterWashWidthInch: "64.2",
    afterWashPPI: 123,
    sampleProcessingDetails: "Singeing → Dryer(3box 55°C) → Sanforized"
  },
  {
    sampleCode: "X25275",
    sampleItemCode: "Not Found",
    processingType: "Regular Finish",
    construction: "Satin Weave",
    color: "Black",
    customerName: "Elite Fabrics Co",
    customerRequiredWidth: "61~62''",
    customerRequirementLengthPercent: "+/-(4~5)%",
    customerRequirementWidthPercent: "+/-(3~4)%",
    weightBW: "13.00 oz",
    sampleIssueDate: new Date("2025-01-11"),
    finishingDate: new Date("2025-01-12"),
    loomNo: 8,
    warpingNo: 115,
    yard: "115Y",
    afterDryerWidthInch: "C:61.5'' F:62.5''",
    weavingPPI: 130,
    dryerSkewCM: "0.7",
    afterShrinkageSkewCM: "0.4",
    afterShrinkagePPI: 132,
    ppiPlus: 2,
    afterWashSkewCM: "0.3",
    afterShrinkageWidthInch: "C:62'' F:63''",
    boxPercentRightHand: "3.2%",
    boxPercentLeftHand: "3.0%",
    afterWashWidthPercent: "2.2%",
    afterWashLengthPercent: "3.0%",
    afterWashWidthInch: "62.2",
    afterWashPPI: 133,
    sampleProcessingDetails: "Singeing → Dryer(5box 60°C) → Sanforized"
  }
]

async function seedRegularSamples() {
  try {
    const collection = await getCollection('RegularSample')
    
    // Check if data already exists
    const count = await collection.countDocuments({})
    if (count > 0) {
      console.log(`ℹ️  RegularSample collection already has ${count} documents`)
      console.log('Delete existing data? (y/n): ', )
      process.exit(0)
    }
    
    // Insert sample data
    const result = await collection.insertMany(regularSampleData)
    console.log(`✅ Successfully seeded ${result.insertedCount} regular samples`)
    console.log(`   Inserted IDs: ${Object.keys(result.insertedIds).length} documents`)
    regularSampleData.forEach((sample) => {
      console.log(`   - ${sample.sampleCode} (${sample.color})`)
    })
    process.exit(0)
  } catch (error) {
    console.error('❌ Seeding failed:', error.message)
    process.exit(1)
  }
}

seedRegularSamples()
