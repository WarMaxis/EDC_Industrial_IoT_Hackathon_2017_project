var express = require( 'express')
var bodyParser = require( 'body-parser')
var app = express()
var data;
app.use( express.static( __dirname ))
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.post('/predixService', function (req, res) {
    data = req.body
    res.send(req.body);
});

app.get('/getData', function (req, res) {
    res.send(data);
});

app.listen( process.env.PORT || 4000)
