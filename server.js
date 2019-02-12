var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb+srv://rey:yyx71618@movedin-product-gvwwu.mongodb.net/test?retryWrites=true');
var Product = require('./model/product');
var Wishlist = require('./model/wishlist');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get('/', function(request, response){
    response.send("Hello MovedIn");
})
app.post('/product',function(request,response){
    var product = new Product(request.body);
    product.save(function(err, savedProduct){
        if(err){
            response.status(500).send({error: "Could not save product"});
        }else{
            response.status(200).send(savedProduct);
        }
    });
})
app.listen(3000, function(){
    console.log("MovedIn api created");
});