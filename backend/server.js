import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import connectMongoDB from './db/connectMongoDB.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/appuser.routes.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);


app.listen(8000, () => {
    console.log('Server is running on port 8000');
    connectMongoDB();
    });
