import express from 'express';
import { verify, } from '../middleware/auth.js';
import uploadImage from '../helper/multer.js'
import {home,deleteUser,editAccess,editProfile,updateprofile, delUser} from '../controller/adminController/adminController.js'
const router = express.Router();

router.get('/home',verify,home);
router.get('/editaccess',verify,editAccess);
router.get('/editprofile',verify,editProfile);
router.delete('/user-delete',verify,deleteUser);
router.post('/updateprofile',verify,uploadImage,updateprofile);
router.get('/user-idDel',verify,delUser)

export default router;