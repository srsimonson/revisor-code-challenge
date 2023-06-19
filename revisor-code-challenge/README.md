# Installation instructions

[x] install Node.js if needed at https://nodejs.org/en/download/
[x] navigate to the project top level (the folder `package.json` is in) and type `npm install`
[x] cd into `/server` type `node index.js`. You should see a message that the server is running.
[] leave the server running when you work on your code challenge. you don't need to modify the server in any way.
[] when you are ready to submit, delete the `node_modules` folder.

# PDF Instructions

Make a registration form web page.
Refrain from using any 3rd party libraries.
Included is a node.js web service to use for one of the page elements.

## Form contains the following elements:

[x] A required field for the usesr to provide their full name
    [x] restricted to max 100 characters
    [x] only allow alpha, spaces, hyphens, apostrophes
    [x] if it doesn't validate, place a red error message near the field name

[x] A required field for the user to provide their email address
    [x] validate that the email address is of the correct format

[] An optional field for the user to select a person from a list that is referred them
    [x] On page load, populate the list of people from a call to the provided web service (http://localhost:3000/users)
    [x] Sort the list of people alphabetically by their last name which appears in the "name" attibute of the returned JSON objects
    [x] Use the "name" attribute as the display that the user will use to select
    [x] Use the associated "id" attribute as the value submitted by the registration form
    [] Provide an option to choose "other." If a user selects "other," insert a labeled field for the user to enter the name of the person who referred them
    [] The inserted "other referrer field should behave the same way as the name field for item 1.

[] A submit button

[] Form submits a POST request to http://localhost:3000/submit with the following POST parameters:
    [] name containing the user's name
    [] email containing the user's email address
    [] referrer containing the id number of the person that referred the user

## Design

See `Instructions.pdf`

[x] The Revisor's Office is a nonpartisan office of the Minnesota Legislature. The office provides
confidential drafting services of legislative and administrative documents. Since its founding in
1939, the office has served as the compiler of Minnesota Statutes and is the official publisher of
Minnesota Statutes, Laws, and Rules.

## Submission Format

[] Include all code for evaluation in the revisor-code-challenge directory.
[] Form page should be located in the root revisor-code-challenge directory.
    [] filename of index.html
[] TEST:
    [] Open that HTML page in a web browser
[] Compress the folder and attach it to your response email.