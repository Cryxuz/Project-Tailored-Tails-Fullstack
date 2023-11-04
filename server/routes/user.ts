import {Router, Request, Response, NextFunction} from 'express'
import { UserModel} from "../models/user"
import {UserErrors} from "../routes/errors"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()

const router = Router()

// register user
router.post("/register", async (req:Request, res: Response ) => {
    const {username, password} = req.body
  try {
 
    const user = await UserModel.findOne({username})

    if (user) {
      return res.status(400).json({type: UserErrors.USERNAME_ALREADY_EXISTS })
    }
    // making password hash to hide it.
    const hashedPassword = await bcrypt.hash(password, 10)
    // this will create a new instance in that collection/table
    const newUser = new UserModel({username, password: hashedPassword,})
    await newUser.save()

    res.json({message: "User Registered Successfully"})
  } catch(err) {
    console.log('Error:', err)
    res.status(500).json({type: err})
  }
})   

// middleware to verify the token sent from backend to frontend
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if(authHeader) {
    jwt.verify(authHeader, "secret", (err) => {
      if (err) {
        return res.sendStatus(403)
      }

      next()
    })
  }
  return res.sendStatus(401)

}

// login route

router.post('/login', verifyToken, async (req: Request, res:Response) => {
  const {username, password} = req.body
  try {
    
    // getting a user 
    const user = await UserModel.findOne({username})
    if (!user) {
      return res.status(400).json({type:UserErrors.NO_USER_FOUND})
    }

    // checking if the password == hashed password. convert both password to hash first
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid) {
      return res.status(400).json({type:UserErrors.WRONG_CREDEMTIALS})
    }
    
    // token
    const token = jwt.sign({id: user._id}, "secret")
    res.json({token, userID: user._id})
  } catch (err) {
    res.status(500).json({type: err})
  }
})



export { router as UserRouter} 