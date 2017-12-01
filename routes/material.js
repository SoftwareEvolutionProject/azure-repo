var express = require('express')
var materialRouter = express.Router()
var database = require('../database.js')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

materialRouter.route('/materials')
.get(function (req,res, next) {
    var promises = [];
    promises.push(database.getMaterials().then(function (data) {
        return data;
    }));
    Promise.all(promises).then(function (values) {
        var json = JSON.stringify({
            printsApi: values[0]
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

module.exports = materialRouter;