import jwt from 'jsonwebtoken'

const ACCESS_SECRET = process.env.JWT_SECRET || 'dev_access_secret_change_me'
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'dev_refresh_secret_change_me'

export function signAccessToken(payload, options = {}) {
  const opts = { expiresIn: options.expiresIn || '15m' }
  return jwt.sign(payload, ACCESS_SECRET, opts)
}

export function signRefreshToken(payload, options = {}) {
  const opts = { expiresIn: options.expiresIn || '7d' }
  return jwt.sign(payload, REFRESH_SECRET, opts)
}

export function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_SECRET)
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_SECRET)
}

export default { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken }
