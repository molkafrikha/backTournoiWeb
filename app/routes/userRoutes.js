const express = require('express');
const userController = require('../controller/userController.js');
const adminController = require('../controller/adminController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/register', userController.userRegister);
router.post('/login', userController.userLogin);
router.get('/verification/:token', userController.userEmailVerify);
router.post('/getResetPasswordLink', userController.getResetPasswordLink);
router.post('/resetPassword/:token', userController.resetPassword);
router.get('/allusers', adminController.getAllUsers);
router.get('/getAllUsersnonconf', adminController.getAllUsersnonconfirmed);
router.delete('/users/:id', adminController.deleteUser);
router.put('/confirmusers/:id', adminController.confirmUser); // Confirmer l'utilisateur par l'administrateur
router.put('/refususers/:id', adminController.rejectUser); // Rejeter l'utilisateur par l'administrateur

module.exports = router;
