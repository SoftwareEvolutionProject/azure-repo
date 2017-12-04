var express = require('express')
var operatorRouter = express.Router()
var database = require('../database.js')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

operatorRouter.route('/operators')
.get(function (req,res, next) {
    var promises = [];
    promises.push(database.getOperators().then(function (data) {
        return data;
    }));
    Promise.all(promises).then(function (values) {
        var json = JSON.stringify({
            operatorApi: values[0]
        });
        res.end(json);
    });
 
});


operatorRouter.route('/operator/:id')
.get(function (req,res, next) {
    var id = req.params.id
    database.getOperatorById(id).then(function(result){
        res.send(result)
    }, next);
});

module.exports = operatorRouter;