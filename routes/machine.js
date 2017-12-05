var express = require('express')
var machineRouter = express.Router()
var database = require('../database.js')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

machineRouter.route('/machines')
.get(function (req,res, next) {
    var promises = [];
    promises.push(database.getMachines().then(function (data) {
        return data;
    }));
    Promise.all(promises).then(function (values) {
        var json = JSON.stringify({
            machinesApi: values[0]
        });
        res.end(json);
    });
 
});


machineRouter.route('/machine/:id')
.get(function (req,res, next) {
    var id = req.params.id
    database.getMachineById(id).then(function(result){
        res.send(result)
    }, next);
});

module.exports = machineRouter;