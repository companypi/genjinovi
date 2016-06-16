process.env.NODE_ENV = process.env.NODE_ENV || 3000;
// modules =================================================
var express        = require('express');
var app            = express();
var http           = require('http').createServer(app);
var router         = express.Router();
var mongoose       = require('mongoose');
var morgan         = require('morgan');  
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var fs             = require('fs');


// load all files in models dir
fs.readdirSync(__dirname + '/models').forEach(function(filename) {
  if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
});

// configuration ===========================================


var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };       

// local db
if(process.env.ENV === 'development'){
	var db = require('./config/env/development.js');
} 
// remote db
else{
	var db = require('./config/env/production.js');
}

// Mongoose connection
mongoose.connect(db.url, options);
var conn = mongoose.connection;             
 
conn.on('error', console.error.bind(console, 'connection error:'));  
// When they have db connection correctly 
conn.once('open', function() {
  console.log("Data connected!");                         
});


// set our port
var port = process.env.PORT || 3000; 
app.use(bodyParser.json()); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(methodOverride('X-HTTP-Method-Override')); 
app.use(express.static(__dirname + '/public')); 


// // ===================================================================
// // ============================ route ================================
// // ===================================================================


router.get('/', function(req, res) {
  res.json({ message: 'You are running router.get!' });
});

app.get('/', function(req, res){
  res.sendfile('./public/index.html');
});

// // Require all APIs
fs.readdirSync(__dirname + '/routes/api').forEach(function(filename) {
  if (~filename.indexOf('.js')) require(__dirname + '/routes/api/' + filename)(app)
});

// // start app ===============================================
http.listen(port, function(){
  console.log('listening on '+port);
});               

// // expose app           
exports = module.exports = http;  





