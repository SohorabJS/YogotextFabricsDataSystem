#!/usr/bin/env node
/**
 * Master Seed Script - Seeds all sample data
 * Runs all sample type seeds in sequence
 * 
 * Usage: node scripts/seedAll.js
 */

import 'dotenv/config.js'
import { spawn } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const seeds = [
  { file: 'seedRegularSamples.js', name: 'Regular Sample Data' },
  { file: 'seedHeatSettingSamples.js', name: 'Heat Setting Sample Data' },
  { file: 'seedPaddingSamples.js', name: 'Padding Sample Data' },
  { file: 'seedTVersionSamples.js', name: 'T-Version Sample Data' },
  { file: 'seedMasterSongDevelopmentSamples.js', name: 'Master Song Development Sample Data' }
]

console.log('🌱 Starting database seed process...\n')

let currentIndex = 0

function runNextSeed() {
  if (currentIndex >= seeds.length) {
    console.log('\n✅ All seeds completed successfully!')
    console.log('🎉 Database is ready to use!')
    process.exit(0)
  }

  const seed = seeds[currentIndex]
  console.log(`\n📋 Running seed: ${seed.name}`)
  console.log(`   File: ${seed.file}`)
  console.log('─'.repeat(50))

  const child = spawn('node', [path.join(__dirname, seed.file)], {
    stdio: 'inherit',
    cwd: __dirname
  })

  child.on('close', (code) => {
    if (code !== 0) {
      console.error(`\n❌ Error: Seed failed for ${seed.name}`)
      process.exit(1)
    }
    currentIndex++
    runNextSeed()
  })

  child.on('error', (err) => {
    console.error(`\n❌ Error running seed: ${err.message}`)
    process.exit(1)
  })
}

runNextSeed()
