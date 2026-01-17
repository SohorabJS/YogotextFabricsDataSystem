#!/usr/bin/env node
/**
 * Seed script for Padding Sample Data
 * Creates sample data for padding fabric samples
 * 
 * Usage: node scripts/seedPaddingSamples.js
 */

import 'dotenv/config.js'
import { getCollection } from '../lib/mongodb.js'

const paddingSampleData = [
  {
    sampleCode: "PSF-2025-001",
    sampleItemCode: "ITEM-PS-001",
    processingType: "Padding",
    construction: "Cotton",
    color: "Royal Blue",
    customerName: "ColorTech Fabrics",
    customerRequiredWidth: "62~63''",
    customerRequirementLengthPercent: "+/-(3~4)%",
    customerRequirementWidthPercent: "+/-(3~4)%",
    weightBW: "11.00 oz",
    paddingChemical: "Reactive Dye",
    paddingConcentration: "3%",
    paddingTemperature: "90°C",
    paddingTime: "1 minute",
    paddingPickup: "80%",
    sampleIssueDate: new Date("2025-01-15"),
    finishingDate: new Date("2025-01-16"),
    loomNo: 5,
    warpingNo: 102,
    yard: "102Y",
    colorIndex: "C.I. Reactive Blue 19",
    colorFastness: "Grade 4-5 (Wash, Light, Rub)",
    levelness: "Even",
    shadeVariation: "None",
    afterPaddingWidthInch: "C:62.5'' F:63.5''",
    weavingPPI: 108,
    afterPaddingSkewCM: "0.3",
    afterPaddingPPI: 108,
    absorptionRate: "Good",
    moistureContent: "7%",
    washFastness: "Grade 4",
    lightFastness: "Grade 4",
    rubbingFastness: "Grade 4",
    tensileStrength: "22 kg/5cm",
    pilling: "Grade 4",
    qualityGrade: "A",
    sampleProcessingDetails: "Singeing → Desizing → Bleaching → Padding (Reactive dye, 3%, 90°C, 1min) → Fixation → Drying"
  },
  {
    sampleCode: "PSF-2025-002",
    sampleItemCode: "ITEM-PS-002",
    processingType: "Padding",
    construction: "Cotton Polyester Blend",
    color: "Deep Red",
    customerName: "Fashion Color Co",
    customerRequiredWidth: "60~62''",
    customerRequirementLengthPercent: "+/-(3~4)%",
    customerRequirementWidthPercent: "+/-(3~4)%",
    weightBW: "10.50 oz",
    paddingChemical: "Vat Dye",
    paddingConcentration: "2.5%",
    paddingTemperature: "85°C",
    paddingTime: "45 seconds",
    paddingPickup: "75%",
    sampleIssueDate: new Date("2025-01-14"),
    finishingDate: new Date("2025-01-15"),
    loomNo: 3,
    warpingNo: 98,
    yard: "98Y",
    colorIndex: "C.I. Vat Red 1",
    colorFastness: "Grade 5 (Wash, Light, Rub)",
    levelness: "Very Even",
    shadeVariation: "None",
    afterPaddingWidthInch: "C:61'' F:62''",
    weavingPPI: 105,
    afterPaddingSkewCM: "0.2",
    afterPaddingPPI: 105,
    absorptionRate: "Very Good",
    moistureContent: "6.5%",
    washFastness: "Grade 5",
    lightFastness: "Grade 5",
    rubbingFastness: "Grade 4-5",
    tensileStrength: "23 kg/5cm",
    pilling: "Grade 4",
    qualityGrade: "A+",
    sampleProcessingDetails: "Singeing → Desizing → Bleaching → Padding (Vat dye, 2.5%, 85°C, 45sec) → Reduction → Oxidation → Drying"
  },
  {
    sampleCode: "PSF-2025-003",
    sampleItemCode: "ITEM-PS-003",
    processingType: "Padding",
    construction: "Rayon",
    color: "Golden Yellow",
    customerName: "Premium Dye Works",
    customerRequiredWidth: "58~60''",
    customerRequirementLengthPercent: "+/-(4~5)%",
    customerRequirementWidthPercent: "+/-(3~4)%",
    weightBW: "12.50 oz",
    paddingChemical: "Direct Dye",
    paddingConcentration: "4%",
    paddingTemperature: "95°C",
    paddingTime: "1.5 minutes",
    paddingPickup: "85%",
    sampleIssueDate: new Date("2025-01-13"),
    finishingDate: new Date("2025-01-14"),
    loomNo: 7,
    warpingNo: 105,
    yard: "105Y",
    colorIndex: "C.I. Direct Yellow 28",
    colorFastness: "Grade 3-4 (Wash), Grade 4 (Light, Rub)",
    levelness: "Even",
    shadeVariation: "Slight",
    afterPaddingWidthInch: "C:59.5'' F:60.5''",
    weavingPPI: 115,
    afterPaddingSkewCM: "0.4",
    afterPaddingPPI: 115,
    absorptionRate: "Excellent",
    moistureContent: "8.5%",
    washFastness: "Grade 3-4",
    lightFastness: "Grade 4",
    rubbingFastness: "Grade 4",
    tensileStrength: "20 kg/5cm",
    pilling: "Grade 4",
    qualityGrade: "A",
    sampleProcessingDetails: "Singeing → Desizing → Bleaching → Padding (Direct dye, 4%, 95°C, 1.5min) → Fixation → Drying"
  },
  {
    sampleCode: "PSF-2025-004",
    sampleItemCode: "ITEM-PS-004",
    processingType: "Padding",
    construction: "Silk Blend",
    color: "Emerald Green",
    customerName: "Luxury Fabrics Ltd",
    customerRequiredWidth: "63~65''",
    customerRequirementLengthPercent: "+/-(2~3)%",
    customerRequirementWidthPercent: "+/-(2~3)%",
    weightBW: "9.50 oz",
    paddingChemical: "Reactive Dye",
    paddingConcentration: "2.8%",
    paddingTemperature: "88°C",
    paddingTime: "50 seconds",
    paddingPickup: "78%",
    sampleIssueDate: new Date("2025-01-12"),
    finishingDate: new Date("2025-01-13"),
    loomNo: 2,
    warpingNo: 110,
    yard: "110Y",
    colorIndex: "C.I. Reactive Green 12",
    colorFastness: "Grade 4-5 (Wash), Grade 5 (Light, Rub)",
    levelness: "Very Even",
    shadeVariation: "None",
    afterPaddingWidthInch: "C:64'' F:65''",
    weavingPPI: 120,
    afterPaddingSkewCM: "0.15",
    afterPaddingPPI: 120,
    absorptionRate: "Good",
    moistureContent: "7.5%",
    washFastness: "Grade 4-5",
    lightFastness: "Grade 5",
    rubbingFastness: "Grade 5",
    tensileStrength: "25 kg/5cm",
    pilling: "Grade 4",
    qualityGrade: "A+",
    sampleProcessingDetails: "Singeing → Desizing → Bleaching → Padding (Reactive dye, 2.8%, 88°C, 50sec) → Fixation → Drying → Softening"
  }
]

async function seedPaddingSamples() {
  try {
    const collection = await getCollection('PaddingSample')
    
    // Check if data already exists
    const count = await collection.countDocuments({})
    if (count > 0) {
      console.log(`ℹ️  PaddingSample collection already has ${count} documents`)
      console.log('Skipping seed to avoid duplicates')
      process.exit(0)
    }
    
    // Insert sample data
    const result = await collection.insertMany(paddingSampleData)
    console.log(`✅ Successfully seeded ${result.insertedCount} padding samples`)
    console.log(`   Inserted IDs: ${Object.keys(result.insertedIds).length} documents`)
    paddingSampleData.forEach((sample) => {
      console.log(`   - ${sample.sampleCode} (${sample.color}) - ${sample.paddingChemical}`)
    })
    process.exit(0)
  } catch (error) {
    console.error('❌ Seeding failed:', error.message)
    process.exit(1)
  }
}

seedPaddingSamples()
