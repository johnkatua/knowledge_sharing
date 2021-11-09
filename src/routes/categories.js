const express = require('express');
const router = express.Router();
const api = require('../controllers/categories');

router.get('/getAllCategories', api.getAllCategories);

router.get('/', (req, res) => {
  res.send('Server is working')
})

module.exports = router;
