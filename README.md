# OpenTable clone

This is the starter for the OpenTable clone project.

## Description

A clone of OpenTable. OpenTable is an online restaurant reservation service company.

## About the project

![Screen Shot 2023-01-17 at 12 31 26 PM](https://user-images.githubusercontent.com/89610662/212970430-f84cffb6-1cc7-4eb2-9f1f-25fbea2fbc7a.png)

### Built With

* [![HTML5][HTML5]][HTML-url]
* [![CSS][CSS]][CSS-url]
* [![Javascript][Javascript]][Javascript-url]
* [![Python][Python]][Python-url]
* [![Flask][Flask]][Flask-url]
* [![Express.js][Express.js]][Express-url]
* [![React][React.js]][React-url]
* [![Node.js][Node.js]][Node-url]
* [![SQLite][SQLite]][SQLite-url]
* [![NPM][NPM]][NPM-url]
* [![Git][Git]][Git-url]
* [![Github][Github]][Github-url]

## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development:
You will need to run `npm install` to install all your dependencies before starting up the application. While in development, run this application from this location using `npm start`. No environment variables are needed to run this application in development.


