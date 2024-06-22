import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';



//SignUp funtionlality
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


//signIn funtionlality
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  
  // Basic server-side validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Check if the user exists
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Verify the password
    const isPasswordValid = bcryptjs.compareSync(password, validUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Wrong Credentials" });
    }
    
    // Generating token
    const token = jwt.sign(
      { userId: validUser._id, email: validUser.email },
      process.env.JWT_SECRET, 
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Send token as HTTP-only cookie
    res.cookie('access-token', token, { httpOnly: true });

    // Remove password from user object before sending
    const { password: hashedPassword, ...userWithoutPassword } = validUser._doc;

    // Successful login
    res.status(200).json({ message: "Login successful", token, user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error(error);
  }
};
