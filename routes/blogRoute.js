import express from 'express';
import { addBlog, getAllBlogs } from '../controllers/blogController.js';


// get all blog
let router = express.Router();
 router.get('/allblogs', getAllBlogs);
 router.post('/createBlog', addBlog);


export default router;