import { Request, Response } from 'express';
import { pool } from '../config/db';

export const createOrder = async (req: Request, res: Response) => {
  const user = (req as any).user as { userId: string };
  const { items, address } = req.body as { items: { productId: string; quantity: number }[]; address: string };
  try {
    await pool.query('BEGIN');
    const orderRes = await pool.query('INSERT INTO orders (user_id, address) VALUES ($1, $2) RETURNING id, created_at', [user.userId, address]);
    const orderId = orderRes.rows[0].id;

    for (const item of items) {
      await pool.query('INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3)', [orderId, item.productId, item.quantity]);
    }
    await pool.query('DELETE FROM cart_items WHERE user_id=$1', [user.userId]);
    await pool.query('COMMIT');
    res.status(201).json({ id: orderId });
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  const user = (req as any).user as { userId: string };
  const { id } = req.params;
  try {
    const order = await pool.query('SELECT id, user_id, address, status, created_at FROM orders WHERE id=$1 AND user_id=$2', [id, user.userId]);
    if (!order.rows.length) return res.status(404).json({ message: 'Order not found' });
    const items = await pool.query(`
      SELECT oi.product_id, p.name, p.price, oi.quantity
      FROM order_items oi JOIN products p ON p.id=oi.product_id
      WHERE oi.order_id=$1
    `, [id]);
    res.json({ ...order.rows[0], items: items.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getMyOrders = async (req: Request, res: Response) => {
  const user = (req as any).user as { userId: string };
  try {
    const orders = await pool.query('SELECT id, address, status, created_at FROM orders WHERE user_id=$1 ORDER BY created_at DESC', [user.userId]);
    res.json({ items: orders.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};