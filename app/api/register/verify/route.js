import { getDb } from "@/lib/mongodb"

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, id_number } = body

    if (!email || !id_number) {
      return new Response(JSON.stringify({ error: 'email and id_number are required' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
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

    const allowedIds = ["1045", "1250", "1548", "320", "45", "359"]
    const idProvided = String(id_number)
    const idValid = allowedIds.includes(idProvided)

    if (!idValid) {
      await users.updateOne({ _id: user._id }, { $inc: { 'verification.attempts': 1 }, $set: { 'verification.idProvided': idProvided } })
      const updated = await users.findOne({ _id: user._id })
      if ((updated.verification?.attempts || 0) >= (updated.verification?.maxAttempts || 3)) {
        return new Response(JSON.stringify({ error: 'Too many attempts, verification locked' }), { status: 403, headers: { 'Content-Type': 'application/json' } })
      }
      return new Response(JSON.stringify({ error: 'You are not eligible to verify' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    // mark verified
    await users.updateOne({ _id: user._id }, { $set: { verified: true, 'verification.idVerified': true, 'verification.verifiedAt': new Date(), 'verification.idProvided': idProvided } })

    return new Response(JSON.stringify({ message: 'User verified successfully' }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}

export default POST
