import mongoose from 'mongoose'

const cartItemSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  item_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    // Represents a single item
    type: Number,
    required: true,
  },
  total_price: {
    // Total cost of each item in cart
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
})

const CartItem = mongoose.model('CartItem', cartItemSchema)

export default CartItem
