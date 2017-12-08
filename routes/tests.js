var express = require('express')
var testsRouter = express.Router()
var database = require('../database.js')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

testsRouter.route('/hallflowtests')
.get(function (req,res, next) {
    var promises = [];
    promises.push(database.getTests().then(function (data) {
        return data;
    }));
    Promise.all(promises).then(function (values) {
        var json = JSON.stringify({
            testsApi: values[0]
        });
        res.end(json);
    });
 
});


testsRouter.route('/hallflowtest/:id')
.get(function (req,res, next) {
    var id = req.params.id
    database.getTestById(id).then(function(result){
        res.send(result)
    }, next);
});

testsRouter.route('/hallflowtest/date/:year/:month')
.get(function (req,res, next) {
    var month = req.params.month
    var year = req.params.year
    database.getTestByTime(month, year).then(function(result){
        res.send(result)
    }, next);
});

testsRouter.route('/hallflowtest/date/:year')
.get(function (req,res, next) {
    var year = req.params.year
    database.getTestByYear(year).then(function(result){
        res.send(result)
    }, next);
});

testsRouter.route('/hallflowtest/filter/year/:year?/operator/:operatorId?/material/:materialId?')
.get(function (req,res, next) {
    var year = req.params.year
    var operatorId = req.params.operatorId
    var materialId = req.params.materialId

    database.getTestByParameters(year, operatorId, materialId).then(function(result){
        res.send(result)
    }, next);
});

testsRouter.post('/hallflowtest/create', jsonParser, function(req, res){
    var operatorId = req.body.operatorId
    var relativehumidity= req.body.relativehumidity
    var temperature = req.body.temperature 
    var tap = req.body.tap
    var  materialId = req.body.materialId
    var machineId = req.body.machineId

    database.createTest(operatorId, relativehumidity, temperature, tap, materialId,machineId).then(function(data){
            res.status(200).send("success");
        }, function (error) {
         console.log('Error from createPrint in print: ' + error);
     });
});

testsRouter.route('/hallflowtest/material/:id')
.get(function (req,res, next) {
    var id = req.params.id
    database.getTestByMaterialId(id).then(function(result){
        res.send(result)
    }, next);
});

testsRouter.route('/hallflowtest/operator/:id')
.get(function (req,res, next) {
    var id = req.params.id
    database.getTestByOperatorId(id).then(function(result){
        res.send(result)
    }, next);
});

module.exports = testsRouter;