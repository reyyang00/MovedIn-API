var express = require('express');
var morgan = require('morgan');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const dotenv = require('dotenv');
//load the .env file
dotenv.config();
var url = process.env.MONGO_DB_ENDPOINT;
var db = mongoose.connect(url, { useNewUrlParser: true });



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


//starts the server
app.listen(process.env.SERVER_PORT, function () {
    console.log("Server listening at port 3000,MovedIn api created");
});