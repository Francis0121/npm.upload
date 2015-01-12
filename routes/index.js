var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

router.get('/', function(req, res) {
  res.render('index', { isError : false });
});

router.post('/', function(req, res) {

  if(req.files.filedata === undefined){
    res.render('index', { isError : true, errorMessage : 'File is empty'});
    return;
  }

  fs.readFile(req.files.filedata.path, function(error, data){
    
    var filePath = path.join(__dirname, '../public/upload/') + req.files.filedata.name;
    
    fs.writeFile(filePath, data, function(error){
      if(error){
        throw error;
      }else{
        res.redirect('/');
      }
    });
    
  });
  
});

module.exports = router;
