import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // yaha apki connect string lagegi
});

pool.on('connect', () => {
  console.log('✅ PostgreSQL Connected Successfully');
});

export default pool;
