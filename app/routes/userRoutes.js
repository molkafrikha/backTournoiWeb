import express from 'express';
import {
  userLogin,
  userRegister,
  userEmailVerify,
  resetPassword,
  getResetPasswordLink,
  
} from '../controller/userController.js';
import { getAllUsers , deleteUser ,confirmUser, rejectUser , getAllUsersnonconfirmed  } from '../controller/adminController.js';
import { isAdmin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/register').post(userRegister);
router.route('/login').post(userLogin);
router.route('/verification/:token').get(userEmailVerify);
router.route('/getResetPasswordLink').post(getResetPasswordLink);
router.route('/resetPassword/:token').post(resetPassword);
router.route('/allusers').get( getAllUsers);
router.route('/getAllUsersnonconf').get( getAllUsersnonconfirmed);
router.delete('/users/:id', deleteUser);
router.put('/confirmusers/:id',  confirmUser); // Confirmer l'utilisateur par l'administrateur
router.put('/refususers/:id',  rejectUser); // Rejeter l'utilisateur par l'administrateur


export default router;
