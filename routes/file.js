var express = require('express')
var fileRouter = express.Router()
var database = require('../database.js')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var dateTime = require('node-datetime');
var fs = require('fs');
var path = require('path');
var mime = require('mime');


fileRouter.route('/download/file/:id').get(function(req, res, next){
    
    var fileId = req.params.id
    console.log(fileId)
    database.getFileById(fileId).then(function(fil){
        //var filename = file[0].filename
        //var path = file[0].filepath
        
        // console.log(file[0].filepath)
        // res.download(path, filename)

        var file = fil[0].filepath + fil[0].filename
        console.log(file)

        var filename = path.basename(file);
        console.log(filename)
        var mimetype = mime.lookup(file);
        console.log(mimetype)
        
        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        res.setHeader('Content-type', mimetype);
      
        var filestream = fs.createReadStream(file);
        filestream.pipe(res);

    }, next);
});

fileRouter.post('/file/create', jsonParser, function(req, res){
    
    var dt = dateTime.create();
    var formatted = dt.format('Y-m-d H:M:S');

    var filename = " "
    var filepath = "public/" + filename
    var companyId = req.body.companyId 


    fs.writeFile(filepath, req.body.binImgg, 'binary', function (err) {
        if (err) {
            console.log("There was an error uploading the file.")
            res.status(400).send({
                success: false,
                message: 'Error uploading/creating file'
            }); // Bad request.
        } 
        else 
        {
            database.createFile(filename, filepath, companyId, formatted ).then(function(data){
                
                res.status(200).send("success.. file uploaded and details is saved into db");
                
            }, function (error) {
                    console.log('Error from createFile in file: ' + error);
            });
        }
    });
});


module.exports = fileRouter;