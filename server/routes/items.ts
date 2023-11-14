import express from 'express'
import itemModel from '../schemas/items'

const router = express.Router()

router.get('/items/:itemId', async (req, res) => {
  try {
    const itemId = req.params.itemId
    const item = await itemModel.findById(itemId)
    console.log(item)
    res.json(item)
  } catch (err) {
    res.status(400).json(err)
  }
})

router.post('/items', async (req, res) => {
  try {
    const newItem = new itemModel({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      rating: req.body.rating,
      stock: req.body.stock,
    })
    const createdItem = await newItem.save()
    res.json(createdItem)
  } catch (error) {
    console.log(error)
    res.status(500)
  }
})

router.delete('/items/:itemId', async (req, res) => {
  const itemId = req.params.itemId
  const item = await itemModel.findByIdAndDelete(itemId)
  res.json(item)
})

export {router as ItemRouter}