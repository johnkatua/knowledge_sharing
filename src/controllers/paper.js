const db = require("../config/db");

const getAllPapers = (req, res) => {

  let dbquery;
  let studentyear = req.query.studentyear;
  let papertype = req.query.papertype;
  let paperyear = req.query.paperyear;
  let category_id = req.query.category_id;
   
  if(papertype == undefined){
    papertype = "";
  }else{
      papertype = papertype;
  }
  if(paperyear == undefined){
    paperyear = "";
  }else{
    paperyear = paperyear;
  }

  if(studentyear == undefined){
    studentyear = "";
  }else{
    studentyear = studentyear;
  }
  
  if(category_id == null || category_id == undefined){
    category_id = 1;
  }
  
  let page = req.query.page;
  if(page == null || page == undefined || page < 1){
    page = 1;
  }
  
  dbquery = `SELECT papers.paper_id, papers.paper_name, papers.paper_details, papers.photo_url, course_categories.category_name FROM papers LEFT JOIN course_categories ON course_categories.category_id = papers.category_id WHERE papers.category_id=${category_id} AND papers.paper_type LIKE '%${papertype}%' AND CAST(papers.student_year AS TEXT AND CAST(papers.paper_year AS TEXT) LIKE '%${paperyear}%') LIKE '%${studentyear}%' ORDER BY papers.paper_id LIMIT 4 OFFSET (${page}-1)*4`;
  
  let search = req.query.search;
  if(search != '' || search != undefined ){
    dbquery = `SELECT * FROM papers WHERE CONCAT(papers.paper_name,' ',papers.paper_details) LIKE '%${search}%' AND (papers.paper_type LIKE '%${papertype}%' AND CAST(papers.student_year AS TEXT) LIKE '%${studentyear}%' AND CAST(papers.paper_year AS TEXT) LIKE '%${paperyear}%') ORDER BY papers.paper_id LIMIT 6 OFFSET (${page}-1)*6`;
  }

  db.query(dbquery, (err, results) => {
    if (err) {
      throw new Error(err);
    }
    let papers = results.rows
    /*
    res.status(200).json({
      status: "success",
      data: results.rows,
    });
    */
    return  res.render("papers", {papers:papers,studentyear:studentyear,papertype:papertype,search:search,page:page,paperyear:paperyear});
  });
};

const getSinglePaper = (req, res) => {
  let studentyear = req.query.studentyear;
  let papertype = req.query.papertype;
  let reqId = req.query.paper_id;
  let search = req.query.search;

  if(reqId == undefined){
    reqId = 1
  }
  db.query(`SELECT papers.paper_name, papers.paper_details, papers.photo_url, course_categories.category_name FROM papers LEFT JOIN course_categories ON course_categories.category_id = papers.category_id WHERE papers.paper_id = ${reqId}`, (err, results) => {
    if (err) {
      throw new Error(err);
    }
    let paper = results.rows
  /*
    res.status(200).json({
      status: "success",
      data: results.rows,
    });
        */
    return  res.render("paperDetails", {paper:paper,studentyear:studentyear,papertype:papertype,search:search});
  });
};

const createPaper = (req, res) => {
  const { paper_name, photo_url, paper_year, category_id, paper_details, student_year, paper_type, paper_url } =
    req.body;
  db.query(
    "INSERT INTO papers (paper_name, photo_url, paper_year, category_id, paper_details, student_year, paper_type, paper_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
    [paper_name, photo_url, paper_year, category_id, paper_details, student_year, paper_type, paper_url],
    (err, results) => {
      if (err) {
        throw new Error(err);
      }
      console.log(req.body);
      res.status(201).send(`New paper with the name of ${req.body.paper_name} has been created`);
    }
  );
};

const updatePaper = (req, res) => {
  const reqId = req.params.paper_id;
  const { paper_name, photo_url, paper_year, category_id, paper_details, student_year, paper_type, paper_url } =
    req.body;
  db.query(
    "UPDATE papers SET paper_name =$1, photo_url = $2, paper_year = $3, category_id = $4, paper_details = $5, student_year = $6, paper_type = $7, paper_url = $8 WHERE paper_id = $9",
    [paper_name, photo_url, paper_year, category_id, paper_details, student_year, paper_type, paper_url, reqId],
    (err, results) => {
      if (err) {
        throw new Error(err);
      }
      console.log(req.body);
      res.status(201).send(`Paper with an Id of ${reqId} has been successfully updated`);
    }
  );
}

const deletePaper = (req, res) => {
  const reqId = req.params.paper_id;
  db.query('DELETE FROM papers where paper_id = $1', [reqId], (err, results) => {
    if(err) {
      throw new Error(err)
    }
    res.status(200).send(`Paper successfully deleted with an id of ${reqId}`);
  })
}

module.exports = {
  getAllPapers,
  getSinglePaper,
  createPaper,
  updatePaper,
  deletePaper
};
