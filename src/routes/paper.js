const express = require('express');
const router = express.Router();
const api = require('../controllers/paper');

router.get('/getAllPapers', api.getAllPapers);
router.get('/getSinglePaper', api.getSinglePaper);
router.post('/createPaper', api.createPaper);
router.put('/updatePaper/:paper_id', api.updatePaper);
router.delete('/deletePaper/:paper_id', api.deletePaper);

module.exports = router;