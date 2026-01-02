import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// register user with hashed password
export const registerUser = async (req, res) => {
  const data = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);

    const result = await userModel.add(data); // RETURNING * in model
    res.status(201).json({
      message: "✅ User registered successfully",
      userId: result.id,
    });
  } catch (error) {
    res.status(500).json({
      message: "❌ Error registering user",
      error: error.message,
    });
  }
};

// login user with bcrypt
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
console.log(req.body);

  try {
    const users = await userModel.getByEmail(email);
    
    if (!users || users.length === 0)
      return res.status(404).json({ message: "User not found" });

    const user = users;
    console.log(user);
    

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.jwt, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "✅ Logged in successfully",
      userId: user.id,
      userName: user.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "❌ Error logging in",
      error: error.message,
    });
  }
};

// get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "❌ Error fetching users",
      error: error.message,
    });
  }
};

// logout user
export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.status(200).json({ message: "✅ Logged out successfully" });
};
