import dotenv from 'dotenv';
import app from './app';
import { setupDatabase } from './config/seed';

dotenv.config();

const PORT = process.env.PORT || 8000;

async function start() {
  try {
    if (!process.env.DATABASE_URL) {
      console.warn('DATABASE_URL is not set. Skipping database initialization and seed.');
    } else {
      await setupDatabase();
    }

    app.listen(PORT, () => {
      console.log(`API server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();
