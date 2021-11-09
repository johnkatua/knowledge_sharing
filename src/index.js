const express = require('express');
require("dotenv").config();
const cors = require('cors');
const app = express();

const categoriesRoutes = require('./routes/categories');



app.use(express.json());
app.use(cors());
<<<<<<< HEAD
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
=======
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "src/views/pages");
app.use("/static", express.static(`${__dirname}/public`));


// routes
app.use(categoriesRoutes)
>>>>>>> d39a1045b305842961b918c977380943ecb91f37

const port = process.env.PORT  || 9002;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})