const express = require('express');
require("dotenv").config();
const cors = require('cors');
const app = express();
const db = require('./config/db');


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "src/views/pages");
app.use("/static", express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.send('Server is working!')
});


app.get("/getAllCategories", async (req, res) => {
  let results = await db.query(`SELECT * FROM course_categories`).catch((err) => console.log(err));
  res.status(200).json(results.rows);
});

app.get("/getAllPapers", async(req, res) => {
  let results = await db.query(`SELECT * FROM papers`).catch((err) => console.log(err))
  res.status(200).json(results.rows);
});

app.get("/getSinglePaper", async(req, res) => {

})

const port = process.env.PORT  || 9000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})