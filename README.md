# azure-repo
this is a submodel of the main repo soft-evo

# builds
'/builds' -> list of builds

'/build/:id' -> one build - parameter : build id

'/build/details/:id' -> get a list of build Ids - parameter: detail id

'/buildParts' -> list of buildParts

'/buildpart/:id'-> one buildParts - parameter : buildpart id

'/build/create'

- verb : POST

parameters : json ex ->  
{
"image": "",
"creationDate": "",
"comment" : ""
}

'/build/date/:year/:month' -> return all builds by month and year

'/build/date/:year/:month' -> return all builds year


# companies
'/companies' -> list of companies

'/company/:id' -> one comapny - parameter: company name

'/company/create'

- verb: POST

parameters : json ex -> 
{
"name" : "insert now"
}

# details
'/details' -> list of details

'/details/:id' -> one detail - parameter: detail id

'/details/companyId/:id' ->  one detail - parameter: companyId


'/details/projectId/:projectId' -> one detail - parameter: project id

'/details/build/:id' -> get a list of details Ids - parameter: buildId

'/details/date/:year/:month' -> return a list of details using the month and year

'/details/date/:year' -> return a list of details using year

'details/create'

- verb: POST

parameters : json ex -> 
{
"name" : "insert now",
"companyId": "5",
"projectId":"3",
"creationDate": "2017-11-6 14:26:00",
"comment" : "teststing insert"
}

# prints
'/prints' -> list of prints

'/print/:id' -> one print - parameter: print id

'/print/build/:id' -> one print - parameter: build id

'/print/machine/:id' -> one print - parameter: machine name

'/print/operator/:operatorId'-> one print - parameter: operatorId

'/print/date/:year/:month' -> return a list of prints using the month and year

'/print/date/:year' -> return a list of prints using the year

'/print/create' 

- verb: POST

parameters : json ex -> 
{
"buildsId":"6",
"startTime":"2017-11-6 14:26:00",
"endTime":"2017-11-10 14:26:00",
"operator": "insert moe",
"machine": "machine moe",
"powderWeightStart":"50",
"powderWeightEnd": "100",
"buildPlatformMaterial": "insert matierail",
"buildPlatformWeight": "530"
}


# buildparts

'/buildpart/:id' -> one print - parameter buildpart id

'/buildpart/create'

- verb : POST

parameters : json ex -> 
{
"buildDetailsId" : "", 
"partId":"" , 
"partComment" : ""
}

# file

'download/file/:id' -> one file to download

- verb : get

- parameter: file id

# Img
'/download/img/:id' -> one img to dowload
- verb : get
- parameter: img Id

# operator
'/operators' -> return all operatods

'/operator/:id'
- verb: get
- parameter: operator id

# tests

'/hallflowtests' -> return a list of tests

'/hallflowtest/:id' 
- verb: get
- parameter: test id

'/hallflowtest/date/:year/:month' -> return all the test using the month and the year

'/hallflowtest/date/:year' -> return all the test using the year


'/hallflowtest/create'
- verb: post
parameters : json ex -> 
{
"operartorId" : "int", 
"date":"datetime" , 
"relativehumidity" : "double",
"temperature" : "double",
"tap" : "string",
"measurementId" : "int",
"materialId":"int"
}

# material

'/materials' -> return all materials

'/material/:id'
- verb: get
- parameter: material id

'/material/pdf/:id' -> return a pdf file in JSON format

'/material/date/:year/:month' -> return materials by month & year

'/material/date/:year' -> return materials by the year


# measurement

'/measurements' -> return all measurements

'/measurement/:id' 
- verb: get
- parameter: measurement Id


# project

'api//projects' -> return all projects

'/project/:id' 
- verb: get
- parameter: projectId

# machine

'api/machines' -> return all machines

'api/machine/:id'
- verb: get
- parameter: machineId