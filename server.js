import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import ticketRoutes from './routes/ticketRoutes.js'
dotenv.config();
dbConnect();
const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
