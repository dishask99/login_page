var mysql = require('mysql');
var express = require("express");
var con = mysql.createConnection({
  host: process.env.port,
  user: "dishask99",
  password: "",
  database: "mydb"
});

var app =express();



/*con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});*/


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "select * from customers";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
    app.get("/",function(req,res){
    res.render("index.ejs",{result: result});
});
  });
});


app.listen(process.env.PORT,process.env.ID,function(){
    console.log("SERVER STARTED...");
});