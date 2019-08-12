/*var mysql = require('mysql');
var express = require("express");
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var con = mysql.createConnection({
  host: process.env.port,
  user: "dishask99",
  password: "",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE users ( id int(11) NOT NULL AUTO_INCREMENT, first_name varchar(100) COLLATE utf8_unicode_ci NOT NULL, last_name varchar(100) COLLATE utf8_unicode_ci NOT NULL, email varchar(100) COLLATE utf8_unicode_ci NOT NULL,password varchar(255) COLLATE utf8_unicode_ci NOT NULL,created datetime NOT NULL,modified datetime NOT NULL,PRIMARY KEY (id))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});



app.listen(process.env.PORT,process.env.ID,function(){
    console.log("SERVER STARTED...");
});*/





var express    = require("express");
var login = require('./routes/loginroutes');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// test route
app.get('/', function(req, res) {
    res.json({ message: 'welcome to our upload module apis' });
});
//route to handle user registration
app.use("/",login);

app.listen(process.env.PORT,process.env.ID,function(){
    console.log("SERVER STARTED...");
});



