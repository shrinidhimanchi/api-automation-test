@test
@rerun
Feature: Test sample

    Background: Set Mandatory Headers & Parameters
        Given the mandatory request headers are set
        Given the request query params are set
        When I send GET Request with URI "public/v2/users"
        Then http status returned from the server should be "OK"
        When I send DELETE Request to create user with URI "public/v2/users"

    Scenario: Test GET Request HTTP end-point
        When I send GET Request with URI "public/v2/users"
        Then http status returned from the server should be "OK"
        Then response body should have "id"
        And response body should have "name"
        And response body should have "email"
        And response body should have "gender"
        And response body should have "status"

    Scenario: Test POST Request HTTP end-point
        When I send POST Request to create user with URI "public/v2/users"
        Then http status returned from the server should be "Created"
        Then response body should have "id"
        And response body should have "name"
        And response body should have "email"
        And response body should have "gender"
        And response body should have "status"

    Scenario: Test PATCH Request HTTP end-point
        When I send POST Request to create user with URI "public/v2/users"
        Then http status returned from the server should be "Created"
        When I send GET Request with URI "public/v2/users"
        Then http status returned from the server should be "OK"
        When I send PATCH Request to create user with URI "public/v2/users"
        Then http status returned from the server should be "OK"
        Then response body should have "id"
        And response body should have "name"
        And response body should have "email"
        And response body should have "gender"
        And response body should have "status"

    Scenario: Test DELETE Request HTTP end-point
        When I send POST Request to create user with URI "public/v2/users"
        Then http status returned from the server should be "Created"
        When I send GET Request with URI "public/v2/users"
        Then http status returned from the server should be "OK"
        When I send DELETE Request to create user with URI "public/v2/users"
        Then http status returned from the server should be "NO_CONTENT"
