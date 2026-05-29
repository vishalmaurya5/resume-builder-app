import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/authRoutes.js'
import resumeRoutes from './routes/resumeRoutes.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'

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

// Example: Ensure your backend (e.g., Express.js) has a catch-all error handler
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the actual error to your server console
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Resume Builder API is healthy' })
})

app.use('/api/auth', authRoutes)
app.use('/api/resumes', resumeRoutes)

app.use(notFound)
app.use(errorHandler)

export default app
