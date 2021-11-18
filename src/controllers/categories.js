const db = require('../config/db');

const getAllCategories = (req, res) => {

  db.query('SELECT * FROM course_categories', (err, results) => {
    
    if(err) {
      throw new Error(err)
    }
     let rows = results.rows
    
  /* 
    res.status(200).json({
      status: 'success',
      data: results.rows
    })
       */
   
    return  res.render("categories", {rows:rows});
  })
};

const getSingleCategory = (req, res) => {
  const reqId = req.params.category_id;
  db.query('SELECT * FROM course_categories WHERE category_id = $1', [reqId], (err, results) => {
    if(err) {
      throw new Error(err)
    }
    res.status(200).json({
      status: 'success',
      data: results.rows
    })
  })
}

const createCategory = (req, res) => {
  const {category_name, photo_url} = req.body;
  db.query(
    'INSERT INTO course_categories (category_name, photo_url) VALUES($1, $2)', 
    [category_name, photo_url], (err, results) => {
      if(err) {
        throw new Error(err)
      }
      res.status(201).send(`New category ${category_name} has been created successfully`);
    }
  )
};

const updateCategory = (req, res) => {
  const reqId = req.params.category_id;
  const {category_name, photo_url} = req.body;
  db.query(
    'UPDATE course_categories SET category_name = $1, photo_url = $2 WHERE category_id = $3',
    [category_name, photo_url, reqId], (err, results) => {
      if(err) {
        throw new Error(err)
      }
      res.status(200).send(`Category modified with an Id of ${reqId}`);
    }  
  )
}

const deleteCategory = (req, res) => {
  const reqId = req.params.category_id;
  db.query('DELETE FROM course_categories WHERE category_id = $1', [reqId], (err, results) => {
    if(err) {
      throw new Error(err)
    }
    res.status(200).send(`Category with an id of ${reqId} has been successfully deleted`);
  })
}


module.exports = {
  getAllCategories,
  createCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory
};

