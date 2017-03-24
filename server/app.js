var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var port = 7000;

app.use(bodyParser.urlencoded({extended:true}));



app.use(express.static('server/public'));

app.listen(port, function(){
  console.log("Listening on port", port);
});
