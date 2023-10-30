import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

const PORT = 3000
const app = express()

app.use(cors())
app.use(express.json())

mongoose
.connect(process.env.MONGO_URL!)
.then(() => {
  console.log(`listening to port ${PORT}`)
  app.listen(PORT)
})