const statusCode = require('http-status-codes')
const expect = require('chai').expect

class parseResponse {
    constructor(attach, log, parameters){
        this.attach = attach,
        this.log = log
        this.parameters = parameters
    }

    async validateHttpStatusCode(responseStatusCode, statusTextSupplied){
        //this.attach('StatusText returned from the server is : '+responseStatusCode)
        const statusRetrieved = await statusCode[JSON.parse(statusTextSupplied).toUpperCase().replace(' ', '_')]
        //console.log('Status ret is :: '+ statusRetrieved)
        expect(responseStatusCode).to.equal(statusRetrieved)
    }

    getIdFromResponseBasedOnEmailId(response, emailId){
        //console.log('Response retrieved is : '+JSON.stringify(response))
        for(let i=0; i<Object.keys(response).length; i++){
            if(response[i].email == emailId){
                return response[i].id
            }
        }
    }

}
module.exports = parseResponse;