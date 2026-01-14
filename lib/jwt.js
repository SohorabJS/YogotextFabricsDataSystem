import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'dev_jwt_secret_change_me'

export function signToken(payload, options = {}) {
  const opts = { expiresIn: options.expiresIn || '2h' }
  return jwt.sign(payload, SECRET, opts)
}

export function verifyToken(token) {
  return jwt.verify(token, SECRET)
}

export default { signToken, verifyToken }
