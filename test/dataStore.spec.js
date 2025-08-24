const { expect } = require('chai');
const DataStore = require('../api-tests/step_definitions/support/dataStore');

describe('dataStore', () => {
  it('throws a descriptive error when scenario is missing', () => {
    process.env.NODE_ENV = 'testing';
    const ds = new DataStore(() => {}, () => {}, {});
    const missingScenario = () => ds.retrieveRequestHeaders('Unknown Scenario');
    expect(missingScenario).to.throw(Error, "Scenario Name doesn't exist");
  });
});
