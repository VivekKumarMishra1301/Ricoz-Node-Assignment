import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './config/db.js';
dotenv.config();
dbConnect();
const app = express();
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
