

## User Schema
| Column    | Data Type | Description                                    |
| --------- | --------- | ---------------------------------------------- |
| id        | Integer   | Primary Key                                    |
| firstname | String    | ---------------------------------------------- |
| lastname  | String    | ---------------------------------------------- |
| email     | String    | usernameField for login                        |
| password  | String    | hashed with BCrypt before creation of new row  |
| birthdate | Date      | Might want to usr moment module to format this |
| bio       | Text      |

### Favorites Model
| Column | Data Type | Description                                       |
| ------ | --------- | ------------------------------------------------- |
| id     | Integer   | Primary Key                                       |
| url    | String    | ------------------------------------------------- |
| label  | String    | ------------------------------------------------- |
| image  | String    | ------------------------------------------------- |
| uri    | String    | ------------------------------------------------- |
| foodId | String    | ------------------------------------------------- |


#### Routes

| Method | Path           | Location               | Purpose                   |
| ------ | -------------- | ---------------------- | ------------------------- |
| GET    | /              | index.js               | Home Page                 |
| GET    | /auth/login    | controllers/auth.js    | Renders Login Form        |
| POST   | /auth/login    | controllers/auth.js    | Handles Login Auth        |
| GET    | /auth/signup   | controllers/auth.js    | Renders Signup Form       |
| POST   | /auth/signup   | controllers/auth.js    | Handles                   |
| GET    | /auth/logout   | controllers/auth.js    | Removes User Session Data |
| GET    | /profile       | controllers/profile.js | User Profile Page         |
| GET    | /profile/edit  | controllers/profile.js |                           |
| PUT    | /profile/new   | controllers/profile.js | User Profile Page         |
| POST   | /              | controllers/profile.js |                           |
| DELETE | /              | controllers/profile.js |                           |
| GET    | /              | controllers/recipes.js |                           |
| GET    | /label/new     | controllers/recipes.js |                           |
| GET    | /recipes/show  | controllers/recipes.js |                           |


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

