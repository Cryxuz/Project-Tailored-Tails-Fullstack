import { findOne, create } from "../Models/UserModel";
import { createSecretToken } from "../util/SecretToken";
import bcrypt from "bcryptjs";

export async function Signup(req, res, next) {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
}