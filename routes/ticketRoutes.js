import express from 'express';
import { createTicket } from '../controllers/ticketController.js';
import { protect } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/create', protect,createTicket);

export default router;