const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar JSONObject

  type User {
    id: ID!
    email: String!
    fullName: String!
    token: String!
    createdTimestamp: String!
    lastModifiedTimestamp: String
    diet: String
    intolerances: [String]
    excludeIngredients: [String]
    mealTimes: JSONObject
    measure: String
    savedRecipes: [String]
  }

  type Recipe {
    id: ID
    title: String
    readyInMinutes: Int
    servings: String
    image: String
    creditsText: String
    summary: String
    extendedIngredients: [Ingredient]
    nutrition: Nutrition
    cuisines: [String]
    diets: [String]
    occasions: [String]
    healthScore: Float
    spoonacularScore: Float
    pricePerServing: String
    vegetarian: Boolean
    vegan: Boolean
    glutenFree: Boolean
    dairyFree: Boolean
    veryHealthy: Boolean
    cheap: Boolean
    veryPopular: Boolean
    sustainable: Boolean
    labels: JSONObject
    analyzedInstructions: [AnalyzedInstructions]
    instructions: [Instruction]
    sourceUrl: String
    numberOfIngredients: Int
    missedIngredients: [Ingredient]
    missedIngredientsList: [String]
  }

  type Ingredient {
    name: String
    amount: String
    unit: String
    consistency: String
    original: String
    originalName: String
    meta: [String]
    measures: JSONObject
    nutrients: [Nutrient]
  }

  type Nutrition {
    nutrients: [Nutrient]
    ingredients: [Ingredient]
  }

  type Nutrient {
    name: String
    amount: Float
    unit: String
    percentOfDailyNeeds: Float
  }

  type AnalyzedInstructions {
    name: String
    steps: [Instruction]
  }

  type Instruction {
    number: String
    step: String
  }

  type RecipePagination {
    results: [Recipe]
    offset: Int
    number: Int
    totalResults: Int
  }

  type AutoCompleteRecipes {
    title: String
    id: ID
    imageType: String
  }

  type Query {
    getUser(userId: ID!): User
    getRecipeInformation(recipeId: ID!): Recipe
    getRecipeInformationBulk(recipeIds: [ID!]!): [Recipe]
    getComplexSearch(
      params: JSONObject!
      offset: Int = 0
      number: Int = 20
    ): RecipePagination
    getAutocompleteRecipes(query: String!): [AutoCompleteRecipes]
  }

  type Mutation {
    createUser(password: String!, email: String!, fullName: String!): User
    updateUser(
      userId: ID!
      fullName: String
      password: String
      diet: String = null
      excludeIngredients: [String]
      intolerances: [String]
      mealTimes: JSONObject
      measure: String
    ): User
    login(email: String!, password: String!): User
    saveRecipe(recipeId: ID!): User
  }
`;

module.exports = typeDefs;
