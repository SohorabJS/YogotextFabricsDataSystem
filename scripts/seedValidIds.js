#!/usr/bin/env node
import { getCollection } from '../lib/mongodb.js'

async function seed() {
  const collection = await getCollection('valid_ids')
  const ids = [1358, 1610, 1452, 825, 1338, 1358] // add your allowed id numbers here
  const docs = ids.map((id) => ({ id }))
  try {
    await collection.deleteMany({})
    const res = await collection.insertMany(docs)
    console.log('Inserted valid ids:', res.insertedCount)
    process.exit(0)
  } catch (e) {
    console.error('Seeding failed', e)
    process.exit(1)
  }
}

seed()
