### Mom, What's For Dinner?!

Mom, What's For Dinner is a Node.js app that helps people pick out recipes, when they either don't have the time or they are looking for somehing new.

[Live Link](https://mom-whats-for-dinner.herokuapp.com/)

### Using The App
In order to search recipes you have to have an account. So first you need to click on the "sign up" tab. You will fill out the sign up form, then you can go back to the home page and start searching for recipes.

Once you find recipes you like, click "add to favorites" and it will be saved to your favorites in your profile.

### Getting Started 
Getting started I wanted to make sure I had the layout down, that required setting up my home page first so I knew what look I wanted to go for. I personally have a three year old so I wanted something that mom's in general could relate to so that's how I got "Mom, What's For Dinner?!"

Next I created the models I would need: 
    - User Model
    - Favorites Model
    - Comments Model (Stretch Goal)

## User Model
| Column    | Data Type | Description                                    |
| --------- | --------- | ---------------------------------------------- |
| id        | Integer   | Primary Key                                    |
| firstname | String    | ---------------------------------------------- |
| lastname  | String    | ---------------------------------------------- |
| email     | String    | usernameField for login                        |
| password  | String    | hashed with BCrypt                             |
| birthdate | Date      | users birthdate                                |

### Favorites Model
| Column | Data Type | Description                                       |
| ------ | --------- | ------------------------------------------------- |
| id     | Integer   | Primary Key                                       |
| url    | String    | Base Url (Edamam-Api)                             |
| label  | String    | Label of each individial recipe from the Api      |
| image  | String    | Image of each individial recipe from the Api      |
| uri    | String    | ------------------------------------------------- |
| foodId | String    | ------------------------------------------------- |

#### Comments Model (didn't get implemented)
| Column     | Data Type | Description                                       |
| ---------  | --------- | ------------------------------------------------- |
| favoriteId | Integer   | Primary Key                                       |
| name       | String    | Name of person leaving the comment                |
| content    | String    | Content of the comment                            |
| rating     | Decimal   | Rating of the recipe                              |


Next I went ahead and stubbed out all the routes I would need, it took awhile to get them all
down, which was a little discouraging because I wasn't seeing the results I wanted right away but eventually it all came together.

#### Routes

| Method | Path           | Location               | Purpose                                |
| ------ | -------------- | ---------------------- | ---------------------------------      |
| GET    | /              | index.js               | Home Page                              |
| GET    | /auth/login    | controllers/auth.js    | Renders Login Form                     |
| POST   | /auth/login    | controllers/auth.js    | Handles Login Auth                     |
| GET    | /auth/signup   | controllers/auth.js    | Renders Signup Form                    |
| POST   | /auth/signup   | controllers/auth.js    | Handles Signup Auth                    |
| GET    | /auth/logout   | controllers/auth.js    | Removes User Session Data              |
| GET    | /profile       | controllers/profile.js | User Profile Page                      |
| GET    | /profile/edit  | controllers/profile.js | Edit User Profile                      |
| PUT    | /profile/edit  | controllers/profile.js | Puts new info in the profile           |
| POST   | /profile       | controllers/profile.js | Adds a favorite recipe to profile      |
| DELETE | /              | controllers/profile.js | Deletes a favorite recipe from profile |
| GET    | /              | controllers/recipes.js | API request                            |
| GET    | /recipes/show  | controllers/recipes.js | Show recipes                           |
### API 
When I first started looking at API's I was curious about Pinterest's API, but anyone that I talked to told me to do the Edamam API. When I was first receiving data from the API the JSON object was huge, so it took a little bit of digging to see what I needed to actually get from the API.

### Styling
For styling I wanted to keep it very simple since my background image has so much going on, so I tried to stick to simple and somewhat opaque so you could still see the background a little bit.

### User Stories

A mom who is working full time with a house full of kids who keep asking, Mom, What's for Dinner? She doesn't have enough time to plan something out.

A mom who needs new recipes to try out because her family is getting sick of the same recipes over and over again.

### Next Steps
I need to go in and change the tabs available after you've logged in so they no longer say "sign up" and "log in". I also created a comments model and have a comments controller so you could add reviews to recipes, but again I ran out of time but this would be a great thing to add in when I have the chance to.

### Technologies Used 
- Node.js
- Express
- SQL
- Postgres
- Sequelize
- JavaScript
- Materialize
- HTML5
- CSS3
- BCrypt
- EJS
