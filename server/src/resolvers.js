const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { UserInputError, AuthenticationError } = require("apollo-server");
const generateToken = require("../utils/generateToken");
const checkAuth = require("../utils/checkAuth");
const { EMAIL_REGEX, PASSWORD_REGEX } = require("../utils/regex");

const resolvers = {
  Query: {
    getUser: async (_, { userId }, { token }) => {
      const user = checkAuth(token);

      if (user.id === userId) {
        return User.findById(userId);
      } else {
        throw new AuthenticationError("Action not allowed");
      }
    },

    getRecipeInformation: async (_, { recipeId }, { dataSources }) => {
      return dataSources.api.getRecipeInformation(recipeId);
    },

    getRecipeInformationBulk: async (_, { recipeIds }, { dataSources }) => {
      return dataSources.api.getRecipeInformationBulk(recipeIds.join());
    },

    getComplexSearch: async (
      _,
      { params, offset, number },
      { dataSources }
    ) => {
      return dataSources.api.getComplexSearch(params, offset, number);
    },

    getAutocompleteRecipes: async (_, { query }, { dataSources }) => {
      return dataSources.api.getAutocompleteRecipes(query);
    },
  },
  Mutation: {
    login: async (_, { email, password }) => {
      const foundUser = await User.findOne({
        email: email.toLowerCase(),
      });

      if (!foundUser) {
        throw new UserInputError("User not found. Please create an account.");
      }

      const match = await bcrypt.compare(password, foundUser.password);

      if (!match) {
        throw new UserInputError("Incorrect password.");
      }

      const token = generateToken(foundUser);

      return {
        ...foundUser._doc,
        id: foundUser._id,
        token,
      };
    },
    createUser: async (_, { fullName, email, password }) => {
      if (!EMAIL_REGEX.test(email)) {
        throw new UserInputError("Please enter a valid email.");
      }

      const sameEmail = await User.findOne({ email });

      if (sameEmail) {
        throw new UserInputError("Email is already taken.");
      }

      if (!PASSWORD_REGEX.test(password)) {
        throw new UserInputError(
          "Password must contain a minimum of six characters, at least one letter and one number"
        );
      }

      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        fullName,
        email,
        password,
        createdTimestamp: new Date().toUTCString(),
      });

      const res = await newUser.save();
      const token = generateToken(newUser);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
    updateUser: async (
      _,
      {
        userId,
        fullName,
        password: unhashedPassword,
        diet,
        intolerances,
        excludeIngredients,
        measure,
      },
      { token }
    ) => {
      const user = checkAuth(token);
      let password;
      if (unhashedPassword) {
        if (PASSWORD_REGEX.test(unhashedPassword)) {
          password = await bcrypt.hash(unhashedPassword, 12);
        } else {
          throw new UserInputError(
            "Password must contain a minimum of six characters, at least one letter and one number"
          );
        }
      }

      try {
        if (user.id === userId) {
          const updatedUser = await User.findOneAndUpdate(
            { id: user.id },
            {
              fullName,
              diet,
              intolerances,
              excludeIngredients,
              measure,
              ...(password && { password }),
              lastModifiedTimestamp: new Date().toUTCString(),
            },
            { returnNewDocument: true }
          );
          return updatedUser;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    saveRecipe: async (_, { recipeId }, { token }) => {
      const user = checkAuth(token);

      if (user) {
        const foundUser = await User.findById(user.id);

        const { savedRecipes } = foundUser;

        foundUser.savedRecipes = savedRecipes.includes(recipeId)
          ? savedRecipes.filter((i) => i !== recipeId)
          : [...savedRecipes, recipeId];

        await foundUser.save();
        return foundUser;
      } else {
        throw new AuthenticationError("Action not allowed");
      }
    },
  },
  Recipe: {
    labels: ({
      vegetarian,
      vegan,
      glutenFree,
      dairyFree,
      veryHealthy,
      cheap,
      veryPopular,
      sustainable,
    }) => {
      const obj = {
        ...(!vegan && { Vegetarian: vegetarian }),
        Vegan: vegan,
        "Gluten-Free": glutenFree,
        "Dairy-Free": dairyFree,
        Healthy: veryHealthy,
        Affordable: cheap,
        Popular: veryPopular,
        Sustainable: sustainable,
      };
      return Object.keys(obj).filter((i) => obj[i] === true);
    },
    pricePerServing: ({ pricePerServing }) =>
      `$${(pricePerServing / 100).toFixed(2)}`,
    numberOfIngredients: ({ nutrition }) =>
      nutrition && nutrition.ingredients && nutrition.ingredients.length,
    missedIngredientsList: ({ missedIngredients }) => {
      if (missedIngredients && missedIngredients.length) {
        return missedIngredients.map((i) => i.name);
      }
      return [];
    },
    instructions: ({ analyzedInstructions }) => {
      if (analyzedInstructions && analyzedInstructions.length) {
        return analyzedInstructions[0].steps;
      }
      return [];
    },
  },
};

module.exports = resolvers;
