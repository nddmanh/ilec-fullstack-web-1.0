const jwt = require('jsonwebtoken');
const config = require('../config');

async function authenticate (req, res, next) {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send("Not authenticated!");
    }

    const data = await jwt.verify(token, config.secretKey);

    if (!data) {
      return res.status(401).send("Not authenticated!");
    }

    if (data.exp <= Date.now() / 1000) {
      return res.status(401).send("Token expired!");
    }

    req.user = {
      _id: data._id,
      email: data.email,
      phoneNumber: data.phoneNumber,
      role: data.role
    };

    next();
  } catch (err) {
    return res.status(401).send("Not authenticated!");
  }
}

module.exports = {
  authenticate
};