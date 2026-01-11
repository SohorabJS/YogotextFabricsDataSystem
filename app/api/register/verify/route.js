import { getDb } from "@/lib/mongodb"

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, code, id_number } = body

    if (!email || !code || !id_number) {
      return new Response(JSON.stringify({ error: 'email, code and id_number are required' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    const db = await getDb()
    const users = db.collection('users')

    const normalizedEmail = String(email).toLowerCase()
    const user = await users.findOne({ email: normalizedEmail })
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } })
    }

    if (user.verified) {
      return new Response(JSON.stringify({ message: 'User already verified' }), { status: 200, headers: { 'Content-Type': 'application/json' } })
    }

    const v = user.verification || {}
    const attempts = v.attempts || 0
    const maxAttempts = v.maxAttempts || 3
    if (attempts >= maxAttempts) {
      return new Response(JSON.stringify({ error: 'Too many attempts, verification locked' }), { status: 403, headers: { 'Content-Type': 'application/json' } })
    }

    if (!v.code || !v.codeExpires) {
      return new Response(JSON.stringify({ error: 'No verification code found; request a new code' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    if (new Date(v.codeExpires) < new Date()) {
      return new Response(JSON.stringify({ error: 'Verification code expired' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    if (String(v.code) !== String(code)) {
      await users.updateOne({ _id: user._id }, { $inc: { 'verification.attempts': 1 } })
      const updated = await users.findOne({ _id: user._id })
      if ((updated.verification?.attempts || 0) >= (updated.verification?.maxAttempts || 3)) {
        return new Response(JSON.stringify({ error: 'Too many attempts, verification locked' }), { status: 403, headers: { 'Content-Type': 'application/json' } })
      }
      return new Response(JSON.stringify({ error: 'Invalid verification code' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    // Code matches; now verify the provided id_number against allowed IDs
    const ids = db.collection('valid_ids')
    const found = await ids.findOne({ id: id_number })
    if (!found) {
      await users.updateOne({ _id: user._id }, { $inc: { 'verification.attempts': 1 } })
      const updated = await users.findOne({ _id: user._id })
      if ((updated.verification?.attempts || 0) >= (updated.verification?.maxAttempts || 3)) {
        return new Response(JSON.stringify({ error: 'Too many attempts, verification locked' }), { status: 403, headers: { 'Content-Type': 'application/json' } })
      }
      return new Response(JSON.stringify({ error: 'Invalid id_number' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    // All checks passed: mark verified
    await users.updateOne({ _id: user._id }, { $set: { verified: true, 'verification.idVerified': true, 'verification.verifiedAt': new Date() }, $unset: { 'verification.code': '', 'verification.codeExpires': '' } })

    return new Response(JSON.stringify({ message: 'User verified successfully' }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}

export default POST
