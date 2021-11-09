const express = require('express');
const router = express.Router();
const api = require('../controllers/categories');

router.get('/getAllCategories', api.getAllCategories);

module.exports = router;
