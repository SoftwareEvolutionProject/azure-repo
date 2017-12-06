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

testsRouter.route('/hallflowtest/time/:year/:month')
.get(function (req,res, next) {
    var month = req.params.month
    var year = req.params.year
    database.getTestByTime(month, year).then(function(result){
        res.send(result)
    }, next);
});

testsRouter.route('/hallflowtest/time/:year')
.get(function (req,res, next) {
    var year = req.params.year
    database.getTestByYear(year).then(function(result){
        res.send(result)
    }, next);
});

testsRouter.post('/hallflowtest/create', jsonParser, function(req, res){
    var operatorId = req.body.operatorId
    var date = req.body.date 
    var relativehumidity= req.body.relativehumidity
    var temperature = req.body.temperature 
    var tap = req.body.tap
    var measurementId = req.body.measurementId
    var  materialId = req.body.materialId

    console.log(req.body)
    database.createTest(operatorId, date, relativehumidity, temperature, tap,
        measurementId, materialId).then(function(data){
            res.status(200).send("success");
        }, function (error) {
         console.log('Error from createPrint in print: ' + error);
     });
});

module.exports = testsRouter;