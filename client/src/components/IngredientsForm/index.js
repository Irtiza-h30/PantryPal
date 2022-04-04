import React from "react";
import PropTypes from "prop-types";
import { Form, Select, Slider, Divider } from "antd";

import INGREDIENT_LIST from "constants/ingredientList.json";

const { Item } = Form;
const { Option } = Select;

const IngredientsForm = ({ form }) => {
  return (
    <Form
      layout="vertical"
      name="explore"
      form={form}
      initialValues={{
        type: "",
        cuisine: "",
        maxReadyTime: 180,
        calories: [0, 3000],
        protein: [0, 400],
        carbs: [0, 400],
        fat: [0, 100],
      }}
    >
      <Item name="type" label="Type">
        <Select placeholder="Select type" allowClear>
          <Option value="">All</Option>
          <Option value="appetizer">Appetizer</Option>
          <Option value="beverage">Beverage</Option>
          <Option value="bread">Bread</Option>
          <Option value="breakfast">Breakfast</Option>
          <Option value="dessert">Dessert</Option>
          <Option value="drink">Drink</Option>
          <Option value="fingerfood">Fingerfood</Option>
          <Option value="marinade">Marinade</Option>
          <Option value="main course">Main Course</Option>
          <Option value="salad">Salad</Option>
          <Option value="sauce">Sauce</Option>
          <Option value="side dish">Side Dish</Option>
          <Option value="soup">Soup</Option>
          <Option value="snack">Snack</Option>
        </Select>
      </Item>
      <Item name="diet" label="Diet">
        <Select placeholder="Select Diet" allowClear>
          <Option value="">All</Option>
          <Option value="Gluten Free">Gluten Free</Option>
          <Option value="Ketogenic">Ketogenic</Option>
          <Option value="Lacto-Vegetarian">Lacto-Vegetarian</Option>
          <Option value="Ovo-Vegetarian">Ovo-Vegetarian</Option>
          <Option value="Paleo">Paleo</Option>
          <Option value="Pescetarian">Pescetarian</Option>
          <Option value="Vegan">Vegan</Option>
          <Option value="Vegetarian">Vegetarian</Option>
        </Select>
      </Item>
      <Item name="cuisine" label="Cuisine">
        <Select placeholder="Select Cusine" allowClear>
          <Option value="">All</Option>
          <Option value="African">African</Option>
          <Option value="American">American</Option>
          <Option value="British">British</Option>
          <Option value="Cajun">Cajun</Option>
          <Option value="Caribbean">Caribbean</Option>
          <Option value="Ovo-Vegetarian">Ovo-Vegetarian</Option>
          <Option value="Vegan">Vegan</Option>
          <Option value="Chinese">Chinese</Option>
          <Option value="Eastern European">Eastern European</Option>
          <Option value="European">European</Option>
          <Option value="German">German</Option>
          <Option value="Greek">Greek</Option>
          <Option value="Indian">Indian</Option>
          <Option value="Irish">Irish</Option>
          <Option value="Italian">Italian</Option>
          <Option value="Japanese">Japanese</Option>
          <Option value="Jewish">Jewish</Option>
          <Option value="Latin American">Latin American</Option>
          <Option value="Mediterranean">Mediterranean</Option>
          <Option value="Mexican">Mexican</Option>
          <Option value="Middle Eastern">Middle Eastern</Option>
          <Option value="Southern">Southern</Option>
          <Option value="Spanish">Spanish</Option>
          <Option value="Thai">Thai</Option>
          <Option value="Vietnamese">Vietnamese</Option>
        </Select>
      </Item>
      <Item name="intolerances" label="Intolerances">
        <Select placeholder="Select intolerances" allowClear mode="multiple">
          <Option value="Dairy">Dairy</Option>
          <Option value="Egg">Egg</Option>
          <Option value="Gluten">Gluten</Option>
          <Option value="Grain">Grain</Option>
          <Option value="Peanut">Peanut</Option>
          <Option value="Seafood">Seafood</Option>
          <Option value="Sesame">Sesame</Option>
          <Option value="Shellfish">Shellfish</Option>
          <Option value="Soy">Soy</Option>
          <Option value="Sulfite">Sulfite</Option>
          <Option value="Tree Nut">Tree Nut</Option>
          <Option value="Wheat">Wheat</Option>
        </Select>
      </Item>
      <Item
        name="excludeIngredients"
        label="Excluded Ingredients"
        tooltip="Ingredients you do not want us to include in recipes"
      >
        <Select
          options={INGREDIENT_LIST}
          mode="multiple"
          placeholder="Select excluded ingredients"
          allowClear
        />
      </Item>
      <Item name="maxReadyTime" label="Max Ready Time">
        <Slider marks={{ 0: "0m", 180: "180m" }} min={0} max={180} />
      </Item>
      <Item name="calories" label="Calories">
        <Slider
          range={{ draggableTrack: true }}
          marks={{ 0: "0", 3000: "3000" }}
          min={0}
          max={3000}
        />
      </Item>
      <Item name="protein" label="Protein">
        <Slider
          range={{ draggableTrack: true }}
          marks={{ 0: "0g", 400: "400g" }}
          min={0}
          max={400}
        />
      </Item>
      <Item name="carbs" label="Carbs">
        <Slider
          range={{ draggableTrack: true }}
          marks={{ 0: "0g", 400: "400g" }}
          min={0}
          max={400}
        />
      </Item>
      <Item name="fat" label="Fat">
        <Slider
          range={{ draggableTrack: true }}
          marks={{ 0: "0g", 100: "100g" }}
          min={0}
          max={100}
        />
      </Item>
      <Divider />
    </Form>
  );
};

IngredientsForm.propTypes = {
  form: PropTypes.instanceOf(Object),
};

IngredientsForm.defaultProps = {
  form: {},
};

export default IngredientsForm;
