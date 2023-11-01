import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
// import { Item } from '../../client/models/Items'
import cartItem from './schemas/cartItem'

dotenv.config()

const PORT = 3000
const app = express()

app.use(cors())
app.use(express.json())

// Items Schema
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [
      'Outfits for Cats',
      'Outfits for Dogs',
      'Body Piece',
      'Full Body',
      'Hat',
      'Accessories',
    ],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    required: true,
  },
})
const itemModel = mongoose.model('Item', itemSchema)

// GET request

app.get('/items', async (req, res) => {
  const items = await itemModel.find()
  console.log(items)
  res.json(items)
})

//  GET by ID

app.get('/items/:itemId', async (req, res) => {
  const itemId = req.params.itemId
  const item = await itemModel.findById(itemId)
  console.log(item)
  res.json(item)
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

// sort by category

app.get('/items/category/:category', async (req, res) => {
  try {
    const category = req.params.category
    const items = await itemModel.find({ category: category })
    res.json(items)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Cart

app.get('/cartitems', async (req, res) => {
  try {
    const cartitems = await cartItems.find()
    console.log(cartitems)
    res.json(cartitems)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.post('/cartitems', async (req, res) => {
  try {
    const {
      user_id,
      item_id,
      quantity,
      price,
      total_price,
      name,
      description,
      image_url,
    } = req.body
    const newCartItem = new cartItem({
      user_id,
      item_id,
      quantity,
      price,
      total_price,
      name,
      description,
      image_url,
    })
    await newCartItem.save()
    res.status(201).json(newCartItem)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`listening to port ${PORT}`)
  app.listen(PORT)
})
