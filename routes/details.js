var express = require('express')
var details = express.Router()
var database = require('../database.js')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

details.route('/details')
.get(function (req,res, next) {
    var promises = [];
    promises.push(database.getDetails().then(function (data) {
        return data;
    }));
    Promise.all(promises).then(function (values) {
        var json = JSON.stringify({
            detailsApi: values[0]
        });
        res.end(json);
    });
 
});

details.route('/details/:id').get(function(req, res, next){
    var detailsId = req.params.id
    database.getDetailsById(detailsId).then(function(detail){
        res.send(detail)
    }, next);
});

// TOFIX
details.route('/details/companyId/:id').get(function(req, res, next){
    var companyId = req.params.id
    database.getDetailsByCompanyId(companyId).then(function(detail){
        res.send(detail)
    }, next);
});

details.route('/details/projectId/:projectId').get(function(req, res, next){
    var projectId = req.params.projectId
    database.getDetailsByProjectId(projectId).then(function(detail){
        res.send(detail)
    }, next);
});

details.post('/details/create', jsonParser, function(req, res){
    var name = req.body.name
    var companyId = req.body.companyId
    var fileId = req.body.fileId
    var projectId = req.body.projectId
    var comment = req.body.comment

    database.createDetails(name, companyId, fileId, projectId, comment).then(function(data){
        res.status(200).send("success");        
    }, function(error){
        console.log('Error from createDetails in details: ' + error);        
    });
});

details.route('/details/build/:id').get(function(req, res, next){
    var buildId = req.params.id
    database.getDetailsByBuildId(buildId).then(function(details){
        res.send(details)
    }, next)
});

details.route('/details/date/:year/:month')
.get(function (req,res, next) {
    
    var month = req.params.month
    var year = req.params.year
    database.getDetailsByTime(month,year).then(function(result){      
        res.send(result)
    }, next);
});

details.route('/details/date/:year')
.get(function (req,res, next) {
    var year = req.params.year
    database.getDetailsByYear(year).then(function(result){      
        res.send(result)
    }, next);
});

details.route('/details/filter/year/:year?/company/:companyId?/project/:projectId?')
.get(function (req,res, next) {
    var year = req.params.year
    var companyId = req.params.companyId
    var projectId = req.params.projectId
    
    database.getDetailsByFilter(year, companyId, projectId).then(function(result){      
        res.send(result)
    }, next);
});

module.exports = details;