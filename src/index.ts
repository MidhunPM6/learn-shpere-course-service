import dotenv from 'dotenv'
dotenv.config()
import app from './app'
import { connectDB } from './infrastructure/database/config'

const port = process.env.PORT ? Number(process.env.PORT) : 6001

const startServer = async (): Promise<void> => {
  try {
    await connectDB()
    app.listen(port, () => {
      console.log(`Server is running on port  ${port}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

void startServer()
