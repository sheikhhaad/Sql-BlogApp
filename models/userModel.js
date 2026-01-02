import { executeQuery } from "../config/querHelper.js";

export const userModel = {
  getAll: async () => {
    const q = "SELECT * FROM users ORDER BY id DESC";
    return await executeQuery(q);
  },

  getByEmail: async (email) => {
  const q = "SELECT * FROM users WHERE email = $1";
  const r = await executeQuery(q, [email]);
  return r[0] || null; // agar user na mile to null return
},


  add: async (d) => {
  const q = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const r = await executeQuery(q, [d.name, d.email, d.password]);
  return r[0]; // ye inserted row object
},
  update: async (id, d) => {
    const q = `
      UPDATE users
      SET name = $1, email = $2, password = $3
      WHERE id = $4
      RETURNING *;
    `;
    const r = await executeQuery(q, [d.name, d.email, d.password, id]);
    return r[0];
  },

  remove: async (id) => {
    const q = "DELETE FROM users WHERE id = $1 RETURNING *";
    const r = await executeQuery(q, [id]);
    return r[0]; // deleted row
  },
};
