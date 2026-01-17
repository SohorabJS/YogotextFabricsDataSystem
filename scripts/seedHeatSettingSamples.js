#!/usr/bin/env node
/**
 * Seed script for Heat Setting Sample Data
 * Creates sample data for heat setting fabric samples
 * 
 * Usage: node scripts/seedHeatSettingSamples.js
 */

import 'dotenv/config.js'
import { getCollection } from '../lib/mongodb.js'

const heatSettingSampleData = [
  {
    sampleCode: "PRPS095-04R5",
    sampleItemCode: "PRPS095-04R5",
    processingType: "Heat Setting",
    construction: "Polyester Blend",
    color: "Navy Blue",
    customerName: "TechFabrics Ltd",
    customerRequiredWidth: "62~63''",
    customerRequirementLengthPercent: "+/-(2~3)%",
    customerRequirementWidthPercent: "+/-(2~3)%",
    weightBW: "12.00 oz",
    heatSettingTemperature: "150°C",
    heatSettingTime: "5 minutes",
    heatSettingPressure: "2.5 bar",
    sampleIssueDate: new Date("2025-01-15"),
    finishingDate: new Date("2025-01-16"),
    loomNo: 4,
    warpingNo: 102,
    yard: "102Y",
    afterHeatSettingWidthInch: "C:62.5'' F:63.5''",
    weavingPPI: 108,
    afterHeatSettingSkewCM: "0.2",
    afterHeatSettingPPI: 108,
    stabilityPercentage: "98%",
    shrinkageResistance: "< 1%",
    wrinkleRecovery: "Grade 4",
    tensileStrength: "22 kg/5cm",
    elasticityRecovery: "95%",
    pilling: "Grade 4",
    qualityGrade: "A",
    sampleProcessingDetails: "Singeing → Desizing → Heat Setting (150°C, 5min, 2.5bar) → Cooling"
  },
  {
    sampleCode: "HSF-2025-002",
    sampleItemCode: "ITEM-HS-002",
    processingType: "Heat Setting",
    construction: "Polyester Cotton",
    color: "White",
    customerName: "Innovation Textiles",
    customerRequiredWidth: "60~62''",
    customerRequirementLengthPercent: "+/-(2~3)%",
    customerRequirementWidthPercent: "+/-(2~3)%",
    weightBW: "11.50 oz",
    heatSettingTemperature: "140°C",
    heatSettingTime: "4 minutes",
    heatSettingPressure: "2.0 bar",
    sampleIssueDate: new Date("2025-01-14"),
    finishingDate: new Date("2025-01-15"),
    loomNo: 6,
    warpingNo: 98,
    yard: "98Y",
    afterHeatSettingWidthInch: "C:61'' F:62''",
    weavingPPI: 105,
    afterHeatSettingSkewCM: "0.15",
    afterHeatSettingPPI: 105,
    stabilityPercentage: "96%",
    shrinkageResistance: "< 1.5%",
    wrinkleRecovery: "Grade 3-4",
    tensileStrength: "20 kg/5cm",
    elasticityRecovery: "92%",
    pilling: "Grade 4",
    qualityGrade: "A",
    sampleProcessingDetails: "Singeing → Desizing → Heat Setting (140°C, 4min, 2.0bar) → Cooling"
  },
  {
    sampleCode: "HSF-2025-003",
    sampleItemCode: "ITEM-HS-003",
    processingType: "Heat Setting",
    construction: "Polyester",
    color: "Light Gray",
    customerName: "Premium Tech Fabrics",
    customerRequiredWidth: "58~60''",
    customerRequirementLengthPercent: "+/-(3~4)%",
    customerRequirementWidthPercent: "+/-(3~4)%",
    weightBW: "13.50 oz",
    heatSettingTemperature: "160°C",
    heatSettingTime: "6 minutes",
    heatSettingPressure: "3.0 bar",
    sampleIssueDate: new Date("2025-01-13"),
    finishingDate: new Date("2025-01-14"),
    loomNo: 7,
    warpingNo: 105,
    yard: "105Y",
    afterHeatSettingWidthInch: "C:59.5'' F:60.5''",
    weavingPPI: 115,
    afterHeatSettingSkewCM: "0.1",
    afterHeatSettingPPI: 115,
    stabilityPercentage: "99%",
    shrinkageResistance: "< 0.5%",
    wrinkleRecovery: "Grade 5",
    tensileStrength: "25 kg/5cm",
    elasticityRecovery: "97%",
    pilling: "Grade 4-5",
    qualityGrade: "A",
    sampleProcessingDetails: "Singeing → Desizing → Heat Setting (160°C, 6min, 3.0bar) → Cooling → Final Check"
  },
  {
    sampleCode: "HSF-2025-004",
    sampleItemCode: "ITEM-HS-004",
    processingType: "Heat Setting",
    construction: "Polyester Microfiber",
    color: "Black",
    customerName: "Advanced Fabrics Co",
    customerRequiredWidth: "63~65''",
    customerRequirementLengthPercent: "+/-(2~3)%",
    customerRequirementWidthPercent: "+/-(2~3)%",
    weightBW: "10.50 oz",
    heatSettingTemperature: "130°C",
    heatSettingTime: "3 minutes",
    heatSettingPressure: "1.8 bar",
    sampleIssueDate: new Date("2025-01-12"),
    finishingDate: new Date("2025-01-13"),
    loomNo: 2,
    warpingNo: 110,
    yard: "110Y",
    afterHeatSettingWidthInch: "C:64'' F:65''",
    weavingPPI: 120,
    afterHeatSettingSkewCM: "0.25",
    afterHeatSettingPPI: 120,
    stabilityPercentage: "97%",
    shrinkageResistance: "< 1%",
    wrinkleRecovery: "Grade 4",
    tensileStrength: "21 kg/5cm",
    elasticityRecovery: "94%",
    pilling: "Grade 4",
    qualityGrade: "A",
    sampleProcessingDetails: "Singeing → Desizing → Heat Setting (130°C, 3min, 1.8bar) → Cooling"
  }
]

async function seedHeatSettingSamples() {
  try {
    const collection = await getCollection('HeatSettingSample')
    
    // Check if data already exists
    const count = await collection.countDocuments({})
    if (count > 0) {
      console.log(`ℹ️  HeatSettingSample collection already has ${count} documents`)
      console.log('Skipping seed to avoid duplicates')
      process.exit(0)
    }
    
    // Insert sample data
    const result = await collection.insertMany(heatSettingSampleData)
    console.log(`✅ Successfully seeded ${result.insertedCount} heat setting samples`)
    console.log(`   Inserted IDs: ${Object.keys(result.insertedIds).length} documents`)
    heatSettingSampleData.forEach((sample) => {
      console.log(`   - ${sample.sampleCode} (${sample.color}) @ ${sample.heatSettingTemperature}`)
    })
    process.exit(0)
  } catch (error) {
    console.error('❌ Seeding failed:', error.message)
    process.exit(1)
  }
}

seedHeatSettingSamples()
