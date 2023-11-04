import { useState } from 'react'
import axios from 'axios'
import {UserErrors} from '../../../server/routes/errors'
const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3000/user/register', {
        username,
        password,
      })
      alert("Registration Completed! You may now login.")
      console.log('User registered successfully:', response.data)
    } catch (err) {
      if (err.response.data.type === UserErrors.USERNAME_ALREADY_EXISTS) { 
      alert('ERROR: Username already in use')
      console.error('Error registering user:', err)    
    }
    else {
    alert("ERROR: Something went wrong")
    }}
  }

  return (
    <div>
      <h2>Register</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Username"
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
        />
      </div>
      <button onClick={handleRegister} className="bg-red-400 rounded-md">
        Register
      </button>
    </div>
  )
}

export default RegisterPage
