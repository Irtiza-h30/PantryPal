import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { List, Alert } from "antd";

import { useUserContext } from "contexts/UserContext";
import RecipeCard from "components/RecipeCard";
import { GET_RECIPE_INFORMATION_BULK } from "graphql/queries";

import { getToken } from "utils/localStorage";

import styles from "./index.module.scss";

const Cookbook = () => {
  const isAuthenticated = getToken();
  const { savedRecipes } = useUserContext();
  const [getRecipeInformationBulk, { data, loading, error, called }] =
    useLazyQuery(GET_RECIPE_INFORMATION_BULK);

  useEffect(() => {
    if (isAuthenticated && !called && savedRecipes?.length) {
      getRecipeInformationBulk({
        variables: {
          recipeIds: savedRecipes,
        },
      });
    }
  }, [savedRecipes, called, isAuthenticated, getRecipeInformationBulk]);

  if (error) {
    return (
      <Alert
        message="Error"
        description="Failed to load recipe data. Please try again."
        type="error"
        showIcon
      />
    );
  }

  if (!isAuthenticated) {
    return (
      <Alert
        message="Login or create an account to view cookbook."
        description={
          <div>
            Click <Link to="/login">here</Link> to login
          </div>
        }
        type="info"
        showIcon
      />
    );
  }

  return (
    <>
      <h1>Your Cookbook</h1>
      <List
        className={styles.List}
        grid={{
          gutter: 16,
        }}
        dataSource={data?.getRecipeInformationBulk}
        loading={loading}
        locale={{
          emptyText: "No recipes saved to cookbook.",
        }}
        header={
          !loading && (
            <h4>
              {savedRecipes?.length ?? 0} saved{" "}
              {savedRecipes?.length === 1 ? "recipe" : "recipes"}
            </h4>
          )
        }
        renderItem={(recipe) => {
          if (savedRecipes.includes(recipe.id)) {
            return (
              <List.Item>
                <RecipeCard key={recipe.id} {...recipe} />
              </List.Item>
            );
          }
        }}
      />
    </>
  );
};

export default Cookbook;
