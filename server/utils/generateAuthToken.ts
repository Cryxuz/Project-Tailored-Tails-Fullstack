import { sign } from 'jsonwebtoken'

var jwt = require('jsonwebtoken')

const generateAuthToken = (user) => {
  const tokenKey = process.env.JWT_KEY

  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    tokenKey
  )
  return token
}

export default generateAuthToken
