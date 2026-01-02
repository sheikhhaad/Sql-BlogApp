// config/querHelper.js
import pool from './db.js'; // pg Pool import

export const executeQuery = async (query, params = []) => {
  try {
    const result = await pool.query(query, params);
    return result.rows;
  } catch (error) {
    console.error('❌ Query Error:', error.message);
    throw error;
  }
};
