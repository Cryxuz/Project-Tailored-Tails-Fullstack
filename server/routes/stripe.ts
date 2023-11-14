import express from 'express'
import Stripe from 'stripe'
import * as dotenv from 'dotenv'
dotenv.config()

const stripeKey = process.env.STRIPE_KEY
// const stripe = Stripe(process.env.STRIPE_KEY)
if (!stripeKey) {
  throw new Error('Stripe key not provided')
}
const stripe = new Stripe(stripeKey)
const router = express.Router()

const YOUR_DOMAIN = 'http://localhost:5173'

router.post('/create-checkout-session', async (req, res) => {
  const line_items = req.body.cartItems.map((item: any) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.imageUrl],
          description: item.description,
          metadata: {
            id: item.id
          }
        },
        unit_amount: item.price * 100,
      },
      quantity: item.cartQuantity,
    }
  })
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success`,
    cancel_url: `${YOUR_DOMAIN}/cart`,
  })
  res.send({url: session.url})
  // res.redirect(303, session.url as string)
})

export { router as StripeRouter }
