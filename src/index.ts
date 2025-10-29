import app from './app'
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT ? Number(process.env.PORT) : 6001
const host = process.env.HOST || '0.0.0.0'

app.listen(port, host, () => {
  console.log(`Server is running on port  ${port}`)
})
