import express from 'express'
import Stripe from 'stripe'
import * as dotenv from 'dotenv'
// const Stripe = require('stripe')
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
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Coat',
          },
          unit_amount: 1000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success`,
    cancel_url: `${YOUR_DOMAIN}/cart`,
  })

  res.redirect(303, session.url as string)
})

export { router as StripeRouter }
