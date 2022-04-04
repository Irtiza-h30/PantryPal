import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      token
    }
  }
`;

export const CREATE_USER = gql`
  mutation Mutation($password: String!, $email: String!, $fullName: String!) {
    createUser(password: $password, email: $email, fullName: $fullName) {
      id
      token
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $userId: ID!
    $fullName: String
    $password: String
    $diet: String
    $excludeIngredients: [String]
    $intolerances: [String]
    $mealTimes: JSONObject
    $measure: String
  ) {
    updateUser(
      userId: $userId
      fullName: $fullName
      password: $password
      diet: $diet
      excludeIngredients: $excludeIngredients
      intolerances: $intolerances
      mealTimes: $mealTimes
      measure: $measure
    ) {
      email
      fullName
      createdTimestamp
      lastModifiedTimestamp
      diet
      intolerances
      excludeIngredients
      mealTimes
      measure
      savedRecipes
    }
  }
`;

export const SAVE_RECIPE = gql`
  mutation SaveRecipe($recipeId: ID!) {
    saveRecipe(recipeId: $recipeId) {
      savedRecipes
    }
  }
`;
