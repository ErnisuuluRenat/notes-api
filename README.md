# Notes API

## Notes API - REST API pet project. 
The main idea is to provide users with simple but protective notes.

### What it does?
provides a simple but effective way for creating users, logging/logout them, do every crud operation with notes.

### Features:
* JWT token functionality such as refresh and access
* Nest GUARDS
* Custom decorators

### API endpoints:

*Auth*
* POST /auth/login - to login
* POST /auth/refresh - to refresh access token
* POST /auth/logout - to logout and remove your jwt tokens

*Notes*
* GET /notes - to get all current notes (this is for dev version and for testing!!!)
* GET /notes/:id - to get specific note (this is for dev version and for testing!!!)
* POST /notes - to add new note
* DELETE /notes/:id - to remove note
* PATCH /notes/:id - to update note

*Users*
* GET /users - to get all existing users (this is for dev version and for testing!!!)
* POST /users - to create user


### Tech stack:
* Backend: NestJS, Typescript
* Orm: TypeORM
* Database: PostgreSQL

### Installation:
* Make sure that you have npm nodeJS, postgreSQL already installed on your machine
* git copy [repo]
* run: npm install
* setup your .env
env should include :
* PORT
* DB_PORT
* DB_HOST
* DB_USERNAME
* DB_PASSWORD
* DATABASE
* SECRET_KEY

after that you ready to run your application.

to run your application: npm run start:dev


