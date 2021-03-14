var express = require("express");
var router = express.Router();
var mysql = require("mysql");

router.route("/:state").get(async (req, res) => {
  try {
    var connection = mysql.createConnection({
      host: "remotemysql.com",
      user: process.env.sqld,
      password: process.env.sqlp,
      database: process.env.sqld,
    });

    connection.connect();
    var query = "SELECT * FROM  result  WHERE State='" + req.params.state + "'";
    console.log(query);
    var result;
    connection.query(query, function (error, results, fields) {
      if (error) {
        throw error;
      } else {
        res.json(results);
      }
    });
  } catch (e) {
    res.error(400);
  }
});

module.exports = router;
