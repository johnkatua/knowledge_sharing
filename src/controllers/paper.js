const db = require("../config/db");

const getAllPapers = (req, res) => {
  db.query("SELECT * FROM papers", (err, results) => {
    if (err) {
      throw new Error(err);
    }
    res.status(200).json({
      status: "success",
      data: results.rows,
    });
  });
};

const getPapersByCategoryId = (req, res) => {
  const reqId = req.params.category_id;
  console.log(reqId);
  db.query("SELECT * FROM papers WHERE category_id = $1", [reqId], (err, results) => {
    if (err) {
      throw new Error(err);
    }
    res.status(200).json({
      status: "success",
      data: results.rows,
    });
  });
};

const getPapersByPaperId = (req, res) => {
  const reqId = req.params.paper_id;
  db.query("SELECT * FROM papers WHERE paper_id = $1", [reqId], (err, results) => {
    if (err) {
      throw new Error(err);
    }
    res.status(200).json({
      status: "success",
      data: results.rows,
    });
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
  getPapersByCategoryId,
  getPapersByPaperId,
  createPaper,
  updatePaper,
  deletePaper
};
