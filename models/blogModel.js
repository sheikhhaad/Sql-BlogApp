import { executeQuery } from "../config/querHelper.js"


export const blogModel = {
  getAll: async () => {
    const q = "SELECT * FROM blog_posts ORDER BY id DESC"
    const r = await executeQuery(q)
    return r
  },

  getById: async (id) => {
    const q = "SELECT * FROM blog_posts WHERE id = ?"
    return await executeQuery(q, [id])
  },

  add: async (d) => {
    const q = "INSERT INTO blog_posts (author_name, author_id, title, description) VALUES (?, ?, ?, ?)"
    return await executeQuery(q, [d.author_name, d.author_id, d.title, d.description])
  },

  update: async (id, d) => {
    const q = "UPDATE blog_posts SET author_name = ?, title = ?, description = ? WHERE id = ?"
    return await executeQuery(q, [d.author_name, d.title, d.description, id])
  },

  remove: async (id) => {
    const q = "DELETE FROM blog_posts WHERE id = ?"
    return await executeQuery(q, [id])
  }
}

