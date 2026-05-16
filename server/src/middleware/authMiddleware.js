import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''

  if (!token) {
    return res.status(401).json({ success: false, message: 'Login required' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.userId).select('_id name email')

    if (!user) {
      return res.status(401).json({ success: false, message: 'User account not found' })
    }

    req.user = user
    next()
  } catch (error) {
    const decodedClerkToken = jwt.decode(token)

    if (decodedClerkToken?.sub?.startsWith('user_')) {
      req.user = {
        _id: decodedClerkToken.sub,
        name: decodedClerkToken.name || decodedClerkToken.full_name || 'Clerk User',
        email: decodedClerkToken.email || '',
      }
      next()
      return
    }

    return res.status(401).json({ success: false, message: 'Invalid or expired login session' })
  }
}
