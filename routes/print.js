var express = require('express')
var printsRouter = express.Router()
var database = require('../database.js')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()


printsRouter.route('/prints')
.get(function (req,res, next) {
    var promises = [];
    promises.push(database.getPrints().then(function (data) {
        return data;
    }));
    Promise.all(promises).then(function (values) {
        var json = JSON.stringify({
            printsApi: values[0]
        });
        res.end(json);
    });
 
});

printsRouter.route('/print/:id').get(function(req, res, next){
    var id = req.params.id
    database.getPrintById(id).then(function(print){
        res.send(print)
    }, next);
});

printsRouter.route('/print/build/:id').get(function(req, res, next){
    var id = req.params.id
    database.getPrintByBuildId(id).then(function(result){
        res.send(result)
    }, next);
});
printsRouter.route('/print/machine/:machine').get(function(req, res, next){
    var machine = req.params.machine
    database.getPrintByMachine(machine).then(function(result){
        res.send(result)
    }, next);
});
printsRouter.route('/print/operator/:operator').get(function(req, res, next){
    var operator = req.params.operator
    database.getPrintByOperator(operator).then(function(result){
        res.send(result)
    }, next);
});

printsRouter.post('/print/create', jsonParser, function(req, res){
    var buildsId = req.body.buildsId
    var startTime = req.body.startTime 
    var endTime= req.body.endTime
    var operator = req.body.operator 
    var machine = req.body.machine 
    var powderWeightStart = req.body.powderWeightStart
    var powderWeightEnd = req.body.powderWeightEnd
    var  buildPlatformMaterial = req.body.buildPlatformMaterial
    var buildPlatformWeight = req.body.buildPlatformWeight

    database.createPrint(buildsId, startTime, endTime, operator, machine, powderWeightStart,
        powderWeightEnd, buildPlatformMaterial, buildPlatformWeight).then(function(data){
            res.status(200).send("success");
        }, function (error) {
         console.log('Error from createPrint in print: ' + error);
     });
});

module.exports = printsRouter;