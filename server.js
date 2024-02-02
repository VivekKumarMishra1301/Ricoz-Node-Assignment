import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './config/db.js';
import authRoutes from './routes/authRoutes.js'
dotenv.config();
dbConnect();
const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
