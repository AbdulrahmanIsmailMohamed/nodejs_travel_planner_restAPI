# nodejs_travel_planner_restAPI

<h3 align="center">Travel Planning nodejs, express, postgreSQL, TS</h3>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#key-features">Key Features</a>
    </li>
    <li>
      <a href="#build-with">Built With</a>
    </li>
    <li>
      <a href="#installation">Installation</a>
    </li>
    <li>
      <a href="#known-bugs">Known Bugs</a>
    </li>
    <li>
      <a href="#contact">Contact</a>
    </li>
  </ol>
</details>

# Environment Variables

&nbsp;

```ENV
# App Setting
PORT = 3000
NODE_ENV = development

# db
DB_USER = 
DB_NAME = travel_planning
DB_PASSWORD = 

# JWT
JWT_SECRET = 
JWT_EXPIRE =  

# nodemailer
MAILRE_HOST = 
MAILRE_PORT = 
MAILRE_USER = 
MAILRE_PASS = 

```

&nbsp;

## Key Features

- Authentication
  - Login [Public]
  - SignUp [Public]
  - Tokens [User]
- Password Management
  - Forgot Password [Public]
  - Reset Password [Public]
- Email Management
  - Send the verification code to change the password [Public]
- Destination Management
  - Create Destination [User]
  - Update Destination [User]
  - Delete Destination [User]
  - Get Destination [User]
  - Get Destinations [User]
- Itineraries Management
  - Create Itinerary [User]
  - Update Itinerary [User]
  - Delete Itinerary [User]
  - Get Itinerary [User]
  - Get Itineraries [User]
- Unite Test 
  - I did unit testing on all endpoints by Mocha, chai and supertest

## Built With

List of any major frameworks used to build the project.

* [NodeJS](https://nodejs.org/) - JS runtime environment
* [ExpressJS](https://expressjs.com/) - The NodeJS framework used
* [PS](https://www.npmjs.com/package/ps) - module for looking up running processes
* [postgres](https://www.postgresql.org/) - it is a highly stable database management system,
* [Bcrypt](https://www.npmjs.com/package/bcrypt) - Encryption & Decryption Algorithm
* [Dotenv](https://www.npmjs.com/package/dotenv) - Loads environment variables from a . env file into process. env
* [JWT](https://jwt.io/) - Compact URL-safe means of representing claims to be transferred between two parties
* [Morgan](https://www.npmjs.com/package/morgan) - HTTP request logger middleware for NodeJS
* [Nodemailer](https://www.npmjs.com/package/nodemailer) - Easy as cake e-mail sending from your Node.js applications
* [Express-Validator](https://www.npmjs.com/package/express-validator) - A library of string validators and sanitizers.
* [Mocha](https://www.npmjs.com/package/mocha) - Allow us to test code
* [chai](https://www.npmjs.com/package/chai) - Allow us to test code
* [supertest](https://www.npmjs.com/package/supertest) - Allow us to test code
* [cors](https://www.npmjs.com/package/cors) -  a browser mechanism which enables controlled access to resources located outside of a given domain
* [express-async-handler](https://www.npmjs.com/package/express-async-handler) - Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
* [ts-node](https://www.npmjs.com/package/ts-node) -  TypeScript execution engine for Node.js.
  
## Installation

You can fork the app or you can git-clone the app into your local machine. Once done that, please install all the
dependencies by running
```
$ npm install
set your env variables
$ npm run start
``` 

## Known Bugs
Feel free to email me at abdulrahman.ismail.mohammed@gmail.com if you run into any issues or have questions, ideas or concerns.n into any issues or have questions, ideas or concerns.
Please enjoy and feel free to share your opinion, constructive criticism, or comments about my work. Thank you! 🙂

<!-- CONTACT -->
## Contact

Email - [abdulrahman.ismail.mohammed@gmail.com](abdulrahman.ismail.mohammed@gmail.com)

LinkedIN - [Abdulrahman Ismail](https://www.linkedin.com/in/abdulrahman-ismail-ab6a84209)

Project: [Travel Planing](https://github.com/AbdulrahmanIsmailMohamed/nodejs_travel_planner_restAPI)
