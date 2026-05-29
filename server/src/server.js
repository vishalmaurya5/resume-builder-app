import dotenv from 'dotenv'
import app from './app.js'
import { connectDB } from './config/db.js'

dotenv.config()

const port = process.env.PORT || 5000

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`API server running on http://localhost:${port}`)
    })
  })
  .catch((error) => {
    console.error('Failed to start API server:', error.message)
    process.exit(1)
  })
const path = require('path');

// 1. Serve the static files from the Vite frontend build directory
app.use(express.static(path.join(__dirname, '../../client/dist')));

// 2. Handle any routing requests by sending back the main index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

