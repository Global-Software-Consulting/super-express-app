# RESTful API Node Server

## Installation

```bash
git clone https://github.com/Global-Software-Consulting/super-express-app.git
cd super-express-app
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables
```

## Table of Contents

- [Features](#features)
- [Commands](#commands)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Authentication](#authentication)
- [Validation](#validation)
- [Roles](#roles)
- [Linting](#linting)

## Features

- **postgres database**: object data modeling using [sequelize](https://sequelize.org/)
- **Authentication**: using [jwt](https://jwt.io/)
- **Validation**: validation of fields enabled using [express-validator](https://express-validator.github.io/docs/check-api.html)
- **API testing**: with postman
- **Environment variables**: using [dotenv]
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **Linting**: with [ESLint](https://eslint.org) and [Prettier](https://prettier.io)
- **Editor config**: consistent editor configuration

## Commands

Running locally:

```bash
npm run dev
```

Running in production:

```bash
npm start
```

Migrations:

```bash
# run all migrations
npm run db:migrate

# undo migration
npm run db:migrate:undo
```

Seeders:

```bash
# run all seeders
npm run db:seed

# undo seeding
npm run db:seed:undo
```

Linting:

```bash
# run ESLint
npm run lint
```

Test:

```bash
# run tests
npm run test
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=4000
#Database name
DB_NAME=here your db name
#Username 
DB_USERNAME=db user name
#Username set for postgres
DB_PASSWORD=database password
#locally you can use 'localhost'
DB_HOST=database host
# JWT secret key
JWT_SECRET=thisisasamplesecret
# Number of minutes after which an access token expires
JWT_EXPIRES_IN=30

```

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers
 |--middleware\     # Custom express middleware
 |--migrations\     # Database migrations
 |--models\         # Sequelize models
 |--routes\         # Routes
 |--seeders\        # Database seeders
 |--utils\          # Utility classes and functions
 |--validators\     # Validate fields
 |--index.js        # App entry point
test\
 
```

### API Endpoints

List of available routes:

**Blog routes**:\
`POST /api/v1/blog` - add blog\
`GET /api/v1/blog` - get all blogs\
`GET /api/v1/blog/:id` - get a blog\
`PATCH /api/v1/blog/:id` - update blog\
`DELETE /api/v1/blog/:id` - delete user

## Authentication

To require authentication for certain routes, you can use the `auth` middleware.

```javascript
const express = require('express');
const auth = require('../middleware/auth');
const { userController } = require('../controller');

const router = express.Router();

router.patch('/:id', auth, userController.update);
```

## validation

using express-validator validate required fields

```javascript
const express = require('express');
const auth = require('../middleware/auth');
const { userController } = require('../controller');
const { userValidator } = require('../validators');

const router = express.Router();

router.patch(
  '/signup',
  userValidator.signup(),
  userValidator.validate,
  auth,
  userController.signup
);
```
## roles

Role base tasks

```javascript
const { blogController } = require('../controllers');
const auth = require('../middleware/auth');
const { checkRole } = require('../middleware/roles');

router.post('/', auth, checkRole('admin', 'editor'), blogController.add);
```

## Linting

Linting is done using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io).
