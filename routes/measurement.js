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

module.exports = measurementRouter;