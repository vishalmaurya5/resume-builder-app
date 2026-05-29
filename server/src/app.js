import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/authRoutes.js'
import resumeRoutes from './routes/resumeRoutes.js'
// Removed: notFound and errorHandler imports since the frontend wildcard handles this now

const app = express()
const allowedOrigins = new Set([
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  process.env.CLIENT_ORIGIN,
].filter(Boolean))

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true)
        return
      }

      callback(new Error(`CORS blocked origin: ${origin}`))
    },
    credentials: true,
  }),
)
app.use(express.json({ limit: '15mb' }))
app.use(morgan('dev'))

// Global API error handler for actual backend bugs
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal Server Error', details: err.message })
})

// --- API Routes ---
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Resume Builder API is healthy' })
})

app.use('/api/auth', authRoutes)
app.use('/api/resumes', resumeRoutes)

// ❌ REMOVED: app.use(notFound) and app.use(errorHandler)
// Keeping these here prevents your frontend files from being served.

export default app
