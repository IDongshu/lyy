var express = require('express');
var router = express.Router();
var db = require("../lib/db.js");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/findUser', function(req, res, next) {
    console.log(req.body);
    db.query(function(db){
        db.collection("users").find(req.body).toArray(function(err,docs){
            console.log(docs);
            res.send(docs);
        });
    });
});


router.post('/addUser', function(req, res, next) {
    db.query(function(db){
        db.collection("users").insertMany([req.body],function(err,result){
            console.log("insert one document to collection");
            res.send("true");
        });
    });
});

module.exports = router;
