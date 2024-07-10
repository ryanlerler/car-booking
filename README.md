# fc-test

## Application architecture: MVC

The Model logical component in the MVC refers to the structure of data in the application, and is the component responsible for manipulating data in the database. I used the Sequelize library to power the model architecture, while the business logic is tied to the controller.

View refers to application UI. MVC distinguishes between “view logic” and “application logic”. View logic determines how data should be rendered and formatted, e.g. transforming data format without changing the underlying value. Application logic determines how data should be calculated and stored. Views typically contain view logic, and controllers typically contain application logic. I developed the frontend of the application, using React + Vite, which is the 'View' within the MVC model.

Controller refers to the business logic. Controllers are the glue between the model and view, and handle HTTP requests and responses. For example, a controller would determine if, when and how an app would respond with a 404 error message. Controllers will contain the majority of out applications business logic, and generally everything not a model or view will go into a controller.

## ERD

![Alt text](https://github.com/ryanlerler/fc-test/blob/main/drawSQL-image-export-2024-07-10.png)

## Technologies used

Programming Language:

Javascript

<br>
Backend:

Node.js runtime environment

Express.js server

PostgreSQL database

Sequelize.js ORM

Auth0 authentication

<br>
Frontend:

React + Vite

date-fns + date-fns-tz for dates and timezone

Firebase storage

Auth0 authentication

## Potential improvements

Admin role

Admin to edit and delete car

More filters

Deployment (previous backend deployment platform I used is no longer free)

## To run the application

git clone 'https://github.com/ryanlerler/fc-test.git'

cd to backend

set up environment variables as per .env.sample file

npm i

nodemon index.js

<br>
cd to frontend

set up environment variables as per .env.sample file

npm i

npm run dev
