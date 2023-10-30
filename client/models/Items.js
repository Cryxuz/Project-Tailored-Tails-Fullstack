const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  username: {
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
  // Potential Fields
  // manufacturer: String,
  // color: String,
  // material: String,
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item
