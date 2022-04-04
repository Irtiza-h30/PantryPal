import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import { Tooltip } from "antd";
import { BookFilled, BookOutlined } from "@ant-design/icons";

import { useUserContext } from "contexts/UserContext";
import { SAVE_RECIPE } from "graphql/mutations";
import { GET_USER } from "graphql/queries";
import { getToken } from "utils/localStorage";

import styles from "./index.module.scss";

const CookbookIcon = ({ id, className }) => {
  const isAuthenticated = getToken();
  const { savedRecipes, id: userId } = useUserContext();

  const [saveRecipe] = useMutation(SAVE_RECIPE, {
    variables: { recipeId: id },
    refetchQueries: [
      {
        query: GET_USER,
        variables: { userId },
      },
    ],
  });

  const onChangeSavedRecipe = useCallback(() => {
    saveRecipe();
  }, [saveRecipe]);

  const CookbookIcon = useMemo(() => {
    if (isAuthenticated) {
      if (savedRecipes.includes(id)) {
        return (
          <Tooltip title="Remove from cookbook">
            <BookFilled className={className} onClick={onChangeSavedRecipe} />
          </Tooltip>
        );
      } else {
        return (
          <Tooltip title="Add to cookbook">
            <BookOutlined className={className} onClick={onChangeSavedRecipe} />
          </Tooltip>
        );
      }
    }

    return (
      <Tooltip title="Login to save recipe">
        <BookOutlined className={className} />
      </Tooltip>
    );
  }, [isAuthenticated, className, savedRecipes, id, onChangeSavedRecipe]);

  return CookbookIcon;
};

CookbookIcon.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
};

CookbookIcon.defaultProps = {
  id: "",
  className: styles.ActionIcon,
};

export default CookbookIcon;
