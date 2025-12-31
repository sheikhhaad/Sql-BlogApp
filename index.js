import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectToDatabase from './config/db.js';
import blogRoute from './routes/blogRoute.js';
import userRoute from './routes/userRoute.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
await connectToDatabase();

app.get('/', (req, res) => {
  res.send('Welcome to the SQL Blog App API');
});

app.use('/api/blog', blogRoute);
app.use('/api/user', userRoute);


app.listen(process.env.PORT)