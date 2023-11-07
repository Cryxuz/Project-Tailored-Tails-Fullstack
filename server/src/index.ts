import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import itemModel from '../schemas/items'
import cartItem from '../schemas/cart'
import { UserRouter, verifyToken } from '../routes/user'
import { UserModel } from '../schemas/user'
import { ProductErrors, UserErrors } from '../routes/errors'
import { verify } from 'jsonwebtoken'

dotenv.config()

const PORT = 3000
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// userRouter is from routes/user.ts file
app.use('/user', UserRouter)
//

// Stripe
const striperoutes = require('./routes/stripe-routes')
app.use('/api/stripe', striperoutes)

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

app.get('/cart', async (req, res) => {
  const items = await itemModel.find()
  console.log(items)
  res.json(items)
})

//
// from youtube tutorial
//

app.post('/cart', verifyToken, async (req, res) => {
  const { customerID, cartItems } = req.body
  try {
    const user = await UserModel.findById(customerID)
    const productIDs = Object.keys(cartItems)
    const products = await itemModel.find({ _id: { $in: productIDs } })
    if (!user) {
      return res.status(400).json({ type: UserErrors.NO_USER_FOUND })
    }
    if (products.length !== productIDs.length) {
      return res.status(400).json({ tpye: ProductErrors.NO_PRODUCT_FOUND })
    }
    let totalPrice = 0
    for (const item in cartItems) {
      const product = products.find((product) => String(product._id) === item)

      if (!product) {
        return res.status(400).json({ tpye: ProductErrors.NO_PRODUCT_FOUND })
      }

      if (product.stock < cartItems[item]) {
        return res.status(400).json({ type: ProductErrors.NOT_ENOUGH_STOCK })
      }
      // increasing the total price
      totalPrice += product.price * cartItems[item]
      user.purchasedItems.push(...productIDs)

      await user.save()
      // updating stocks quantity
      await itemModel.updateMany(
        { _id: { $in: productIDs } },
        { $inc: { stock: -1 } }
      )
    }

    res.json({ purchasedItems: user.purchasedItems })
  } catch (err) {
    res.status(400).json(err)
  }
})
// end

app.get('/cartitems', async (req, res) => {
  try {
    const cartitems = await cartItem.find()
    console.log(cartitems)
    res.json(cartitems)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// app.post('/cartitems', async (req, res) => {
//   try {
//     const {
//       user_id,
//       item_id,
//       quantity,
//       price,
//       total_price,
//       name,
//       description,
//       image_url,
//     } = req.body
//     const newCartItem = new cartItem({
//       user_id,
//       item_id,
//       quantity,
//       price,
//       total_price,
//       name,
//       description,
//       image_url,
//     })
//     await newCartItem.save()
//     const addedItem = await itemModel.findByIdAndUpdate(
//       item_id,
//       { $push: { cartItems: newCartItem._id } },
//       { new: true }
//     )
//     res.status(201).json({ cartItem: newCartItem, addedItem })
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ error: 'Internal Server Error' })
//   }
// })

app.delete('/cartitems/:id', async (req, res) => {
  const itemId = req.params.id
  try {
    const deletedCartItem = await cartItem.findByIdAndDelete(itemId)
    if (!deletedCartItem) {
      return res.status(404).json({ error: 'Cart item not found' })
    }
    res.json(deletedCartItem)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`listening to port ${PORT}`)
  app.listen(PORT)
})
