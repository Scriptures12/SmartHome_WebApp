import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  
  // Basic server-side validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Hashing the password
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  
  // Saving the user to the database
  try {
    await newUser.save();
    res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error (username or email already exists)
      const field = Object.keys(error.keyValue)[0];
      res.status(400).json({ message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists. please try another one` });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
      console.error(error);
    }
  }
};
