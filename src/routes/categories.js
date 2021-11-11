const express = require('express');
const router = express.Router();
const api = require('../controllers/categories');

router.get('/getAllCategories', api.getAllCategories);
router.get('/getSingleCategory/:category_id', api.getSingleCategory);
router.post('/createCategory', api.createCategory);
router.put('/updateCategory/:category_id', api.updateCategory);
router.delete('/deleteCategory', api.deleteCategory);

module.exports = router;
