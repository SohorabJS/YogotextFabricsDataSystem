import { getDb } from "@/lib/mongodb"
import bcrypt from "bcryptjs"
import { signToken } from "@/lib/jwt"

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'email and password are required' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    const db = await getDb()
    const users = db.collection('users')

    const normalizedEmail = String(email).toLowerCase()
    const user = await users.findOne({ email: normalizedEmail })
    if (!user) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
    }

    const match = await bcrypt.compare(String(password), user.password)
    if (!match) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
    }

    const userResponse = {
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      verified: user.verified,
      createdAt: user.createdAt,
    }

    // create JWT payload with minimal identifying info
    const token = signToken({ userId: String(user._id), email: user.email, verified: user.verified })

    // set httpOnly cookie
    const maxAge = 60 * 60 * 2 // 2 hours in seconds
    const secure = process.env.NODE_ENV === 'production'
    const cookie = `token=${token}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure ? '; Secure' : ''}`

    return new Response(JSON.stringify({ message: 'Login successful', user: userResponse, token }), { status: 200, headers: { 'Content-Type': 'application/json', 'Set-Cookie': cookie } })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}

export default POST
