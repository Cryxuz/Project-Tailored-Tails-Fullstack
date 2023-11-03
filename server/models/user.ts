import {Schema, model } from 'mongoose'

export interface User {
  _id: string;
  username: string;
  password: string;
  // purchasedItems: string[];
}

const UserSchema = new Schema<User>({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
  // purchasedItems:
})

// "user" is the name of the table
export const UserModel = model<User>("users", UserSchema)