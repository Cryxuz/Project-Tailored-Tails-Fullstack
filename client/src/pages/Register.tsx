import { useState } from 'react'
import axios from 'axios'

const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3000/register', {
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
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleRegister}>Register</button>
    </div>
  )
}

export default RegisterPage
