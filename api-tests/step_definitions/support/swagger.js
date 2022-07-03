const swaggerValidator = require('swagger-object-validator')

class swagger {
    constructor(attach, log, parameters, dataStore){
        this.attach = attach
        this.log = log
        this.parameters = parameters
        this.swaggerPath = __dirname + '/../../requests/swaggerSpec.yml'
        this.responseObject = {}
        this.dataStore = dataStore
    }

    async validateSwagger(apiResponseObject, modelObjectToValidate){
        var validator = new swaggerValidator.Handler(this.swaggerPath)
        this.responseObject = await validator.validateModel(apiResponseObject, modelObjectToValidate)
        if(Object.keys(this.responseObject.errors).length == 0){
            return this.responseObject
        } else {
            console.log('Error Object is : '+ JSON.stringify(this.responseObject.errors))
            throw {
                message: "Swagger Object Validation Failed", object: JSON.stringify(this.responseObject.errors)
            }
        }
    }
}
module.exports = swagger