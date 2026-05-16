import mongoose from 'mongoose'

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI

  if (!mongoUri) {
    throw new Error('MONGO_URI is missing. Add it to server/.env before starting the backend.')
  }

  mongoose.set('strictQuery', true)

  const connection = await mongoose.connect(mongoUri, {
    dbName: process.env.MONGO_DB_NAME || 'resume-builder',
    serverSelectionTimeoutMS: Number(process.env.MONGO_SERVER_SELECTION_TIMEOUT_MS || 10000),
    connectTimeoutMS: Number(process.env.MONGO_CONNECT_TIMEOUT_MS || 10000),
    socketTimeoutMS: Number(process.env.MONGO_SOCKET_TIMEOUT_MS || 20000),
    family: 4,
  })

  console.log(`MongoDB connected: ${connection.connection.host}`)
}
