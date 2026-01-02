import { executeQuery } from "../config/querHelper.js";

export const blogModel = {
  getAll: async () => {
    const q = "SELECT * FROM blog_posts ORDER BY id DESC";
    return await executeQuery(q);
  },

  getById: async (id) => {
    const q = "SELECT * FROM blog_posts WHERE id = $1";
    return await executeQuery(q, [id]);
  },

  add: async (d) => {
    const q = `
      INSERT INTO blog_posts (author_name, author_id, title, description)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    return await executeQuery(q, [d.author_name, d.author_id, d.title, d.description]);
  },

  update: async (id, d) => {
    const q = `
      UPDATE blog_posts
      SET author_name = $1, title = $2, description = $3
      WHERE id = $4
      RETURNING *;
    `;
    return await executeQuery(q, [d.author_name, d.title, d.description, id]);
  },

  remove: async (id) => {
    const q = "DELETE FROM blog_posts WHERE id = $1 RETURNING *";
    return await executeQuery(q, [id]);
  }
};
