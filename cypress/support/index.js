// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

//Set base URL from the environment variable that was set
Cypress.config("baseUrl", Cypress.env("baseUrl"));

const users = Cypress.env("users");
const admin_user = users['admin']['user'];
const admin_pass = users['admin']['pass'];

before(() => {
      //Clear out the cookies
    cy.clearCookie('PHPSESSID');

    //Create the initial database structure
    cy.mysql_db('structure');
  
    //Set the Base URL in the REDCap Configuration Database
    const base_url = 'BASE_URL/' + Cypress.env('baseUrl').replace('http://', 'http\\:\\\\/\\\\/');

    //Seeds the database before each test
    cy.mysql_db('seeds', base_url);


    //Logs in before each test
    cy.login( { username: admin_user, password: admin_pass } );

});

beforeEach(() => {

});

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
});
