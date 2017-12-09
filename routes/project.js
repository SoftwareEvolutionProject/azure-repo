var express = require('express')
var projectRouter = express.Router()
var database = require('../database.js')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

projectRouter.route('/projects')
.get(function (req,res, next) {
    var promises = [];
    promises.push(database.getProjects().then(function (data) {
        return data;
    }));
    Promise.all(promises).then(function (values) {
        var json = JSON.stringify({
            projectApi: values[0]
        });
        res.end(json);
    });
 
});

projectRouter.route('/project/:id')
.get(function (req,res, next) {
    var id = req.params.id
    database.getProjectById(id).then(function(result){
        res.send(result)
    }, next);
});

projectRouter.post('/project/create', jsonParser, function(req, res,next){
    var project = req.body.project

    database.createProject(project).then(function(data){
        console.log(data)
            res.status(200).send(data);
        }, function (error) {
         console.log('Error from createPrint in print: ' + error);
     }, next);
});


module.exports = projectRouter;