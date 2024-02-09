const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports.checkUser =  (req, res, next) => {
  const token =  req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    console.log('no token');
    res.locals.user = null;
    next();
  }

};


module.exports.requireAuth =  (req, res, next) => {
  const token =  req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/users/user/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/users/user/login');
  }
}


