import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserErrors } from '../../../server/routes/errors'


const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3000/user/register', {
        username,
        password,
      })
      alert('Registration Completed! You may now login.')
      console.log('User registered successfully:', response.data)
      navigate('/login')
    } catch (err) {
      if (err.response.data.type === UserErrors.USERNAME_ALREADY_EXISTS) {
        alert('ERROR: Username already in use')
        console.error('Error registering user:', err)
      } else {
        alert('ERROR: Something went wrong')
      }
    }
  }

  return (
    <div className="h-full w-full flex justify-center items-center mt-10 ">
      <div className="p-8 rounded-lg shadow-md bg-slate-200">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username:
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
            className="w-full border border-gray-300 rounded py-2 px-3"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="w-full border border-gray-400 rounded py-2 px-3"
          />
        </div>

        <button
          onClick={handleRegister}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </div>
    </div>
  )
}

export default RegisterPage
