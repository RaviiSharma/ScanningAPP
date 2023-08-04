

const express = require("express");
const bodyParser = require('body-parser');
const upload=require("express-fileupload")

const route = require('../ScanningAPP/routes/route');

const app = express();
let path=require('path');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true }));
app.use(upload());

//Function to serve all static files inside controllers directory.
app.use(express.static('controllers')); 



app.use('/', route);



  app.listen(process.env.PORT || 3000 , function () {
    console.log('Express app running on port' + (process.env.PORT || 3000 ))
});

