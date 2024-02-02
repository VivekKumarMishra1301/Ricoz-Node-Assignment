import express from 'express';
import { createTicket } from '../controllers/ticketController';
const router = express.Router();

router.post('/create', protect,createTicket);

export default router;