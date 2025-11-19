import express from 'express'
import cookiePaser from 'cookie-parser'
import courseRoutes from './presentation/routes/CourseRoute'
import CourseuploadRoutes from './presentation/routes/CourseUploadRoutes'

const app = express()

app.use(express.json())
app.use(cookiePaser())

app.use('/course', courseRoutes)
app.use('/api/upload', CourseuploadRoutes)

export default app
