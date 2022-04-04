import React, { useState, useMemo, useEffect } from "react";
import {
  Alert,
  Rate,
  Divider,
  Radio,
  Tooltip,
  Typography,
  Card,
  List,
  Row,
  Col,
  Button,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useUserContext } from "contexts/UserContext";
import {
  CheckCircleOutlined,
  UserOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  LeftOutlined,
} from "@ant-design/icons";

import CookbookIcon from "components/CookbookIcon";
import { GET_RECIPE_INFORMATION } from "graphql/queries";
import { preprocessSummary } from "utils";

import styles from "./index.module.scss";

const { Text } = Typography;

const RecipeDetails = () => {
  const navigate = useNavigate();
  const [recipeMeasure, setRecipeMeasure] = useState("metric");
  const { id } = useParams();
  const { measure } = useUserContext();

  useEffect(() => {
    if (measure) {
      setRecipeMeasure(measure);
    }
  }, [measure]);

  const toggleMeasure = (e) => {
    setRecipeMeasure(e.target.value);
  };

  const { data, loading, error } = useQuery(GET_RECIPE_INFORMATION, {
    skip: !id,
    variables: { recipeId: id },
  });

  const details = useMemo(() => data?.getRecipeInformation ?? {}, [data]);

  const nutrition = useMemo(() => {
    const { nutrition: { nutrients = [] } = {} } = details;
    return {
      calories: nutrients?.find((nutrient) => nutrient.name === "Calories"),
      carbohydrates: nutrients?.find(
        (nutrient) => nutrient.name === "Carbohydrates"
      ),
      fat: nutrients?.find((nutrient) => nutrient.name === "Fat"),
      protein: nutrients?.find((nutrient) => nutrient.name === "Protein"),
      sodium: nutrients?.find((nutrient) => nutrient.name === "Sodium"),
      sugar: nutrients?.find((nutrient) => nutrient.name === "Sugar"),
    };
  }, [details]);

  if (error) {
    return (
      <Alert
        message="Error"
        description="Failed to load recipe details. Please try again."
        type="error"
        showIcon
      />
    );
  }

  return (
    <div className={styles.Container}>
      <Button
        className={styles.BackButton}
        icon={<LeftOutlined />}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
      <Card loading={loading}>
        <div className={styles.header}>
          <img
            className={styles.Cover}
            src={details.image}
            alt={details.title}
          />
          <div className={styles.headerInformation}>
            <div className={styles.titleHeader}>
              <h2>{details?.title}</h2>
              <CookbookIcon id={details.id} className={styles.ActionIcon} />
            </div>
            <Rate
              allowHalf
              disabled
              value={Math.round((details?.spoonacularScore / 20) * 2) / 2}
            />
            {details.creditsText && (
              <Text type="secondary" italic>
                Recipe by: {details.creditsText}
              </Text>
            )}
            <Row gutter={60}>
              <Col className={styles.Col}>
                <p>
                  <ClockCircleOutlined /> Total Time
                </p>
                <p>{details?.readyInMinutes} min</p>
              </Col>
              <Col>
                <p>
                  <UserOutlined /> Servings
                </p>
                <p>{details?.servings}</p>
              </Col>
              <Col>
                <p>
                  <DollarOutlined /> Price Per Serving
                </p>
                <p>{details?.pricePerServing}</p>
              </Col>
            </Row>
            <Text type="secondary">{preprocessSummary(details.summary)}</Text>
          </div>
        </div>
        <Divider />
        <div className={styles.nutrition}>
          <h4>Nutritional Information (per serving)</h4>
          <Row gutter={60} justify="center">
            <Col>
              <p>Calories</p>
              <Text type="secondary">
                {nutrition.calories?.amount.toFixed(0)}
                {nutrition.calories?.unit}
              </Text>
            </Col>
            <Col>
              <p>Carbohydrates</p>
              <Text type="secondary">
                {nutrition.carbohydrates?.amount?.toFixed(0)}
                {nutrition.carbohydrates?.unit}
              </Text>
            </Col>
            <Col>
              <p>Fat</p>
              <Text type="secondary">
                {nutrition.fat?.amount?.toFixed(0)}
                {nutrition.fat?.unit}
              </Text>
            </Col>
            <Col>
              <p>Protein</p>
              <Text type="secondary">
                {nutrition.protein?.amount?.toFixed(0)}
                {nutrition.protein?.unit}
              </Text>
            </Col>
            <Col>
              <p>Sodium</p>
              <Text type="secondary">
                {nutrition.sodium?.amount?.toFixed(0)}
                {nutrition.sodium?.unit}
              </Text>
            </Col>
            <Col>
              <p>Sugar</p>
              <Text type="secondary">
                {nutrition.sugar?.amount?.toFixed(0)}
                {nutrition.sugar?.unit}
              </Text>
            </Col>
          </Row>
        </div>
        <Divider />
        <div className={styles.ingredients}>
          <div className={styles.titleHeader}>
            <h2>Ingredients</h2>
            <Tooltip title="Toggle units of measure">
              <Radio.Group
                options={[
                  { label: "Metric", value: "metric" },
                  { label: "Imperial", value: "us" },
                ]}
                onChange={toggleMeasure}
                value={recipeMeasure}
                optionType="button"
                buttonStyle="solid"
              />
            </Tooltip>
          </div>

          <List
            size="small"
            dataSource={details?.extendedIngredients}
            renderItem={(ingredient) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<CheckCircleOutlined />}
                  title={`${ingredient.measures[recipeMeasure].amount.toFixed(
                    0
                  )} ${
                    ingredient.measures[recipeMeasure].unitShort
                  } ${ingredient.originalName.toLowerCase()}`}
                ></List.Item.Meta>
              </List.Item>
            )}
          />
        </div>
        <Divider />
        <h2>Instructions</h2>
        <ol className={styles.List}>
          {details?.instructions?.map((instruction) => (
            <li key={instruction.number}>
              <Text type="secondary">{instruction.step}</Text>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
};

export default RecipeDetails;
