const express = require('express');
const router = express.Router();
const api = require('../controllers/paper');

router.get('/getAllPapers', api.getAllPapers);
router.get('/papers/:category_id', api.getPapersByCategoryId)

module.exports = router;