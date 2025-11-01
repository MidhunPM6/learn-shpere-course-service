import app from './app'
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT ? Number(process.env.PORT) : 6001


app.listen(port, () => {
  console.log(`Server is running on port  ${port}`)
})



