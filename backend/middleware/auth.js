const jwt = require('jsonwebtoken');
const { getUserById, toPublicUser } = require('../services/users');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];

    if (token.startsWith('guest_')) {
      req.user = { _id: token, name: 'Guest User', email: 'guest@portfoliomaker.com' };
      return next();
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await getUserById(decoded.id);
      if (!user) {
        req.user = {
          _id: 'guest_' + Math.random().toString(36).substring(7),
          name: 'Guest User',
          email: 'guest@portfoliomaker.com',
        };
        return next();
      }
      req.user = toPublicUser(user);
      return next();
    } catch (error) {
      req.user = {
        _id: 'guest_' + Math.random().toString(36).substring(7),
        name: 'Guest User',
        email: 'guest@portfoliomaker.com',
      };
      return next();
    }
  }

  req.user = {
    _id: 'guest_' + Math.random().toString(36).substring(7),
    name: 'Guest User',
    email: 'guest@portfoliomaker.com',
  };
  next();
};

module.exports = { protect };
