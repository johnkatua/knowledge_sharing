const db = require('../config/db');

const getAllCategories = (req, res) => {
  db.query('SELECT * FROM course_categories', (err, results) => {
    if(err) {
      throw new Error(err)
    }
    res.status(200).json({
      status: 'success',
      data: results.rows
    })
  })
};

module.exports = {
  getAllCategories
};

