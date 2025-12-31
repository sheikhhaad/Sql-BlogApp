import express from 'express';
import { getAllUsers, loginUser, logoutUser, registerUser } from '../controllers/userController.js';


// get all users
let router = express.Router();
 router.get('/allusers', getAllUsers);
 router.post('/register', registerUser);
 router.post('/login', loginUser);
 router.post('/logout', logoutUser)



export default router;