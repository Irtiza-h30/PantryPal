import { gql } from "@apollo/client";

export const GET_RECIPE_INFORMATION = gql`
  query GetRecipeInformation($recipeId: ID!) {
    getRecipeInformation(recipeId: $recipeId) {
      id
      title
      readyInMinutes
      servings
      image
      creditsText
      summary
      extendedIngredients {
        name
        amount
        unit
        consistency
        originalName
        measures
        meta
      }
      nutrition {
        nutrients {
          name
          amount
          unit
          percentOfDailyNeeds
        }
      }
      cuisines
      diets
      occasions
      healthScore
      spoonacularScore
      pricePerServing
      labels
      instructions {
        number
        step
      }
    }
  }
`;

export const GET_RECIPE_INFORMATION_BULK = gql`
  query GetRecipeInformationBulk($recipeIds: [ID!]!) {
    getRecipeInformationBulk(recipeIds: $recipeIds) {
      id
      title
      readyInMinutes
      servings
      image
      creditsText
      summary
      labels
      pricePerServing
      occasions
      diets
      cuisines
      sourceUrl
    }
  }
`;

export const GET_AUTOCOMPLETE_RECIPES = gql`
  query GetAutocompleteRecipes($query: String!) {
    getAutocompleteRecipes(query: $query) {
      title
      id
    }
  }
`;

export const GET_COMPLEX_SEARCH = gql`
  query GetComplexSearch($params: JSONObject!, $offset: Int, $number: Int) {
    getComplexSearch(params: $params, offset: $offset, number: $number) {
      offset
      number
      totalResults
      results {
        id
        title
        readyInMinutes
        servings
        image
        creditsText
        cuisines
        diets
        occasions
        labels
        sourceUrl
        healthScore
        spoonacularScore
        numberOfIngredients
        pricePerServing
        missedIngredientsList
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser($userId: ID!) {
    getUser(userId: $userId) {
      id
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
