
var express = require('express');
var cfenv = require('cfenv');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');
var cors = require('cors');

// serve the files out of ./public as our main files
app.use(express.static('public'));
app.set('views', './server/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
//app.use(morgan());


var title = 'Gallery S3 ICOS';

// Serve index.ejs
app.get('/', function (req, res) {
  res.render('index', {status: '', title: title});
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var galleryController = require('./server/controllers/galleryController')(title);
var imageUploadRouter = require('./server/routes/imageUploadRoutes')(title);
var galleryRouter = require('./server/routes/galleryRoutes')(title);


app.use('/project', galleryController.crearproyecto);
app.use('/gallery', galleryRouter);
app.use('/doc/delete/recycle', galleryController.deleteRecycleDocs);
app.use('/doc/delete/gallery', galleryController.deleteGralleryDocs);
app.use('/doc/download/gallery', galleryController.downGralleryDocs);
app.use('/doc/download/recycle', galleryController.downRecycleDocs);
app.use('/recyclebin', galleryController.GalleryRecycle);
app.use('/doc/restore', galleryController.restoreRecycleDocs);
app.post('/upload', [galleryController.uploadGalleryDocs]);


// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});

