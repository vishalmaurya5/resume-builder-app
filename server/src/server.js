import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express' 
import app from './app.js'
import { connectDB } from './config/db.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const port = process.env.PORT || 5000

// --- 1. SERVE STATIC FILES FIRST ---
// Because this file is in server/src/, we use '../../' to reach the root directory
const clientBuildPath = path.join(__dirname, '../../client/dist')

app.use(express.static(clientBuildPath))

// --- 2. CATCH-ALL ROUTE FOR REACT ROUTER ---
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'))
})


// --- 3. DATABASE & SERVER INITIALIZATION ---
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
