import express from 'express'
import cookiePaser from 'cookie-parser'
import {connectDB} from './infrastructure/database/config'
import courseRoute from './presentation/routes/CourseRoute'

const app = express()

app.use(express.json())
app.use(cookiePaser())

connectDB()

app.use('/course',courseRoute)

export default app
 