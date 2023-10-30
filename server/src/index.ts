import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

const PORT = 3000
const app = express()

app.use(cors())
app.use(express.json())

// GET request

app.get('/decks', async (req: Request, res: Response) => {
  const decks = await Deck.find()
  console.log(decks)
  res.json(decks)
 } )
 
 // POST request.
 
 app.post('/decks', async (req: Request, res: Response) => {
   console.log(req.body)
   // make a newDeck  for the database.
   const newDeck = new Deck({
     title: req.body.title,
   });
   // saving the newDeck to the database.
   const createdDeck = await newDeck.save()
   res.json(createdDeck)
 })
 
 // delete 
 app.delete('/decks/:deckId', async (req: Request, res: Response) => {
   const deckId = req.params.deckId
   const deck = await Deck.findByIdAndDelete(deckId)
   res.json(deck)
 })

mongoose
.connect(process.env.MONGO_URL!)
.then(() => {
  console.log(`listening to port ${PORT}`)
  app.listen(PORT)
})