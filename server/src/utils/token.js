import jwt from 'jsonwebtoken'

export const signToken = (userId) => {
  const secret = process.env.JWT_SECRET

  if (!secret) {
    throw new Error('JWT_SECRET is missing. Add it to server/.env.')
  }

  return jwt.sign({ userId }, secret, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' })
}

