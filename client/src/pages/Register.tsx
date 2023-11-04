import { useState } from 'react'
import axios from 'axios'

const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3000/user/register', {
        username,
        password,
      })
      console.log('User registered successfully:', response.data)
    } catch (error) {
      console.error('Error registering user:', error)
    }
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
