import { getDb } from "@/lib/mongodb"
import { verifyToken } from "@/lib/jwt"

export async function GET(request) {
  try {
    const auth = request.headers.get('authorization') || ''
    const cookie = request.headers.get('cookie') || ''
    let token = null
    if (auth.startsWith('Bearer ')) token = auth.slice(7)
    else {
      const m = cookie.match(/(?:^|; )accessToken=([^;]+)/)
      if (m) token = decodeURIComponent(m[1])
    }

    if (!token) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
    }

    let payload
    try {
      payload = verifyToken(token)
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Invalid or expired token' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
    }

    const db = await getDb()
    const users = db.collection('users')

    const user = await users.findOne({ email: payload.email })
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } })
    }

    const userResponse = {
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      id_number: user.id_number,
      verified: user.verified,
      createdAt: user.createdAt,
    }

    return new Response(JSON.stringify({ user: userResponse }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
