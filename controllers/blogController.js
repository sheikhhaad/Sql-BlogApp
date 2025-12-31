import { blogModel } from "../models/blogModel.js";

// addblog
export const addBlog = async (req, res) => {
  const data = req.body;
  console.log(data);
  
  try {
    const result = await blogModel.add(data);
    res.status(201).json({
      message: "✅ Blog added successfully",
      blogId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({
      message: "❌ Error adding blog",

      error: error.message,
    });
  }
};

// getAllBlogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.getAll();
    console.log(blogs);
    
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({
      message: "❌ Error fetching courses",
      error: error.message,
    });
  }
};