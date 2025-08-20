import { Request, Response } from 'express';
import { pool } from '../config/db';

export const getCart = async (req: Request, res: Response) => {
  const user = (req as any).user as { userId: string };
  try {
    const result = await pool.query(`
      SELECT c.product_id, p.name, p.price, p.image, p.category, p.brand, c.quantity
      FROM cart_items c
      JOIN products p ON p.id = c.product_id
      WHERE c.user_id = $1
    `, [user.userId]);
    res.json({ items: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const addToCart = async (req: Request, res: Response) => {
  const user = (req as any).user as { userId: string };
  const { productId, quantity } = req.body as { productId: string; quantity?: number };
  try {
    const qty = quantity && quantity > 0 ? quantity : 1;
    await pool.query(`
      INSERT INTO cart_items (user_id, product_id, quantity)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id, product_id)
      DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity
    `, [user.userId, productId, qty]);
    res.status(201).json({ message: 'Added to cart' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateCartItem = async (req: Request, res: Response) => {
  const user = (req as any).user as { userId: string };
  const { productId } = req.params;
  const { quantity } = req.body as { quantity: number };
  try {
    if (quantity <= 0) {
      await pool.query('DELETE FROM cart_items WHERE user_id=$1 AND product_id=$2', [user.userId, productId]);
      return res.json({ message: 'Removed from cart' });
    }
    await pool.query('UPDATE cart_items SET quantity=$1 WHERE user_id=$2 AND product_id=$3', [quantity, user.userId, productId]);
    res.json({ message: 'Updated cart item' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  const user = (req as any).user as { userId: string };
  const { productId } = req.params;
  try {
    await pool.query('DELETE FROM cart_items WHERE user_id=$1 AND product_id=$2', [user.userId, productId]);
    res.json({ message: 'Removed from cart' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const clearCart = async (req: Request, res: Response) => {
  const user = (req as any).user as { userId: string };
  try {
    await pool.query('DELETE FROM cart_items WHERE user_id=$1', [user.userId]);
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};