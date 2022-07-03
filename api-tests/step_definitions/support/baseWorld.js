const { setWorldConstructor, World, Before, After, setDefaultTimeout } = require('@cucumber/cucumber')
const axiosPromise = require('axios')
const parseResponse = require('./parseResponse')
const envConfiguration = require('./envConfiguration')
const envConfig = new envConfiguration()
const dataStore = require('./dataStore')
const swagger = require('./swagger')
let scenarioName
function timeOut(){
    setDefaultTimeout(60 * 1000)
}
timeOut()

Before(function(scenario){
    this.log('Execute Before Hook')
    console.log('Start of the Scenario : '+ scenario.pickle.name.toUpperCase())
    scenarioName = scenario.pickle.name
    console.log('Execution Start Time is : '+new Date().toTimeString())
    this.attach('Execution Start Time is : '+new Date().toTimeString())
})

After(function(scenario){
    this.log('Execute After Hook')
    console.log('End of the Scenario : '+ scenario.pickle.name.toUpperCase())
    console.log('Execution End Time is : '+new Date().toTimeString())
    this.attach('Execution End Time is : '+new Date().toTimeString())
})

class baseWorld extends World {
    constructor({ attach, log, parameters }){
        super({ attach, log, parameters })
        this.attach = attach
        this.log = log
        this.parameters = parameters
        this.res = {}
        this.parseResponse = new parseResponse(attach, log, parameters)
        this.dataStore = new dataStore(attach, log, parameters)
        this.swagger = new swagger(attach, log, parameters, this.dataStore)
    }

    _setHostUri(){
        return envConfig.getHost()
    }

    _setOptionsForRequestPromise(uri, method, body){
        
        return {
            uri: this._setHostUri() +  uri,
            method: method, 
            body: (body ? body: {}),
            headers: this.dataStore.getHeaders(),
            json: true,
            resolveWithFullResponse: true, 
            qs: this.dataStore.getQueryParams()
        }
    }

    _setOptionsForAxios(uri, method, body){
        return {
            url: this._setHostUri() +  uri,
            method: method, 
            data: (body ? body: {}),
            headers: this.dataStore.getHeaders(),
            responseType: 'json',
            params: this.dataStore.getQueryParams(),
            responseEncoding: 'utf8',
            validateStatus: function(status){
                return status >= 200  && status <= 500
            }
        }
    }

    async sendRequest(uri, method, body){
        const options = this._setOptionsForAxios(uri, method, body)
        this.attach('Request Details: '+ JSON.stringify({"URI: ": options.url, "Request Body: ": options.data,
        "Request Method: ": options.method, "Request Headers: ": options.headers, "Request QueryParams: ": options.params}))
        this.res = await axiosPromise(options)
        this.attach('Response provided by the server is : '+JSON.stringify(this.res.data))
        this.attach('HTTP Status Code received from the server response is : '+this.res.status)
        this.attach('HTTP Status Message received from the server response is : '+this.res.statusText)
        this.attach('Headers received from the Server Response is : '+JSON.stringify(this.res.headers))
        this.attach('Request Configs set are : '+JSON.stringify(this.res.config))
        return this.res
    }

    getResponseData(){
        return this.res.data
    }

    getResponseStatusText(){
        this.attach('Response Status Text is : '+this.res.statusText)
        return this.res.statusText
    }

    getResponseStatusCode(){
        this.attach('Response Status Code is : '+this.res.status)
        return this.res.status
    }

    getScenarioName(){
        return scenarioName
    }


};
setWorldConstructor(baseWorld)