var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

var inputName = 'filedata';
var fileAbsolutePath = '/home/pi/upload/';

router.get('/', function(req, res) {
  res.render('index', { isError : false , inputName : inputName });
});

router.post('/', function(req, res) {

  var file = req.files[inputName];

  if(file === undefined){
    res.render('index', { isError : true, errorMessage : 'File is empty', inputName : inputName });
    return;
  }

  fs.readFile(file.path, function(error, data){
    
    var filePath = fileAbsolutePath + file.name;
    
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