var mysql      = require('mysql');
var express = require("express");
var router = express.Router();
var crypto = require("crypto");
var cipher= require("cipher");
var connection = mysql.createConnection({
  host: process.env.port,
  user: "dishask99",
  password: "",
  database: "mydb"
});
const secret = 'abcdefg';
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});
router.get('/register',function(req,res){
    res.render("register.ejs");
});
router.get("/login",function(req,res){
   res.render("login.ejs"); 
});
router.post("/register",function(req,res){
  // console.log("req",req.body);
  var today = new Date();

var pass_shasum = crypto.createHash('sha256').update(req.body.password).digest('hex');
  var users={
    "first_name":req.body.first_name,
    "last_name":req.body.last_name,
    "email":req.body.email,
 
    "password": pass_shasum,
    "created":today,
    "modified":today
  };
  connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    });
  }else{
    console.log('The solution is: ', results);
    res.send({
      "code":200,
      "success":"user registered sucessfully"
        });
  }
  });
});

router.post('/login',function(req,res){
  var email= req.body.email;
  
var pass_shasum = crypto.createHash('sha256').update(req.body.password).digest('hex');
  var password = req.body.password;
  connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
  if (error) {
    // console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    // console.log('The solution is: ', results);
    if(results.length >0){
      console.log(req.body.first_name);
         var sql = " SELECT id FROM users WHERE first_name= ? ";
        
         connection.query(sql,req.body.first_name, function (err, result) {
           if(err) throw err;
          var string=JSON.stringify(result);
          console.log('>> string: ', string );
          var json =  JSON.parse(string);
          console.log('>> json: ', json);
            
                console.log(results[json[0].id-1].password);
                console.log(pass_shasum);
                if(results[json[0].id-1].password == pass_shasum){
                res.send({
                   "code":200,
                   "success":"login sucessfull"
                 });
           }
          else{
    
              res.send({
               "code":204,
               "success":"Email and password does not match"
            });
          }
           
         });
         }
       else{
         res.send({
         "code":204,
         "success":"Email does not exits"
         });
         }


    
     }
    
});
});


module.exports = router;
