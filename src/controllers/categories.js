const db = require('../config/db');

const getAllCategories = (req, res) => {
  db.query('SELECT * FROM course_categories', (err, results) => {
    if(err) {
      throw new Error(err)
    }
    let rows = results.rows
    return  res.render("categories",{rows})
  })
};

module.exports = {
  getAllCategories
};

