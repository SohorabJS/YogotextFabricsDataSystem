import { getDb } from "@/lib/mongodb"
import bcrypt from "bcryptjs"

export async function POST(request) {
  try {
    const body = await request.json()
    const { first_name, last_name, email, password } = body

    if (!first_name) {
      return new Response(JSON.stringify({ error: "First name is required" }), { status: 400 })
    }
    if (!last_name) {
      return new Response(JSON.stringify({ error: "Last name is required" }), { status: 400 })
    }
    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 })
    }
    if (!password) {
      return new Response(JSON.stringify({ error: "Password is required" }), { status: 400 })
    }

    // Basic email and password validation
    const emailRe = /^\S+@\S+\.\S+$/
    if (!emailRe.test(String(email).toLowerCase())) {
      return new Response(JSON.stringify({ error: "Invalid email format" }), { status: 400 })
    }
    if (String(password).length < 8) {
      return new Response(JSON.stringify({ error: "Password must be at least 8 characters" }), { status: 400 })
    }


    const db = await getDb()
    const users = db.collection("users")

    const normalizedEmail = String(email).toLowerCase()
    const existing = await users.findOne({ email: normalizedEmail })
    if (existing) {
      return new Response(JSON.stringify({ error: "Email already registered" }), { status: 409 })
    }
    

    const now = new Date()
    // Hash password before storing
    const hashed = await bcrypt.hash(String(password), 10)

    const newUser = {
      first_name,
      last_name: last_name || "",
      email: normalizedEmail,
      password: hashed,
      verified: false,
      createdAt: now,
    }

    const result = await users.insertOne(newUser)

    // Don't send password back in response
    const userResponse = {
      _id: result.insertedId,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      verified: newUser.verified,
      createdAt: newUser.createdAt,
    }

    return new Response(JSON.stringify({ data: userResponse }), { status: 201 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: "Server error", details: err.message }), { status: 500 })
  }
}
