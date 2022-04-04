import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card, Divider, Tooltip, Typography } from "antd";
import {
  UnorderedListOutlined,
  UserOutlined,
  ClockCircleOutlined,
  DollarOutlined,
} from "@ant-design/icons";

import Affordable from "components/Icons/Affordable";
import DairyFree from "components/Icons/DairyFree";
import GlutenFree from "components/Icons/GlutenFree";
import Healthy from "components/Icons/Healthy";
import Popular from "components/Icons/Popular";
import Sustainable from "components/Icons/Sustainable";
import Vegan from "components/Icons/Vegan";
import Vegetarian from "components/Icons/Vegetarian";
import External from "components/Icons/External";

import CookbookIcon from "components/CookbookIcon";

import styles from "./index.module.scss";

const { Meta } = Card;
const { Text } = Typography;

const ICONS = {
  Vegetarian,
  Vegan,
  "Gluten-Free": GlutenFree,
  "Dairy-Free": DairyFree,
  Healthy,
  Affordable,
  Popular,
  Sustainable,
};

const RecipeCard = ({
  id,
  title,
  image,
  servings,
  readyInMinutes,
  labels,
  pricePerServing,
  numberOfIngredients,
  missedIngredientsList,
  showMissedIngredients,
}) => {
  return (
    <Card
      style={{ overflow: "hidden" }}
      className={styles.Card}
      cover={<img alt={title} src={image} />}
      actions={[
        <Link to={`/recipe/${id}`}>
          <External />
        </Link>,
        <CookbookIcon id={id} />,
      ]}
    >
      <Meta
        title={title}
        description={
          <>
            <Divider />
            {showMissedIngredients &&
              (missedIngredientsList.length ? (
                <Tooltip
                  title={
                    <ul className={styles.MissedIngredients}>
                      {missedIngredientsList.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                  }
                >
                  <Text type="secondary" className={styles.Disclaimer}>
                    {`${missedIngredientsList.length} missing ingredients`}
                  </Text>
                </Tooltip>
              ) : (
                <Text type="secondary" className={styles.Disclaimer}>
                  All ingredients found in pantry
                </Text>
              ))}
            <div className={styles.Description}>
              <span>
                <Tooltip title="Ready In (minutes)">
                  <ClockCircleOutlined className={styles.Icon} />{" "}
                  {readyInMinutes}
                </Tooltip>
              </span>
              <span>
                <Tooltip title="Ingredients">
                  <UnorderedListOutlined className={styles.Icon} />
                  {numberOfIngredients}
                </Tooltip>
              </span>
              <span>
                <Tooltip title="Servings">
                  <UserOutlined className={styles.Icon} /> {servings}
                </Tooltip>
              </span>
              <span>
                <Tooltip title="Price per serving">
                  <DollarOutlined className={styles.Icon} /> {pricePerServing}
                </Tooltip>
              </span>
            </div>
            <div className={styles.Icons}>
              {labels.map((i) => {
                const Component = ICONS[i];
                return <Component key={i} />;
              })}
            </div>
          </>
        }
      />
    </Card>
  );
};

RecipeCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  servings: PropTypes.string,
  readyInMinutes: PropTypes.number,
  labels: PropTypes.instanceOf(Array),
  pricePerServing: PropTypes.string,
  missedIngredientsList: PropTypes.instanceOf(Array),
  showMissedIngredients: PropTypes.bool,
};

RecipeCard.defaultProps = {
  id: "",
  title: "",
  image: "",
  servings: "",
  readyInMinutes: 0,
  labels: [],
  pricePerServing: 0,
  missedIngredientsList: [],
  showMissedIngredients: false,
};

export default RecipeCard;
