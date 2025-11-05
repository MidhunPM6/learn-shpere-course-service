import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const mongoUsername = process.env.MONGO_USERNAME
const mongoPassword = process.env.MONGO_PASSWORD

export const connectDB = async (): Promise<void> => {
  try {
    const uri = `mongodb+srv://${mongoUsername}:${mongoPassword}@cluster0.p2cn2fu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    await mongoose.connect(uri, {
      dbName: 'learn-shpere-course-service'
    })
    console.log(' MongoDB connected')
  } catch (error: any) {
    console.error('MongoDB connection failed:', error.message)
  }
}