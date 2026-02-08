import { getDb } from "@/lib/mongodb"
import bcrypt from "bcryptjs"
import { signAccessToken, signRefreshToken } from "@/lib/jwt"
import { ObjectId } from 'mongodb'

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
      isAdmin: user.isAdmin || false,
      authorized: user.authorized || false,
      createdAt: user.createdAt,
    }

    // create access + refresh tokens
    const accessToken = signAccessToken({ userId: String(user._id), email: user.email, verified: user.verified })
    const refreshToken = signRefreshToken({ userId: String(user._id) })

    // store refresh token on user record for revocation/rotation
    await getDb().then(db => db.collection('users').updateOne({ _id: new ObjectId(user._id) }, { $set: { refreshToken } }))

    // set httpOnly cookies
    const accessMaxAge = 15 * 60 // 15 minutes
    const refreshMaxAge = 7 * 24 * 60 * 60 // 7 days
    const secure = process.env.NODE_ENV === 'production'
    const accessCookie = `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=${accessMaxAge}; SameSite=Lax${secure ? '; Secure' : ''}`
    const refreshCookie = `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=${refreshMaxAge}; SameSite=Lax${secure ? '; Secure' : ''}`

    return new Response(JSON.stringify({ message: 'Login successful', user: userResponse }), { status: 200, headers: { 'Content-Type': 'application/json', 'Set-Cookie': [accessCookie, refreshCookie] } })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}

export default POST
