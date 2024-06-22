import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv  from 'dotenv';
import user_Routes from './routes/userRoutes.js'
import auth_Routes  from './routes/authRoutes.js';
dotenv.config();

//connecting to mongodb database
mongoose
.connect(process.env.MONGO)
.then( () => {
    console.log("connected to MongoDB Successfully");
})
.catch((err) => {
    console.log("Failed to connect to MongoDB", err);
});

const app = express();
app.use(express.json());

//enabling cors
app.use(cors({
    origin: "http://localhost:5173",
    // credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use('/user', user_Routes);
app.use('/auth', auth_Routes);

//creating middleware
app.use((req, res, next) => {
  const status = err.res.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(status).json({
    success: false,
    message,
    statusCode,
 });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
});