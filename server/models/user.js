const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdTimestamp: {
    type: String,
    required: true,
  },
  lastModifiedTimestamp: {
    type: String,
  },
  excludeIngredients: {
    type: [String],
  },
  diet: {
    type: String,
  },
  intolerances: {
    type: [String],
  },
  mealTimes: {
    type: Object,
    default: {
      breakfast: "8",
      lunch: "12",
      dinner: "18",
    },
  },
  measure: {
    type: String,
    default: "metric",
  },
  savedRecipes: {
    type: [String],
  },
});

module.exports = model("User", userSchema);
