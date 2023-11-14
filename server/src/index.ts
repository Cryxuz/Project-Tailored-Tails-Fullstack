import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import itemModel from '../schemas/items'
import { RegisterRouter } from '../routes/register'
import { LoginRouter } from '../routes/login'
import { StripeRouter } from '../routes/stripe'

dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  })
)
// app.use(cors())
app.options('*', cors())
app.use(express.json())

app.use('/register', RegisterRouter)
app.use('/login', LoginRouter)
app.use('/stripe', StripeRouter)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-auth-token'
  )
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

app.get('/items', async (req, res) => {
  const items = await itemModel.find()
  console.log(items)
  res.json(items)
})

//  GET by ID

app.get('/items/:itemId', async (req, res) => {
  try {
    const itemId = req.params.itemId
    const item = await itemModel.findById(itemId)
    console.log(item)
    res.json(item)
  } catch (err) {
    res.status(400).json(err)
  }
})

// POST request.

app.post('/items', async (req, res) => {
  try {
    console.log(req.body)
    // make a newItem  for the database.
    const newItem = new itemModel({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      rating: req.body.rating,
      stock: req.body.stock,
    })
    // saving the newItem to the database.
    const createdItem = await newItem.save()
    res.json(createdItem)
  } catch (error) {
    console.log(error)
    res.status(500)
  }
})

// delete
app.delete('/items/:itemId', async (req, res) => {
  const itemId = req.params.itemId
  const item = await itemModel.findByIdAndDelete(itemId)
  res.json(item)
})

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`listening to port ${PORT}`)
  app.listen(PORT)
})
