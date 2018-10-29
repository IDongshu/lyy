var express = require('express');
var router = express.Router();

var db = require("../lib/db.js");
// var mongo = require("../lib/mongo.js");


// ======================产品=========================
/* GET users listing. */
router.get('/showproduct', function(req, res, next) {
    db.query(function(db){
        db.collection("product").find({}).toArray(function(err,docs){
            console.log(docs);//docs是数组对象
            res.json({
                product: docs
            });
        });
    });
});

router.post('/addproduct', function(req, res, next) {
    console.log(req.body);
    db.query(function(db){
        db.collection("product").insertMany([req.body],function(err,result){
            console.log("插入一条记录");
            res.send("true");
        });
    });
});

router.post('/removeproduct', function(req, res, next) {
    console.log(req.body);
    db.query(function(db){
        db.collection("product").remove(req.body,function(err,result){
            console.log("删除一条记录");
            res.send("true");
        });
    });
});

router.post('/findproduct', function(req, res, next) {
    console.log(req.body);
    db.query(function(db){
        db.collection("product").find(req.body).toArray(function(err,docs){
            console.log(docs);
            res.json({
                product: docs
            });
        });
    });
});

router.post('/updateproduct', function(req, res, next) {
    db.query(function(db){
        db.collection("product").update({
                myid:req.body.myid
            },{
                $set:{
                imgurl:req.body.imgurl,
                name:req.body.name,
                vprice:req.body.vprice,
                nprice:req.body.nprice,
                qty:req.body.qty
                }
            },function(err,result){
            console.log("更新一条记录");
            res.send("true");
        });
    });
});

     
   
//================订单============================ 
router.get('/showorder', function(req, res, next) {
    db.query(function(db){
        db.collection("order").find({}).toArray(function(err,docs){
            console.log(docs);//docs是数组对象
            res.json({
                order: docs
            });
        });
    });
});
router.post('/findorder', function(req, res, next) {
    console.log(req.body);
    db.query(function(db){
        db.collection("order").find(req.body).toArray(function(err,docs){
            console.log(docs);
            res.json({
                order: docs
            });
        });
    });
});
router.post('/removeorder', function(req, res, next) {
    console.log(req.body);
    db.query(function(db){
        db.collection("order").remove(req.body,function(err,result){
            console.log("删除一条记录");
            res.send("true");
        });
    });
});




// ================顾客============================
router.get('/showcustomer', function(req, res, next) {
    db.query(function(db){
        db.collection("customer").find({}).toArray(function(err,docs){
            console.log(docs);//docs是数组对象
            res.json({
                customer: docs
            });
        });
    });
});

router.post('/findcustomer', function(req, res, next) {
    console.log(req.body);
    db.query(function(db){
        db.collection("customer").find(req.body).toArray(function(err,docs){
            console.log(docs);
            res.json({
                customer: docs
            });
        });
    });
});
router.post('/removecustomer', function(req, res, next) {
    console.log(req.body);
    db.query(function(db){
        db.collection("customer").remove(req.body,function(err,result){
            console.log("删除一条记录");
            res.send("true");
        });
    });
});
// =================留言======================================
router.get('/showliuyan', function(req, res, next) {
    db.query(function(db){
        db.collection("liuyanban").find({}).toArray(function(err,docs){
            console.log(docs);//docs是数组对象
            res.json({
                liuyan: docs
            });
        });
    });
});

router.post('/addliuyan', function(req, res, next) {
    console.log(req.body);
    db.query(function(db){
        db.collection("liuyanban").insertMany([req.body],function(err,result){
            console.log("插入一条记录");
            res.send("true");
        });
    });
});

// ==================上传图片================================
var multer = require('multer');
var fileNewName;
// 上传配置的必须的参数
var storage = multer.diskStorage({
//     //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function (req, file, cb) {
        console.log(file);
        cb(null, 'public/uploads') //上传
     },
     //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        fileNewName = file.fieldname + '-'  + file.originalname;

        cb(null, fileNewName);
    }
});

var upload = multer({
    storage: storage
});

router.post('/uploads', upload.single('avatar'), function (req, res, next) {
    next();
}, function (req, res, next) {
    res.send(fileNewName);
});



module.exports = router;
