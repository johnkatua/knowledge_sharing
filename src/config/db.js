const Pool = require("pg").Pool;
const pool = new Pool({
<<<<<<< HEAD
  user: "postgres",
  host: "localhost",
  database: "knowledge_sharing",
  password: "J@nowk",
  port: "5432",
=======
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT
>>>>>>> d39a1045b305842961b918c977380943ecb91f37
});

module.exports = pool;

// const Pool = require("pg").Pool;
// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "knowledge_sharing",
//   password: "J.mwasho0399",
//   port: "5432",
// });

// module.exports = pool;
