const express = require('express');
require("dotenv").config();
const cors = require('cors');
const app = express();

const categoriesRoutes = require('./routes/categories');



app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "src/views/pages");
app.use("/static", express.static(`${__dirname}/public`));


// routes
app.use(categoriesRoutes)

const port = process.env.PORT  || 9000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})