var express = require("express");
var router = express.Router();
var mysql = require("mysql");

router.route("/:id").get(async (req, res) => {
  var connection = mysql.createConnection({
    host: "remotemysql.com",
    user: process.env.sqld,
    password: process.env.sqlp,
    database: process.env.sqld,
  });
  var x = req.params.id * 20 + 1;
  console.log(
    "SELECT * FROM  data  WHERE State>=" +
      x +
      " && State<=" +
      (x + 39) +
      " && S%24<=12 && S%24>0 && Month<=3"
  );
  connection.connect();
  var query =
    "SELECT * FROM  data  WHERE State>=" +
    x +
    " && State<=" +
    (x + 19) +
    " && S%24<=12 && S%24>0 && Month<=3";
  var result;
  connection.query(query, function (error, results, fields) {
    if (error) {
      console.log("error", error);
      res.error(400);
    } else {
      res.json(results);
    }
  });
  connection.end();
});

module.exports = router;
