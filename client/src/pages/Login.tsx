import axios from "axios"
import { useState } from 'react'
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'
import { UserErrors } from '../../../server/routes/errors'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [_, setCookies] = useCookies(["access_token"])
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
     const result = await axios.post("http://localhost:3000/user/login", {
        username,
        password,
      })
      setCookies("access_token", result.data.token)
      localStorage.setItem("userID", result.data.userId)
      // in this case navigate hook makes it navigate towards different page after logging in
      navigate('/items')
    }  catch(err) {
      let errorMessage : string = ""
      switch (err.response.data.type) {
        case UserErrors.NO_USER_FOUND:
          errorMessage = "User doesn't exist"
          break;
        case UserErrors.WRONG_CREDEMTIALS:
          errorMessage = "Wrong username/password combination"
          break;
        default:
          errorMessage = "Something went wrong"
      }
      alert("ERROR: " + errorMessage)
    }  
  }
  return (
  <div>
    <div className="h-full w-full flex justify-center items-center mt-10 ">
      <div className="p-8 rounded-lg shadow-md bg-slate-200">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
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
          onClick={handleLogin}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  </div>
  )
}

export default LoginPage
