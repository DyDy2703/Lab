var express = require("express");
var router = express.Router();
var ProductService = require(global.__basedir +  "/apps/Services/ProductService");
var ObjectId = require('mongodb').ObjectId;


var Product = require(global.__basedir + "/apps/Entity/Product");
var Category = require(global.__basedir + "/apps/Entity/Category");


router.post("/insert-product", async function(req,res){
    var productService = new ProductService();
    var pro = new Product();
    pro.Name = req.body.Name;
    pro.Price = req.body.Price;
    var cate = new Category();
    cate.Name = "category 1";
    var result =  await productService.insertProduct(pro, cate);
    res.json({status: true, message:""});
});
router.get("/", function(req,res){
    res.render("admin/productmanage.ejs");
});
router.get("/product-list", async function(req,res){
    var productService = new ProductService();
    var product =  await productService.getProductList();
    res.json(product);
});


router.post("/update-product", async function(req,res){
    var productService = new ProductService();
    var pro = new Product();
    console.log(req.body.Id);
    pro._id = new ObjectId(req.body.Id);
    pro.Name = req.body.Name;
    pro.Price = req.body.Price;
    await  productService.updateProduct(pro);
    res.json({status: true, message:""});
});


router.delete("/delete-product", async function(req,res){
    var productService = new ProductService();
    await  productService.deleteProduct(req.query.id);
    res.json({status: true, message:""});
});


module.exports = router;