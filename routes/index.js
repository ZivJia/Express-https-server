let express = require('express');
let multer = require('multer');
let fs = require('fs');

let router = express.Router();
let upload = multer();

// define the home page route
router.get('/', (req, res, next) => {
  console.log('Get request here')
  res.send('Welcome to SocialMatrc');
});


router.post('/uploadfile', upload.fields([{'name':'file'},{'name':'UserId'}]), (req, res, next) => {

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


module.exports = router;
