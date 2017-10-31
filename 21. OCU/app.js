var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var OcuUtil = require('./routes/ocuUtility.js')

// view engine setup
var engine = require('consolidate');
app.set('views',__dirname);
app.engine('html', engine.mustache);


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){res.render('public/gui.html')});
app.get('/ocu/missions/',function(req,res){
    OcuUtil.getAllMissions(function(err,missions){
      if(err){
        res.send('missions Error'+err);
      }
       res.send(missions)
    })
})

var server = app.listen(9000,function(){
  var port = server.address().port;
  var host = server.address().address;
  console.log('LIstening on port http:' + host +":" + port);
});