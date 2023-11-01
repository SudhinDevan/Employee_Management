import express from 'express';
import { verify } from '../middleware/auth.js';
const router = express.Router();

import {
    handleSignUp,
    handleLogin,
    home,
    profile,
    editprofile,
    updateprofile
} from "../controller/userController/userController.js";
import uploadImage from '../helper/multer.js'

router.post('/signup', handleSignUp);
router.post('/login',handleLogin);
router.get('/',verify,home);
router.get('/profiledetails',verify,profile);
router.get('/editprofile',verify,editprofile);
router.post('/updateprofile',verify,uploadImage,updateprofile);

export default router;
