var express = require('express');
var morgan = require('morgan');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb+srv://rey:yyx71618@movedin-product-gvwwu.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });



//Middlerwares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




//Routes
app.use('/users', require('./routes/users'));



// API
app.get('/', function (request, response) {
    response.send("Hello MovedIn");
})
app.post('/product', function (request, response) {
    var product = new Product(request.body);
    product.save(function (err, savedProduct) {
        if (err) {
            response.status(500).send({ error: "Could not save product" });
        } else {
            response.status(200).send(savedProduct);
        }
    });
})


//starts the server
app.listen(3000, function () {
    console.log("Server listening at port 3000,MovedIn api created");
});