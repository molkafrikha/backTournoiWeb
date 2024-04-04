import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const secretkey = "bezkoder-secret-key"
      const decoded = jwt.verify(token, secretkey);
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authirized! Token failed.');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not authorized! No Token');
  }
});


const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // L'utilisateur est un agent, continuez
  } else {
    res.status(403).json({ message: 'Accès interdit. Seuls les admin sont autorisés.' });
  }
};



export { protect , isAdmin };
