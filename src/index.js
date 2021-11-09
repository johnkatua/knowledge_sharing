const express = require('express');
require("dotenv").config();
const cors = require('cors');
const app = express();
const db = require('./config/db');


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views","src/views/pages");
app.get('/', (req, res) => {
  res.send('Server is working!')
});

console.log(process.env.PG_HOST);

app.get("/categories", async (req, res) => {
  let results = await db.query(`SELECT * FROM course_categories`).catch((err) => console.log(err));
  let rows = results.rows
  return  res.render("categories",{rows})
  console.log(results)
});

const port = process.env.PORT  || 9002;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})