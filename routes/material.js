var express = require('express')
var materialRouter = express.Router()
var database = require('../database.js')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var pdf_table_extractor = require("pdf-table-extractor")
var fs = require('fs');
var path = require('path');
var mime = require('mime');

materialRouter.route('/materials')
.get(function (req,res, next) {
    var promises = [];
    promises.push(database.getMaterials().then(function (data) {
        return data;
    }));
    Promise.all(promises).then(function (values) {
        var json = JSON.stringify({
            materialsApi: values[0]
        });
        res.end(json);
    });
 
});


materialRouter.route('/material/:id')
.get(function (req,res, next) {
    var id = req.params.id
    database.getMaterialById(id).then(function(result){
        res.send(result)
    }, next);
});

materialRouter.route('/material/time/:timeStamp')
.get(function (req,res, next) {
    
    var timeStamp = req.params.timeStamp
    database.getMaterialByTime(timeStamp).then(function(result){      
        res.send(result)
    }, next);
});

materialRouter.route('/material/pdf/:id')
.get(function (req,res, next) {
    var id = req.params.id

    database.getMaterialById(id).then(function(result){

        var pdf = result[0].pdfpath + result[0].pdfname
        console.log(pdf)

        var pdfName = path.basename(pdf)
        //console.log(pdfName)
        
        pdf_table_extractor(pdf,function(rslt){ res.send(rslt)},error)
        
        //res.send(result)
    }, next);
});

//PDF parsed 
// function success(result)
// {
    
//     console.log(JSON.stringify(result));
// }
 
//Error 
function error(err)
{
   console.error('Error: ' + err);
}

module.exports = materialRouter;