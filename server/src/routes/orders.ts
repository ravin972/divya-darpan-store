import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import { createOrder, getOrderById, getMyOrders } from '../controllers/orders.controller';

const router = Router();

router.use(authenticate);

router.post('/', createOrder);
router.get('/', getMyOrders);
router.get('/:id', getOrderById);

export default router;