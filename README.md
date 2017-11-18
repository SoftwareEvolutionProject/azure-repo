# azure-repo
this is a submodel of the main repo soft-evo

# builds
'/builds' -> list of builds

'/build/:id' -> one build - parameter : build id

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

'/details/build/:id' -> get a list of details - parameter: buildId

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

'/print/operator/:id'-> one print - parameter: operator name

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