import { User } from '../models/User.js'
import { signToken } from '../utils/token.js'

const authResponse = (user) => ({
  token: signToken(user._id),
  user: {
    _id: user._id,
    name: user.name,
    email: user.email,
  },
})

export const register = async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Name, email, and password are required' })
  }

  if (password.length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' })
  }

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.status(409).json({ success: false, message: 'An account with this email already exists' })
  }

  const user = await User.create({ name, email, password })
  res.status(201).json({ success: true, data: authResponse(user) })
}

export const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' })
  }

  const user = await User.findOne({ email }).select('+password')
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' })
  }

  res.json({ success: true, data: authResponse(user) })
}

export const getMe = async (req, res) => {
  res.json({
    success: true,
    data: {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    },
  })
}

