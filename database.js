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
    const query = 'select * from prints where machineId=?'
    return getDataByParameters(query,[machine])
}
function getPrintByOperator(operatorId){
    const query = 'select * from prints where operatorId=?'
    return getDataByParameters(query,[operatorId])
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
	const query = 'select * from file where id=?';
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

function getOperators(){
	const query = 'select * from operator'
	return getData(query)
}
function getOperatorById(operatorId){
	const query = 'select * from operator where id=?'
	return getDataByParameters(query, [operatorId])
}

function getMaterials(){
	const query = 'select * from material'
	return getData(query)
}

function getMaterialById(id){
	const query = 'select * from material where id=?'
	return getDataByParameters(query, [id])
}

function getTestsById(id){
	const query = 'select * from hallflowtests where id=?'
	return getDataByParameters(query, [id])
}

function getTests(){
	const query = 'select * from hallflowtests'
	return getData(query)
}

function getMeasurements(){
	const query = 'select * from measurement'
	return getData(query)
}
function getMeasurementById(id){
	const query = 'select * from measurement where id=?'
	return getData(query)
}
function getBuildsByDetailsId(id){
	const query = 'select * from builddetails where detailsId=?'
	return getDataByParameters(query, [id])
}
function getMachines(){
	const query = 'select * from machine'
	return getData(query)
}
function getMachineById(id){
	const query = 'select * from machine where id=?'
	return getDataByParameters(query,[id])
}
function getProjects(){
	const query = 'select * from project'
	return getData(query)
}
function getProjectById(id){
	const query = 'select * from project where id=?'
	return getDataByParameters(query,[id])
}

function getTestByTime(month,year){
	const query = 'select * from hallflowtests where MONTH(date)=? AND YEAR(date)=? '
	return getDataByParameters(query,[month,year])
}

function getMaterialByTime(month,year){
	const query = 'select * from material where MONTH(createdDate)=? AND YEAR(createdDate)=?'
	return getDataByParameters(query,[month,year])
}

function getBuildsByTime(month,year){
	const query = 'select * from builds where MONTH(creationDate)=? AND YEAR(creationDate)=?'
	return getDataByParameters(query,[month,year])
}
function getDetailsByTime(month,year){
	const query = 'select * from details where MONTH(creationDate)=? AND YEAR(creationDate)=?'
	return getDataByParameters(query,[month,year])
}
function getPrintsByTime(month,year){
	const query = 'select * from prints where MONTH(startTime)=? AND YEAR(startTime)=?'
	return getDataByParameters(query,[month,year])
}

function getTestByYear(year){
	const query = 'select * from hallflowtests where YEAR(date)=? '
	return getDataByParameters(query,[year])
}

function getMaterialByYear(year){
	const query = 'select * from material where YEAR(createdDate)=?'
	return getDataByParameters(query,[year])
}

function getBuildsByYear(year){
	const query = 'select * from builds where YEAR(creationDate)=?'
	return getDataByParameters(query,[year])
}
function getDetailsByYear(year){
	const query = 'select * from details where YEAR(creationDate)=?'
	return getDataByParameters(query,[year])
}
function getPrintsByYear(year){
	const query = 'select * from prints where YEAR(startTime)=?'
	return getDataByParameters(query,[year])
}

function getPrintsByParameters(year, operatorId, machineId){

	if(year === undefined){
		const query = 'select * from prints where operatorId=? AND machineId=? '
		return getDataByParameters(query,[operatorId, machineId])
	}
	if(operatorId===undefined){
		const query = 'select * from prints where YEAR(startTime)=? AND machineId=? '
		return getDataByParameters(query,[year, machineId])
	}
	if(machineId===undefined){
		const query = 'select * from prints where YEAR(startTime)=? AND operatorId=?'
		return getDataByParameters(query,[year, operatorId])
	}
	const query = 'select * from prints where YEAR(startTime)=? AND operatorId=? AND machineId=? '
	return getDataByParameters(query,[year, operatorId, machineId])
}

function getDetailsByFilter (year, companyId, projectId){
	if(projectId === undefined){
		const query = 'select * from details where YEAR(creationDate)=? AND companyId=?'
		return getDataByParameters(query,[year, companyId])
	} 
	if(companyId === undefined){
		const query = 'select * from details where YEAR(creationDate)=? AND projectId=?'
		return getDataByParameters(query,[year, projectId])
	}
	if(year === undefined){
		const query = 'select * from details where companyId=? AND projectId=?'
		return getDataByParameters(query,[companyId, projectId])
	}
	if (companyId != undefined && projectId != undefined && year!=undefined){		
		const query = 'select * from details where YEAR(creationDate)=? AND companyId=? AND projectId=?'
		return getDataByParameters(query,[year, companyId, projectId])
	}

}

function getTestByParameters(year, operatorId, materialId){
	if(year===undefined){
		const query = 'select * from hallflowtests where operatorId=? AND materialId=? '
		return getDataByParameters(query,[operatorId, materialId])
	}
	if(operatorId===undefined){
		const query = 'select * from hallflowtests where YEAR(date)=? AND materialId=? '
		return getDataByParameters(query,[year, materialId])
	}
	if(materialId===undefined){
		const query = 'select * from hallflowtests where YEAR(date)=? AND operatorId=?'
		return getDataByParameters(query,[year, operatorId])
	}
	const query = 'select * from hallflowtests where YEAR(date)=? AND operatorId=? AND materialId=? '
	return getDataByParameters(query,[year, operatorId, materialId])
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

function createTest(operatorId,date,relativehumidity,temperature,tap,materialId){
	var queryString = 'INSERT INTO hallflowtests (operatorId, date, relativehumidity, temperature, tap, materialId) VALUES(?, ?, ?, ?, ?, ?, ?);';	
	return createObject(queryString,[operatorId, date, relativehumidity, temperature, tap, measurementId,
		materialId])
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
exports.getMaterials = getMaterials
exports.getMaterialById =getMaterialById
exports.getTestsById = getTestsById
exports.getTests = getTests
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
exports.getDetailsByBuildId = getDetailsByBuildId
exports.getImgById = getImgById
exports.getOperators = getOperators
exports.getOperatorById = getOperatorById
exports.getMeasurements =  getMeasurements
exports.getMeasurementById = getMeasurementById
exports.createTest = createTest
exports.getFileById = getFileById
exports.getBuildsByDetailsId = getBuildsByDetailsId
exports.getMachines = getMachines
exports.getMachineById = getMachineById
exports.getProjectById = getProjectById
exports.getProjects = getProjects
exports.getTestByTime = getTestByTime
exports.getMaterialByTime = getMaterialByTime
exports.getBuildsByTime = getBuildsByTime
exports.getDetailsByTime = getDetailsByTime
exports.getPrintsByTime = getPrintsByTime
exports.getTestByYear = getTestByYear
exports.getMaterialByYear = getMaterialByYear
exports.getBuildsByYear = getBuildsByYear
exports.getDetailsByYear = getDetailsByYear
exports.getPrintsByYear = getPrintsByYear
exports.getPrintsByParameters = getPrintsByParameters
exports.getDetailsByFilter = getDetailsByFilter
exports.getTestByParameters = getTestByParameters
