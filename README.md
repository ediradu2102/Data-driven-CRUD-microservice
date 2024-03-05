# Data-driven-CRUD-microservice
JavaScript app that provides CRUD operations for Projects in a database

The app uses Node.js, Javascript, and a SQLite database where IT Projects can be saved.

How to use: 

Node.JS must be installed from the official website: https://nodejs.org/en/download
For handling HTTP requests express will have to be installed by typing the following command in the terminal:
npm install express
For interacting with the database SQLlite3 will also have to be installed by typing the following command in the terminal:
npm install sqlite3

The program can be started by typing the command:
node src/app.js

If the connection to the database was successful, the message "Connected to the IT projects database" should show up.

Once the application is started the following commands can be typed in Postman (or on the Web, however, no front-end side was built for this project) :

To see all the existing projects in the database:
GET: http://localhost:3000/api/projects/all

To see any one existing project in the database:
GET: http://localhost:3000/api/projects/{id}

To create a new project in the database type:
POST: http://localhost:3000/api/projects/new
In the Body (select raw and JSON) type the desired information
Example:
{
  "PROJECT_NAME": "Alfa",
  "START_DATE": "2024-02-01",
  "TARGET_END_DATE": "2024-12-31",
  "ACTUAL_END_DATE": "2024-11-31",
  "CREATED_BY": "Edi",
  "MODIFIED_BY": "Edi"
}
(CREATED_ON and MODIFIED_ON will be automatically set to today if not specified otherwise)

To edit an existing project in the database type:
PUT: http://localhost:3000/api/projects/update/{id}
In the Body (select raw and JSON) type the desired information and that project will be changed accordingly:
Example:
{
  "PROJECT_NAME": "AlfaBeta",
  "START_DATE": "2024-02-01",
  "TARGET_END_DATE": "2024-12-31",
  "ACTUAL_END_DATE": "2024-11-31",
  "CREATED_BY": "Edi",
  "MODIFIED_BY": "Ana"
}
(ODIFIED_ON will be automatically set to today if not specified otherwise)

And finally, to delete an existing project type:
http://localhost:3000/api/projects/delete/{id}

({id} should always be replaced with the desired id)
