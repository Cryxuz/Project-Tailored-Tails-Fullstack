import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../features/authSlice"
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  useEffect(() => {
    if (auth.name) {
      
      navigate("/items");
    }
  }, [auth.name, navigate]);
  
  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser(user))
  }
  return (

    <form  onSubmit={handleSubmit} className="h-full w-full flex justify-center items-center mt-10 ">
      <div className="p-8 rounded-lg shadow-md bg-slate-200">
        <h2 className="text-xl">Login</h2>  
        <br />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
          <input  className="w-full border border-gray-400 rounded py-2 px-3" type="email" placeholder="Enter Email" onChange={(e) => setUser({ ...user, email: e.target.value})}/>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password:</label>
          <input  className="w-full border border-gray-400 rounded py-2 px-3" type="password" placeholder="Enter Password" onChange={(e) => setUser({ ...user, password: e.target.value})}/>
        </div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">{auth.loginStatus === "pending" ? "Submitting" : "Login"}</button>
        {auth.loginStatus === "rejected" ? <p>{auth.loginError}</p> : null}
      </div>
    </form>
  )
}

export default Login