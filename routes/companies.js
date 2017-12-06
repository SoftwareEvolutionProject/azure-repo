var express = require('express')
var companyRouter = express.Router()
var database = require('../database.js')
var bodyParser = require('body-parser') 
var jsonParser = bodyParser.json()

companyRouter.route('/companies')
.get(function (req,res, next) {
    var promises = [];
    promises.push(database.getCompanies().then(function (data) {
        return data;
    }));
    Promise.all(promises).then(function (values) {
        var json = JSON.stringify({
            companiesApi: values[0]
        });
        res.end(json);
    });
 
});

companyRouter.route('/company/:id').get(function(req, res, next){
    var companyId = req.params.id
    database.getCompanyById(companyId).then(function(result){
        res.send(result)
    }, next);
});

companyRouter.post('/company/create', jsonParser, function(req, res){
    var name = req.body.name
    database.createCompanies(name).then(function(data){
        res.status(200).send("success");        
    }, function(error){
        console.log('Error from createCompanies in company: ' + error);        
    });
});
module.exports = companyRouter;