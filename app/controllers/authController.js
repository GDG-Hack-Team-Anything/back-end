const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Error handler function
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let message = '';

  if (err.message === 'incorrect email') {
    message = 'That email is not registered';
  } else if (err.message === 'incorrect password') {
    message = 'That password is incorrect';
  } else if (err.code === 11000) {
    message = 'That email is already registered';
  } else if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      message += properties.message + ' ';
    });
  } else {
    message = 'Internal server error';
  }

  return message;
};

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: maxAge
  });
};

// controller actions

module.exports.login_get = async (req, res) => {
  res.status(200).send("This is the login page");
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    if(user){
      const token = createToken(user._id, user.role);
      res.cookie('jwt', token, { httpOnly: true, maxAge});
      res.status(200).json({
        user: user._id,
        role: user.role,
        message : "Login successful",
        token: token
      });
    } else {
      res.status(400).json({ message: 'Incorrect email or password' });
    }
  } catch (err) {
    const message = handleErrors(err);
    res.status(400).json({ message });
  }
};

module.exports.logout_get = (req, res) => {
  if (req.cookies.jwt) {
    res.cookie('jwt', '', { maxAge: 1 });
  }
  res.redirect('/');
};
