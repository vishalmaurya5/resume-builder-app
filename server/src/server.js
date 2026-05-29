import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express' // Ensure express is imported if it isn't inside app.js
import app from './app.js'
import { connectDB } from './config/db.js'

dotenv.config()

// Recreate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const port = process.env.PORT || 5000

// Serve the static files from the Vite frontend build directory
// Adjust the relative path if your file is inside a 'server/src/' subdirectory
app.use(express.static(path.join(__dirname, '../../client/dist')))

// Handle frontend React routing requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'))
})

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`API server running on port ${port}`)
    })
  })
  .catch((error) => {
    console.error('Failed to start API server:', error.message)
    process.exit(1)
  })
