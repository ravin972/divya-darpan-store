import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db';

export interface JwtPayload { userId: string; email: string }

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });
  const token = auth.split(' ')[1];

  // 1) Try verifying with our own JWT secret (for backend-issued tokens)
  try {
    const secret = process.env.JWT_SECRET || 'dev-secret';
    const payload = jwt.verify(token, secret) as JwtPayload;
    (req as any).user = payload;
    return next();
  } catch {}

  // 2) Fallback: verify as a Supabase access token
  try {
    const SUPABASE_URL = process.env.SUPABASE_URL || 'https://ggmyzbijxgnrupucpadp.supabase.co';
    const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnbXl6YmlqeGducnVwdWNwYWRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0MTY4MjQsImV4cCI6MjA3MDk5MjgyNH0.1RUaLe5aTHdBXvL65x8z3aPE4GcfQgY0sMCafhgA_NY';

    const resp = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        apikey: SUPABASE_ANON_KEY,
      },
    });

    if (!resp.ok) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const supaUser: any = await resp.json();
    const email: string | null = supaUser?.email ?? null;
    const supaId: string | null = supaUser?.id ?? null;

    if (!supaId) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Ensure a corresponding local user exists (required by FK constraints)
    let localUserId: string | null = null;

    if (email) {
      const existing = await pool.query('SELECT id FROM users WHERE email=$1', [email]);
      if (existing.rows.length) {
        localUserId = existing.rows[0].id;
      } else {
        // Create a local user with the same id as Supabase user for consistency
        try {
          await pool.query(
            'INSERT INTO users (id, email, password_hash) VALUES ($1, $2, $3)',
            [supaId, email, 'external-auth']
          );
          localUserId = supaId;
        } catch (e) {
          // If inserting with fixed id fails (e.g., constraint), fall back to inserting without id
          const inserted = await pool.query(
            'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id',
            [email, 'external-auth']
          );
          localUserId = inserted.rows[0].id;
        }
      }
    } else {
      // No email available; create or reuse a local user keyed by supabase id
      const existingById = await pool.query('SELECT id FROM users WHERE id=$1', [supaId]);
      if (existingById.rows.length) {
        localUserId = existingById.rows[0].id;
      } else {
        await pool.query(
          'INSERT INTO users (id, email, password_hash) VALUES ($1, $2, $3)',
          [supaId, `${supaId}@supabase.local`, 'external-auth']
        );
        localUserId = supaId;
      }
    }

    (req as any).user = { userId: localUserId!, email: email ?? `${supaId}@supabase.local` };
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};