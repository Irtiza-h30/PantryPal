const { RESTDataSource } = require("apollo-datasource-rest");

const SPOONACULAR_BASE_API = "https://api.spoonacular.com/";

class spoonacularAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = SPOONACULAR_BASE_API;
  }

  willSendRequest(request) {
    request.params.set("apiKey", process.env.SPOONACULAR_API_KEY);
  }

  async getRecipeInformation(recipeId) {
    return this.get(`recipes/${recipeId}/information?includeNutrition=true`);
  }

  async getRecipeInformationBulk(recipeIds) {
    return this.get(`recipes/informationBulk?ids=${recipeIds}`);
  }

  async getComplexSearch(params, offset, number) {
    const qs = new URLSearchParams({ ...params, offset, number });
    return this.get(
      `recipes/complexSearch?${qs.toString()}&addRecipeInformation=true&addRecipeNutrition=true&fillIngredients=true`
    );
  }

  async getAutocompleteRecipes(query) {
    return this.get(`recipes/autocomplete?query=${query}`);
  }
}

module.exports = spoonacularAPI;
