var mysql = require('mysql');
Q = require('q');
var pool;
pool = mysql.createPool({
    connectionLimit: 10,
    host: 'us-cdbr-azure-southcentral-f.cloudapp.net',
    user: 'bfd2e734428b9e',
    database: 'mo3db',
    password: 'b7514c26',
    //charset			: 'latin1_swedish_ci',
    charset: 'utf8',
    timezone: 'Europe/Stockholm'
});

function getDetails(){
    return getData('select * from details')
}

function getPrints(){
    return getData('select * from prints')
}
function getBuilds(){
    return getData('select * from builds')
}
function getBuildParts(){
    return getData('select * from buildparts')
}

function getCompanies(){
    return getData('select * from companies')
}

function getDetailsById(detailsId){
    const query = 'select * from details where id=?'
    return getDataByParameters(query, [detailsId])
}
function getDetailsByCompanyId(companyId){
    const query = 'select * from details where companyId=?'
    return getDataByParameters(query, [companyId])
}
//TOFIX 
function getDetailsByOriginalFileName(fileName){
    const query = 'select * from details where originaleFileName=?'
    return getDataByParameters(query, [fileName])
}
function getDetailsByProjectId(projectId){
    const query = 'select * from details where projectId=?'
    return getDataByParameters(query, [projectId])
}
function getBuildById(buildId){
    const query = 'select * from builds where id=?'
    return getDataByParameters(query,[buildId])
}

function getPrintById(printId){
    const query = 'select * from prints where id=?'
    return getDataByParameters(query,[printId])
}
function getPrintByBuildId(buildId){
    const query = 'select * from prints where buildsId=?'
    return getDataByParameters(query,[buildId])
}
function getPrintByMachine(machine){
    const query = 'select * from prints where machine=?'
    return getDataByParameters(query,[machine])
}
function getPrintByOperator(operator){
    const query = 'select * from prints where operator=?'
    return getDataByParameters(query,[operator])
}

function getBuildPartsById(id){
    const query = 'select * from buildparts where id=?'
    return getDataByParameters(query, [id])
}
function getCompanyById(id){
    const query = 'select * from companies where id=?'
    return getDataByParameters(query, [id])
}

function getFileById(fileId){
	const query = 'select * from file where id=?'
	return getDataByParameters(query, [fileId])
}

function getImgById(imgId){
	const query = 'select * from img where id=?'
	return getDataByParameters(query, [imgId])
}

function getDetailsByBuildId(buildId){
	const query = 'select * from builddetails where buildId=?'
	return getDataByParameters(query, [buildId])
}
function getData(sqlQuery){
	var deferred = Q.defer();
	pool.getConnection(function (err, connection) {
		if (err) {
			console.log(err);
			var dbError = new Error('No db connection');
			console.log(dbError);
		}
		else {
			console.log(sqlQuery);
			connection.query(sqlQuery, function (err, rows) {
				if (err) {
					console.log(err);
					deferred.reject(err);
				}
				else if (rows.length === 0) {
					var countError = new Error('no rows');
					deferred.reject(countError);
				}
				else {
					deferred.resolve(rows);
				}
				connection.release();
			});
		}
	});
	return deferred.promise;
}


function getDataByParameters(sqlQuery, arrayOfParameters){ 
	var deferred = Q.defer();
	pool.getConnection(function (err, connection) {
		if (err) {
			console.log(err);
			var dbError = new Error('No db connection');
			console.log(dbError);
		}
		else {
			connection.query(sqlQuery, arrayOfParameters, function (err, rows) {
				if (err) {
					deferred.reject(err);
				}
				else {
					deferred.resolve(rows);
				}
				connection.release();
			});
		}
	});
	return deferred.promise;
}

function createPrint(buildsId, startTime, endTime, operator, machine, powderWeightStart,
	powderWeightEnd, buildPlatformMaterial, buildPlatformWeight){
	
		var queryString = 'INSERT INTO prints (buildsId, startTime, endTime, operator, machine, powderWeightStart, powderWeightEnd, buildPlatformMaterial, buildPlatformWeight) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);';	
		return createObject(queryString,[buildsId, startTime, endTime, operator, machine, powderWeightStart,
			powderWeightEnd, buildPlatformMaterial, buildPlatformWeight])
}
function createBuild(image, creationDate,comment){
	var queryString = 'INSERT INTO builds (imageId, creationDate, comment) VALUES(?, ?, ?);'
	return createObject(queryString, [imageId,creationDate,comment])
}

function createBuildParts(buildDetailsId, partId, partComment){
	var queryString = 'INSERT INTO buildparts (buildDetailsId, partId, partComment) VALUES(?, ?, ?);'
	return createObject(queryString, [buildDetailsId, partId, partComment])
}

function createCompanies(name){
	var queryString = 'INSERT INTO companies (name) VALUES(?);'
	return createObject(queryString, [name])
}

function createDetails(name, companyId, fileId, projectId, creationDate, comment){
	var queryString = 'INSERT INTO details (name, companyId, fileId, projectId, creationDate, comment) VALUES(?, ?, ?, ?, ?, ?);'
	return createObject(queryString, [name, companyId, fileId, projectId, creationDate, comment])
}
function createObject(sqlQuery, arrayOfParameters){
	var deferred = Q.defer();
	pool.getConnection(function (err, connection) {
		if (err) {
			console.log(err);
			var dbError = new Error('No db connection');
			console.log(dbError);
		}
		else {
			console.log("connected...")
			connection.query(sqlQuery, arrayOfParameters, function (err, rows) {
				if (err) {
					deferred.reject(err);
					console.log("Error1: " + err);
				}
				else {
					if (err) {
						deferred.reject(err);
					}
					else {
						deferred.resolve(rows);
					}
				}
				connection.release();
			});
		}
	});
	return deferred.promise;
}

exports.getDetails = getDetails
exports.getPrints = getPrints
exports.getBuilds = getBuilds
exports.getBuildParts = getBuildParts
exports.getCompanies = getCompanies
exports.getDetailsById = getDetailsById
exports.getDetailsByCompanyId = getDetailsByCompanyId
exports.getDetailsByOriginalFileName = getDetailsByOriginalFileName
exports.getDetailsByProjectId = getDetailsByProjectId
exports.getBuildById = getBuildById
exports.getPrintById = getPrintById
exports.getPrintByBuildId = getPrintByBuildId
exports.getPrintByMachine = getPrintByMachine
exports.getPrintByOperator = getPrintByOperator
exports.getBuildPartsById = getBuildPartsById
exports.getCompanyById = getCompanyById
exports.createPrint = createPrint
exports.createBuild = createBuild
exports.createBuildParts = createBuildParts
exports.createCompanies = createCompanies
exports.createDetails = createDetails
exports.getFileById = getFileById
exports.getDetailsByBuildId = getDetailsByBuildId
exports.getImgById = getImgById