var { Given, When, Then } = require('@cucumber/cucumber')
const expect = require('chai').expect

Given(/^the mandatory request headers are set$/, function(){
    let headers = this.dataStore.retrieveRequestHeaders(this.getScenarioName())
    //console.log('Headers fetched are : '+JSON.stringify(headers))
    return headers
})

Given(/^the request query params are set$/, function(){
    let queryParams = this.dataStore.retrieveRequestQueryParams(this.getScenarioName())
    //console.log('Request Query Params are : '+JSON.stringify(queryParams))
    return queryParams
})

When(/^I send GET Request with URI (.*)$/, function(uri){
    uri = JSON.parse(uri)
    return this.sendRequest(uri, 'GET')
})

When(/^I send POST Request to create user with URI (.*)$/, function(uri){
    uri = JSON.parse(uri)
    let updatedName = this.dataStore.retrieveValueFromMatchingKeyBasedOnScenarioName(this.getScenarioName(), 'name')
    let createUser = this.dataStore.retrieveRequestBasedOnMatchingKey("createUserRequest")
    createUser.name = updatedName
    this.attach('Request Body is : '+JSON.stringify(createUser))
    return this.sendRequest(uri, 'POST', createUser)
})

When(/^I send PATCH Request to create user with URI (.*)$/, function(uri){
    uri = JSON.parse(uri)
    //fetch `id` from the previous response
    let emailId = this.dataStore.retrieveValueFromMatchingKeyBasedOnScenarioName(this.getScenarioName(), 'email')
    let id = this.parseResponse.getIdFromResponseBasedOnEmailId(this.getResponseData(), emailId)
    //console.log('Retrieved Id is : '+id)
    let updatedName = this.dataStore.retrieveValueFromMatchingKeyBasedOnScenarioName(this.getScenarioName(), 'name')
    let updateUserRequest = this.dataStore.retrieveRequestBasedOnMatchingKey("updateUserRequest")
    updateUserRequest.name = updatedName
    this.attach('Request Body is : '+JSON.stringify(updateUserRequest))
    return this.sendRequest(uri +'/' + id + '/', 'PATCH', updateUserRequest)
})

When(/^I send DELETE Request to create user with URI (.*)$/, function(uri){
    uri = JSON.parse(uri)
    //fetch `id` from the previous response
    let emailId = this.dataStore.retrieveValueFromMatchingKeyBasedOnScenarioName(this.getScenarioName(), 'email')
    let id = this.parseResponse.getIdFromResponseBasedOnEmailId(this.getResponseData(), emailId)
    //console.log('Retrieved Id is : '+id)
    return this.sendRequest(uri +'/' + id + '/', 'DELETE')
})

Then(/^response body should have (.*)$/, function(expression){
    let response = JSON.stringify(this.getResponseData())
    this.attach('Response returned from server is : '+JSON.stringify(response))
    expect(response).to.include(expression)
})

Then(/^http status returned from the server should be (.*)$/, function(statusText){
    this.attach('Response returned from server is : '+JSON.stringify(this.getResponseData()))
    return this.parseResponse.validateHttpStatusCode(this.getResponseStatusCode(), statusText)
} )

When(/^I validate swagger for the (.*) model$/, function(modelObjectToValidate){
    this.attach('Response returned from server is : '+JSON.stringify(this.getResponseData()))
    return this.swagger.validateSwagger(this.getResponseData(), modelObjectToValidate)
} )