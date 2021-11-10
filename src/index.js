const express = require('express');
require("dotenv").config();
const cors = require('cors');
const app = express();
const categoriesRoutes = require("./routes/categories");
const paperRoutes = require('./routes/paper');


app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
  res.send('Server is working!')
});

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "src/views/pages");
app.use("/static", express.static(`${__dirname}/public`));

// routes
app.use(categoriesRoutes)
app.use(paperRoutes);

const port = process.env.PORT  || 9002;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})