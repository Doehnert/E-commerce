import * as dotenv from 'dotenv'
dotenv.config()
import express, { Request, Response } from 'express'
import Stripe from 'stripe'
import cors from 'cors'

const stripe = new Stripe(process.env.STRIPE_SECRET ?? '', {
  apiVersion: '2022-11-15',
})

type Item = {
  id: number
  quantity: number
}

const app = express()
app.use(cors())
app.use(express.static('public'))
app.use(express.json())

app.post('/checkout', async (req: Request, res: Response) => {
  const { items } = req.body
  console.log('🚀 ~ file: index.ts:18 ~ app.post ~ items', items)
  let lineItems: any[] = []

  items.forEach((item: Item) => {
    lineItems.push({
      price: item.id,
      quantity: item.quantity,
    })
  })

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
  })

  res.json({ url: session.url })
})

app.listen(4000, () => console.log(`Listening on port 4000`))
