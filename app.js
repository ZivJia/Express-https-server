var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var fs = require('fs');
var stringify = require('csv-stringify');

var app = express();

let multer = require('multer');
let upload = multer();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

fs.mkdir('uploadfile', { recursive: true }, (err) => {
  if (err) {
    if (err.code === 'EEXIST') {
      console.error('directory already exists');
      return;
    }
  }
});

app.get('/', (req, res) => {
  console.log('Get request here')
  res.send('Welcome to SocialMatrc');
});


app.post('/uploadfile', upload.fields([{'name':'file'},{'name':'UserId'}]), (req, res) => {

  console.log('Request received');
  if (!req.files) {
    res.status(400);
  }

  let mBufferString = req.files.file[0].buffer.toString('utf-8');

  let userId = req.body.UserId;

  let fileName = req.files.file[0].originalname;

  fs.mkdir(`uploadfile/${userId}`, { recursive: true }, (err) => {
    if (err) {
      if (err.code !== 'EEXIST') {
        throw err;
      }
    }
    fs.mkdir(`uploadfile/${userId}/${fileName.split('.')[0]}`, { recursive: true }, (err) => {
      if (err) {
        if (err.code !== 'EEXIST') {
          return;
        }
      }
      fs.writeFile(`uploadfile/${userId}/${fileName.split('.')[0]}/${Date.now().toString() + '_' + fileName}`, mBufferString, (err) => {
          if (err){
            res.status(400);
            console.log(err);
            return
          } else {
            console.log(`${fileName} File saved`)
            res.status(200);
          }
      });
    });
  });

  res.send(`${fileName} File saved`);
});

module.exports = app;
