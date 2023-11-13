import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import {jwtDecode} from 'jwt-decode'

interface initialStateModel  {
  token: string,
name: string,
email: string,
_id: string,
registerStatus: string,
registerError: string | null,
loginStatus: string,
loginError: string,
userLoaded: boolean,

}


const initialState: initialStateModel = {
  token: localStorage.getItem("token"),
  name: "",
  email:"",
  _id: "",
  registerStatus: "",
  registerError: null,
  loginStatus: "",
  loginError: "",
  userLoaded: false,
}

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (values, {rejectWithValue}) => {
    try{
    const token = await axios.post('http://localhost:3000/register', {
          name: values.name,
          email: values.email,
          password: values.password
        })
        localStorage.setItem('token', token.data)
        return token.data
    } catch(err) {
      console.log(err.response.data)
      return rejectWithValue(err.response.data)
    }
  }
)

const authSlice = createSlice ({
  name: "auth",
  initialState,
  reducers:{

  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) =>{
        return {...state, registerStatus: "pending"}
    } )
    builder.addCase(registerUser.fulfilled, (state,action) =>{
      if(action.payload) {

        const user = jwtDecode(action.payload)

        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          _id: user.id,
          registerStatus: "success"
        }
      } else return state
    } )
    builder.addCase(registerUser.rejected, (state,action) =>{
      return {
        ...state,
        registerStatus: "rejected",
        registerError: action.payload instanceof Error ? action.payload.message : "An error occurred",
      }
    } )
  }
})

export default authSlice.reducer