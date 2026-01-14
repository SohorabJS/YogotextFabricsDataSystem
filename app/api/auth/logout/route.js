import { getDb } from '@/lib/mongodb'
import { verifyRefreshToken } from '@/lib/jwt'
import { ObjectId } from 'mongodb'

export async function POST(request) {
  try {
    const cookie = request.headers.get('cookie') || ''
    const m = cookie.match(/(?:^|; )refreshToken=([^;]+)/)
    const refreshToken = m ? decodeURIComponent(m[1]) : null

    if (refreshToken) {
      try {
        const payload = verifyRefreshToken(refreshToken)
        const db = await getDb()
        const users = db.collection('users')
        await users.updateOne({ _id: new ObjectId(payload.userId) }, { $unset: { refreshToken: '' } })
      } catch (e) {
        // ignore invalid token
      }
    }

    const clearAccess = `accessToken=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
    const clearRefresh = `refreshToken=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`

    return new Response(JSON.stringify({ message: 'Logged out' }), { status: 200, headers: { 'Content-Type': 'application/json', 'Set-Cookie': [clearAccess, clearRefresh] } })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}

export default POST
