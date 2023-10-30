import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import { Item } from '../../client/models/Items'

dotenv.config()

const PORT = 3000
const app = express()

app.use(cors())
app.use(express.json())

// GET request

app.get('/items', async (req, res) => {
  const items = await Item.find()
  console.log(items)
  res.json(items)
 } )
 
 // POST request.
 
 app.post('/items', async (req, res) => {
   console.log(req.body)
   // make a newItem  for the database.
   const newItem = new Item({
     title: req.body.title,
   });
   // saving the newDeck to the database.
   const createdItem = await newItem.save()
   res.json(createdItem)
 })
 
 // delete 
 app.delete('/items/:itemId', async (req, res) => {
   const itemId = req.params.itemId
   const item = await Item.findByIdAndDelete(itemId)
   res.json(item)
 })

mongoose
.connect(process.env.MONGO_URL!)
.then(() => {
  console.log(`listening to port ${PORT}`)
  app.listen(PORT)
})