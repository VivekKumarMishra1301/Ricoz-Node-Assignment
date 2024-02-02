import express from 'express';
import { allTickets, closeTicket, createTicket, deleteTicket } from '../controllers/ticketController.js';
import { protect } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/create', protect,createTicket);
router.get('/allticket/:_id', protect, allTickets);
router.put('/closeticket/:_id', protect, closeTicket);
router.delete('/deleteticket/:_id',protect,deleteTicket);
export default router;