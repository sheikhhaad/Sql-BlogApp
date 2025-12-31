import { executeQuery } from "../config/querHelper.js"


export const userModel = {
  getAll: async () => {
    const q = "SELECT * FROM users ORDER BY id DESC"
    const r = await executeQuery(q)
    return r
  },

  getByEmail: async (email) => {
  const q = "SELECT * FROM users WHERE email = ?"; // ya SELECT id, name, email, password
  const r = await executeQuery(q, [email]);
  return r[0]; // MySQL query array return karta hai
},

  add: async (d) => {
    const q = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)"
    return await executeQuery(q, [d.name, d.email, d.password])
  },

  update: async (id, d) => {
    const q = "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?"
    return await executeQuery(q, [d.name, d.email, d.password, id])
  },

  remove: async (id) => {
    const q = "DELETE FROM users WHERE id = ?"
    return await executeQuery(q, [id])
  }
}

