import express from 'express'
import Stripe from 'stripe'
import * as dotenv from 'dotenv'

dotenv.config()

const stripeKey = process.env.STRIPE_KEY

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
        price: '{{PRICE_ID}}',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/`,
    cancel_url: `${YOUR_DOMAIN}/cart`,
  })

  res.redirect(303, session.url as string)
})

export { router as StripeRouter }
