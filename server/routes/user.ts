import { Router, Request, Response, NextFunction } from 'express'
import { User } from '../schemas/user'
import { UserErrors } from '../routes/errors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import Joi from 'joi'
import express from 'express'
import { UserModel } from '../models/user'
import generateAuthToken from '../utils/generateAuthToken'

dotenv.config()

const router = express.Router()

// middleware to verify the token sent from backend to frontend
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization
  if (authHeader) {
    jwt.verify(authHeader, 'secret', (err) => {
      if (err) {
        return res.sendStatus(403)
      }
      next()
    })
  } else {
    return res.sendStatus(401)
  }
}

// register user
router.post('/register', async (req: Request, res: Response) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username })

    if (user) {
      return res.status(400).json({ type: UserErrors.USERNAME_ALREADY_EXISTS })
    }
    // making password hash to hide it. always 10
    const hashedPassword = await bcrypt.hash(password, 10)
    // this will create a new instance in that collection/table
    const newUser = new User({ username, password: hashedPassword })
    await newUser.save()

    res.json({ message: 'User Registered Successfully' })
  } catch (err) {
    console.log('Error:', err)
    res.status(500).json({ type: err })
  }
})

// login route

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body
  try {
    // getting a user
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(400).json({ type: UserErrors.NO_USER_FOUND })
    }

    // checking if the password == hashed password. convert both password to hash first
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({ type: UserErrors.WRONG_CREDEMTIALS })
    }

    // token
    const token = jwt.sign({ id: user._id }, 'secret')
    res.json({ token, userID: user._id })
  } catch (err) {
    res.status(500).json({ type: err })
  }
})

router.post('/', async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(200).required(),
  })
  const { error } = schema.validate(req.body)

  if (error) return res.status(400).send(error.details[0].message)

  let user = await User.findOne({ email: req.body.email })
  if (user) return res.status(400).send('User Already Exists.')

  const { name, email, password } = req.body

  const hashedPassword = await bcrypt.hash(password, 10)
  user = new User({ name, email, password: hashedPassword })
  await user.save()

  const token = generateAuthToken(user)

  res.send(token)
})

export { router as UserRouter }
