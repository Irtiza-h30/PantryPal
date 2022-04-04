# PantryPal

Meal planning is a challenging task that requires careful consideration. This is especially true when working under constraints such as time, budget, or dietary restrictions. PantryPal helps to solve the daily problem of figuring out what recipes to make given available ingredients, and suggests fresh ideas to plan out the perfect meal.

The application will allow users to search for a particular dish and will return a list of recipes, including their ingredients, nutrition information and cost breakdown. Users will also be able to browse featured recipes, as well as search for specific recipes.

## Competitors

Other web applications exist online which focus on suggesting recipes based on ingredients that a user has on hand. Supercook allows users to add ingredients by selecting items from a list or searching for items, but the process of selecting ingredients is time consuming due to poor organization of ingredients, and no way to easily view or change selected ingredients. It also provides filters such as diet and recipe time. MyFridgeFood displays a list of selectable ingredients, but has a poorly designed interface which is condensed into a small space, making it difficult to navigate. Additionally, filtering options are very limited, and search results are not accurate.

## Value

PantryPal’s unique features, highlighted below, show how PantryPal differentiates itself from its competitors. Overall, PantryPal provides a flexible user experience, allowing users superior customization of results through an intuitive interface for selecting ingredients and filtering for dietary and other needs. It also allows users to browse and search for specific recipes, and to save them for future reference. Through a modern and intuitive user interface, customers no longer experience the stress of meal planning and preparation.

## Features

### :spaghetti: Search Dishes

Users can search for a particular dish and PantryPal will return a list of recipes; including their ingredients, nutrition information and cost breakdown.

### :carrot: Add Ingredients

Users can select food items they have on hand to be used for recipe search. These food items are categorized into food-groups to make the process of finding recipes as simple as possible. Recipes will be recommended based on the added ingredients.

### :mag: Customize Search Results

Users can customize their search results using filters to match specific dietary restrictions, and to fit their lifestyles. This can include filtering by diet, food intolerances, and lifestyle restrictions such as cooking time, calories, macros, and more.

### :notebook_with_decorative_cover: Save Recipes

Users can save recipes to their “Cookbook”. This gives users quick and direct access to their favourite recipes.

# Deliverable 4

## System Requirements

- [git](https://github.com/git-guides/install-git) v2.13 or greater
- [NodeJS](https://nodejs.org/en/download/) `12 || 14 || 15 || 16 || 17`
- [npm](https://www.npmjs.com/) v6 or greater

To verify that these requirements are installed properly, run this:

```bash
git --version
node --version
npm --version
```

## Software Documentation

Clone the project

```bash
  git clone https://github.com/Irtiza-h30/PantryPal.git
```

Go to the project directory

```bash
  cd pantrypal-main
```

Install server dependencies in `root` sub-directory:

```bash
  npm install
```

Install dependencies in `client` sub-directory:

```bash
  npm install
```

Start both deployment servers from their respective sub-directories:

```bash
  npm start
```

To view the app go to http://localhost:3000, and to interact with the GraphQL server, visit http://localhost:4000/graphql. To view the deployed version of the application, visit: [PantryPal](https://my-pantrypal.herokuapp.com/).

## Running Tests

The tests in this React application are tested using [React Testing Library](https://github.com/testing-library/react-testing-library).

To run these tests, run the following command in the `client` folder

```bash
  npm test
```

## Automated Test Framework

This app uses GitHub's continuous integration (CI) workflow that builds and tests the React code. On the top of this `README`, a badge indicates the status of this build. This action is run on every push and pull-request.

## Implementation of Features

This application uses the MERNG technology stack:

**Server:** [NodeJS](https://github.com/nodejs/node), [Express](https://github.com/expressjs/express), [Apollo](https://github.com/apollographql/apollo-client)

**Database:** [MongoDB](https://www.mongodb.com/), [Mongoose](https://github.com/Automattic/mongoose)

**Client:** [React](https://github.com/facebook/react), [SASS](https://github.com/sass/sass), [Ant Design](https://ant.design/)

## Adherence to Design System

### Updated Color Palette

| Color                                                  | Hex                                                              |
| ------------------------------------------------------ | ---------------------------------------------------------------- |
| Primary - The app's main colors                        | ![#43b02a](https://via.placeholder.com/10/43b02a?text=+) #43b02a |
| Secondary - Logo Color                                 | ![#ff7900](https://via.placeholder.com/10/ff7900?text=+) #ff7900 |
| Hover - Hovering over components                       | ![#64bd4b](https://via.placeholder.com/10/64bd4b?text=+) #64bd4b |
| Click - Clicking a component                           | ![#2b8a1a](https://via.placeholder.com/10/2b8a1a?text=+) #2b8a1a |
| Border - Border for components                         | ![#d9d9d9](https://via.placeholder.com/10/d9d9d9?text=+) #d9d9d9 |
| Background Color - The body's background color         | ![#eff2f5](https://via.placeholder.com/10/eff2f5?text=+) #eff2f5 |
| Neutral Color - Background color for key UI components | ![#ffffff](https://via.placeholder.com/10/ffffff?text=+) #ffffff |

## Sample Account

To play around with this application, login using the credentials:

- email: `test@mail.com`
- password: `Test123`

## Screenshot of Available Features

### Login

![login](readme/images/login.png)

- Login to existing account or be redirected to register page

### Register

![register](readme/images/register.png)

- Prompts user to create a new account or redirects them to the login page

### Explore

![explore1](readme/images/explore1.png)
![explore2](readme/images/explore2.png)

- Explore new recipes by searching for a particular meal
- Use filters to refine search results to fit dietary needs and preferences

## Pantry

![pantry1](readme/images/pantry1.png)
![pantry2](readme/images/pantry2.png)
![pantry3](readme/images/pantry3.png)

- Explore new recipes by listing available ingredients
- Ingredients can be selected using the list view with tags, or in the table layout with a search bar
- Use filters to refine search results to fit dietary needs and preferences

### Cookbook

![cookbook1](readme/images/cookbook1.png)
![cookbook2](readme/images/cookbook2.png)

- View cookbook of saved recipes

### Recipe Details

![details](readme/images/details.png)

- View additional recipe details including a summary, ingredients in a specified measurement, and the steps

### Edit Profile

![details](readme/images/editProfile.png)

- Edit profile if logged in
- Features of having an account:
  - Ability to saved recipes to cookbook
  - Create a profile with dietary restrictions, intolerances, excluded ingredients and preferred unit of measurement so these fields do not have to be modified every time
