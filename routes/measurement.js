var express = require('express')
var measurementRouter = express.Router()
var database = require('../database.js')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

measurementRouter.route('/measurements')
.get(function (req,res, next) {
    var promises = [];
    promises.push(database.getMeasurements().then(function (data) {
        return data;
    }));
    Promise.all(promises).then(function (values) {
        var json = JSON.stringify({
            measurementsApi: values[0]
        });
        res.end(json);
    });
 
});


measurementRouter.route('/measurement/:id')
.get(function (req,res, next) {
    var id = req.params.id
    database.getMeasurementById(id).then(function(result){
        res.send(result)
    }, next);
});


measurementRouter.route('/measurements/hallflowtest/:id')
.get(function (req,res, next) {
    var id = req.params.id
    database.getMeasurementByTestId(id).then(function(result){
        res.send(result)
    }, next);
});

measurementRouter.post('/measurement/create', jsonParser, function(req, res){
    var measValue = req.body.measValue
    var hallflowtestId = req.body.hallflowtestId

    console.log(req.body)
    database.createMeasurement(measValue, hallflowtestId).then(function(data){
            res.status(200).send(data);
        }, function (error) {
         console.log('Error from createPrint in print: ' + error);
     });
});

module.exports = measurementRouter;