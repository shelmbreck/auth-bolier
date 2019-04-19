# Node/Express/PostgreSQL Boilerplate

This is a bare-bones Node/Express app with basic user authentication and authorization. It has local auth on the `master` branch and additionally Facebook auth on the `with-facebook` branch. The boilerplate exists so I don't need to create a new project from scratch every time I need a project with working auth.

## What it includes

* Sequelize is set up for PostgresSQL
* Sequelize model and migration(s) for user
* Passport, Express-Session, and Connect-Flash modules
* Error/Success message alerts
* BCrypt for hashing passwords

### User Schema
| Column | Data Type | Description |
| ------ | --------- | -------------------------------------------- |
| id | Integer | Primary Key |
| firstname | String | - |
| lastname | String | - |
| email | String | usernameField for login |
| password | String | hashed with BCrypt before creation of new row |
| birthdate | Date | Might want to usr moment module to format this |
| admin | Boolean | Set default value to false |
| image | Text | A URL to an image of the user - required field |
| bio | Text |

Additional fields from `with-facebook`

| Column | Data Type | Description |
| ------------ | ---------- | ----------- |
| GET | /auth/facebook | controllers/auth.js | Outgoing Request to Facebook |
| GET | /auth/callback/facebook | controllers/auth.js | Incoming Data from Facebook |

This is the default schema provided. Add additional migrationsas needed for more data.

### Default Routes Table

| Method | Path | Location | Purpose |
| ---- | ---- | -------------- | ---------------------- |
| GET  | / | index.js | Home Page |
| GET  | /profile | controllers/profile.js | User Profile Page |
| GET  | /profile/admin | controllers/profile.js | Admin Dashboard Page |
| GET  | /auth/login | controllers/auth.js | Renders Login Form |
| POST | /auth/login | controllers/auth.js | Handles Login Auth |
| GET  | /auth/signup | controllers/auth.js | Renders Signup Form |
| POST | /auth/signup | controllers/auth.js | Handles |
| GET  | /auth/logout | controllers/auth.js | Removes User Session Data |


## User Model Set Up

## Steps To Use 

####1. Clonse this repository, but with a different name 

On the terminal run:

`git clone <repo_link> <new_name>

#### 2. Decide what the new project needs

*Part A: Decide if using facebook*

If you do not need facebook auth, then user the `master` branch. Otherwise, switch to the with-facebook branch with this command:

`git checkout with-facebook

*Part B: Remove stuff not being used*

For example, if you don't intend to have admins on the new project, remove `middleware/ adminLoggedIn.js` and the routes/views for the admin dashboard.

#### 3. Install node modules from package.json

On the terminal run: 

`npm install'

#### 4. Restructure Git Remotes

Basically, this is git's version of updating the address book.

* First, remove the "old" remote.
  * `git remote remove origin`
* Then go to your github and create a new, empty git repository
* Copy the new repository link
* Set up a new remote pointing to the new repository
  * `git remote add origin <new_repo_link>

#### 5. Make a new .env file

At minimum the following is needed:

SESSION_SECRET = 'This is a string for the session to use (like a salt)'

Optional others, including facebook specific ones:


PORT = 3000
FB_APP_ID = '1234567890'
FB_APP_SECRET = '1234567890abcdef1234567890abcdef'
BASE_URL = 'http://localhost:3000'

#### 6. Customize with the project's new name

* Title in `layout.ejs`
* Logo in links in `nav.ejs`
* The name, description, and repo fields in `package.json
* Remove the `readme.me content (this) and put a stub for the new project's readme 

#### 7.

createdb <new_database_name>

#### 8. 

First, update the development settings in the `config/config.json` file.

{
  "development": {
    "database": "auth-boilerplate",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "database": "auth-boilerplate",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "database": "auth-boilerplate",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}

Then, do the sequelize migrations

(Optional) If additional fields on the user table are needed, follow directions [here](#adding-migrations) to create additional migrations.

Then, do the Sequelize migrations with this command: 

```
sequelize db:migrate
```

#### 9. Run the server locally and ensure that it works

If you have `nodemon` installed globally, run `nodemon` as a command in the root folder.

Otherwise run `node index.js`.

Unless specified otherwise, the port in use will be 3000

#### 10. Commit and push to your new project

> Note: We switched the origin remote to point to the new github project on step 4. Make sure that this is done properly by running the command `git remote -v` to check the remote locations.

```
git add -A
git commit -m "Initial Commit"
git push origin master
```

#### 11.

Assuming that the set-up steps went smoothly, now you can add new models/migrations, new controllers and routes, etc., and just generally start developing as if you had started from scratch

## Notes on Optional Steps

#### Adding Migrations

Here is an example of adding an `age` field to the user table

* STEP 1: Create a migration file via sequelize command line
  * `sequelize migration:create --name add-age`
* STEP 2: Write the up and down functions of the migration
    * Refer to other migratoins for how this looks
    * The part to add looks like: `return queryInterface.addColumn('users', 'age', Sequelize.Integer)`
* STEP 3: Add the column into the user model
    * user.js - located in the models folder

#### Facebook App Set Up

>A Facebook login is required

