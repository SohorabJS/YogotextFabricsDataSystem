// scripts/check-data.js
import prisma from '../lib/prisma.js'

async function checkData() {
  try {
    console.log('Checking database...\n')

    // Get all records
    const allRecords = await prisma.sampleData.findMany()
    console.log(`✅ Total records in database: ${allRecords.length}\n`)

    if (allRecords.length === 0) {
      console.log('❌ NO DATA FOUND! Database is empty.')
      console.log('Create sample data first using POST /api/sampleData\n')
      process.exit(0)
    }

    console.log('📋 Sample records:')
    allRecords.forEach((record, index) => {
      console.log(`\n[${index + 1}] ID: ${record.id}`)
      console.log(`    sampleCode: ${record.sampleCode}`)
      console.log(`    sampleItemName: ${record.sampleItemName}`)
      console.log(`    color: ${record.color}`)
    })

    console.log('\n✅ Test search by sampleCode:')
    const byCode = await prisma.sampleData.findMany({
      where: { sampleCode: { contains: allRecords[0].sampleCode, mode: 'insensitive' } }
    })
    console.log(`Found ${byCode.length} records with code "${allRecords[0].sampleCode}"`)

    console.log('\n✅ Test search by sampleItemName:')
    const byName = await prisma.sampleData.findMany({
      where: { sampleItemName: { contains: 'cotton', mode: 'insensitive' } }
    })
    console.log(`Found ${byName.length} records with "cotton" in name`)

  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

checkData()
