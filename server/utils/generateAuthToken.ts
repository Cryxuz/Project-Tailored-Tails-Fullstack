import { sign } from 'jsonwebtoken'

var jwt = require('jsonwebtoken')

const generateAuthToken = (user) => {
  try {
    const tokenKey = process.env.JWT_KEY

    if (!tokenKey) {
      throw new Error('JWT_KEY is not defined')
    }

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      tokenKey
    )
    return token
  } catch (error) {
    console.error('Error generating auth token:', error.message)
    throw error
  }
}

export default generateAuthToken
