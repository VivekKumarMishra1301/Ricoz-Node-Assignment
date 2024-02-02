import express from 'express';
import { allTickets, createTicket } from '../controllers/ticketController.js';
import { protect } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/create', protect,createTicket);
router.get('/allticket/:_id',protect,allTickets);
export default router;