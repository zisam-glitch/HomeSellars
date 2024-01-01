import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const conditionalVerifyUser = (req, res, next) => {
  if (req.cookies.access_token){
    jwt.verify(req.cookies.access_token, process.env.JWT_SECRET, (err, user) => {
      if (err) return next(errorHandler(403, 'Forbidden'));
  
      req.user = user;
      next();
    });
  } else {
    next();
  }
  
};
