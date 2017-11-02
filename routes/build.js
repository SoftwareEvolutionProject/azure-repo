var express = require('express')
var buildsRouter = express.Router()
var database = require('../database.js')
var bodyParser = require('body-parser') 
var jsonParser = bodyParser.json()

buildsRouter.route('/builds')
.get(function (req,res, next) {
    var promises = [];
    promises.push(database.getBuilds().then(function (data) {
        return data;
    }));
    Promise.all(promises).then(function (values) {
        var json = JSON.stringify({
            buildsApi: values[0]
        });
        res.end(json);
    });
 
});

buildsRouter.route('/build/:id').get(function(req, res, next){
    var id = req.params.id
    database.getBuildById(id).then(function(build){
        res.send(build)
    }, next);
});

buildsRouter.post('/build/create',jsonParser, function(req, res){
    var image = req.body.image 
    var creationDate = req.body.creationDate
    var comment = req.body.comment

    database.createBuild(image, creationDate,comment).then(function(data){
        res.status(200).send("success");
    }, function(error){
        console.log('Error from createbuild in build: ' + error);        
    });
});

module.exports = buildsRouter;