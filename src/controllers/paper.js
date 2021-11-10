const db = require('../config/db');

const getAllPapers = (req, res) => {
  db.query('SELECT * FROM papers', (err, results) => {
    if(err) {
      throw new Error(err)
    }
    res.status(200).json({
      status: 'success',
      data: results.rows
    })
  })
};

const getPapersByCategoryId = (req, res) => {
  const reqId = req.params.category_id;
  console.log(reqId);
  db.query('SELECT * FROM papers WHERE category_id = $1', [reqId], (err, results) => {
    if(err) {
      throw new Error(err)
    }
    res.status(200).json({
      status: 'success',
      data: results.rows
    })
  })
}

module.exports = {
  getAllPapers,
  getPapersByCategoryId
}