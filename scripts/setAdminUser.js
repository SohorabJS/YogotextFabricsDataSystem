/**
 * Script to set the first user as admin
 * Run with: node scripts/setAdminUser.js
 * Specify email: node scripts/setAdminUser.js <email>
 */

import "@/lib/mongoose.js"
import User from "@/models/user.js"
import { getDb } from "@/lib/mongodb.js"
import { ObjectId } from "mongodb"

async function setAdminUser() {
  try {
    const email = process.argv[2]

    if (!email) {
      console.log("❌ Email is required")
      console.log("Usage: node scripts/setAdminUser.js <email>")
      process.exit(1)
    }

    const db = await getDb()
    const users = db.collection("users")

    // Find user by email
    const user = await users.findOne({ email: email.toLowerCase() })

    if (!user) {
      console.log(`❌ User with email ${email} not found`)
      process.exit(1)
    }

    // Update user to be admin
    const result = await users.updateOne(
      { _id: new ObjectId(user._id) },
      { $set: { isAdmin: true, authorized: true, verified: true } }
    )

    if (result.modifiedCount > 0) {
      console.log(`✅ User ${email} has been set as admin`)
      console.log(`   - isAdmin: true`)
      console.log(`   - authorized: true`)
      console.log(`   - verified: true`)
    } else {
      console.log(`ℹ️ User ${email} already has admin privileges`)
    }

    process.exit(0)
  } catch (err) {
    console.error("❌ Error setting admin user:", err)
    process.exit(1)
  }
}

setAdminUser()
