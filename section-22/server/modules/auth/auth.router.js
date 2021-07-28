const express = require('express');
const router = express.Router();
const service = require('./auth.service');

router.post('/login', async function(req, res) {
  try {
    const result = await service.login(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.post('/register', async function(req, res) {
  try {
    const result = await service.register(req.body);
    res.json(result);
  } catch(error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = {
  router: router
};