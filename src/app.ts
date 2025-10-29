import express from 'express'
import cookiePaser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(cookiePaser())

export default app
