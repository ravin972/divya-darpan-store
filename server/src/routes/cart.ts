import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import { addToCart, getCart, updateCartItem, removeFromCart, clearCart } from '../controllers/cart.controller';

const router = Router();

router.use(authenticate);

router.get('/', getCart);
router.post('/', addToCart);
router.put('/:productId', updateCartItem);
router.delete('/:productId', removeFromCart);
router.delete('/', clearCart);

export default router;