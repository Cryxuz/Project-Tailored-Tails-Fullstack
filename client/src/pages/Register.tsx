import { useState } from "react"

const Register = () => {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  })
  return (
  <form action="">
    <h2>Register</h2>
    <label htmlFor="name">Name:</label>
    <input type="text" placeholder="Enter Name" onChange={(e) => setUser({ ...user, name: e.target.value})}/>

    <label htmlFor="email">Email:</label>
    <input type="email" placeholder="Enter Email" onChange={(e) => setUser({ ...user, name: e.target.value})}/>

    <label htmlFor="password">Password:</label>
    <input type="password" placeholder="Enter Password" onChange={(e) => setUser({ ...user, name: e.target.value})}/>
    <button>Register</button>
  </form>
  )
}

export default Register