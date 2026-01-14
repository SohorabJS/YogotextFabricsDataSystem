import { getDb } from '@/lib/mongodb'
import { verifyRefreshToken, signAccessToken, signRefreshToken } from '@/lib/jwt'
import { ObjectId } from 'mongodb'

export async function POST(request) {
  try {
    const cookie = request.headers.get('cookie') || ''
    const m = cookie.match(/(?:^|; )refreshToken=([^;]+)/)
    const refreshToken = m ? decodeURIComponent(m[1]) : null

    if (!refreshToken) {
      return new Response(JSON.stringify({ error: 'No refresh token' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
    }

    let payload
    try {
      payload = verifyRefreshToken(refreshToken)
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Invalid or expired refresh token' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
    }

    const db = await getDb()
    const users = db.collection('users')
    const user = await users.findOne({ _id: new ObjectId(payload.userId) })
    if (!user || !user.refreshToken || user.refreshToken !== refreshToken) {
      return new Response(JSON.stringify({ error: 'Refresh token not recognized' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
    }

    // rotate refresh token
    const newRefresh = signRefreshToken({ userId: String(user._id) })
    await users.updateOne({ _id: new ObjectId(user._id) }, { $set: { refreshToken: newRefresh } })

    const accessToken = signAccessToken({ userId: String(user._id), email: user.email, verified: user.verified })

    const accessMaxAge = 15 * 60
    const refreshMaxAge = 7 * 24 * 60 * 60
    const secure = process.env.NODE_ENV === 'production'
    const accessCookie = `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=${accessMaxAge}; SameSite=Lax${secure ? '; Secure' : ''}`
    const refreshCookie = `refreshToken=${newRefresh}; HttpOnly; Path=/; Max-Age=${refreshMaxAge}; SameSite=Lax${secure ? '; Secure' : ''}`

    return new Response(JSON.stringify({ message: 'Token refreshed' }), { status: 200, headers: { 'Content-Type': 'application/json', 'Set-Cookie': [accessCookie, refreshCookie] } })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}

export default POST
