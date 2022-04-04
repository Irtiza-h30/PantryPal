import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  Card,
  Tooltip,
  Button,
  Divider,
  Form,
  Collapse,
  Alert,
  List as AntdList,
} from "antd";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { pickBy, identity, isEmpty } from "lodash";

import { useUserContext } from "contexts/UserContext";
import { useViewportContext } from "contexts/ViewportContext";
import LoadMore from "components/LoadMore";
import RecipeCard from "components/RecipeCard";
import SortBy from "components/SortBy";
import { GET_COMPLEX_SEARCH } from "graphql/queries";

import List from "./Components/List";
import Table from "./Components/Table";

import styles from "./index.module.scss";

import {
  DeleteOutlined,
  TableOutlined,
  ProfileOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import IngredientsForm from "components/IngredientsForm";

const { Panel } = Collapse;

const Pantry = () => {
  const [form] = Form.useForm();
  const queryParams = createSearchParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { diet, intolerances, excludeIngredients } = useUserContext();
  const { width } = useViewportContext();

  const [includeIngredients, setIncludeIngredients] = useState([]);
  const [layout, setLayout] = useState("table");
  const [sortValue, setSortValue] = useState("popularity");
  const [sortDirection, setSortDirection] = useState("desc");

  const [getComplexSearch, { data, loading, error, fetchMore }] =
    useLazyQuery(GET_COMPLEX_SEARCH);

  const currentParams = useMemo(
    () => Object.fromEntries([...searchParams]),
    [searchParams]
  );

  const isParamsEmpty = useMemo(() => isEmpty(currentParams), [currentParams]);

  const handleOnSearchItems = useCallback(() => {
    const { carbs, fat, protein, calories, ...rest } = form.getFieldsValue();

    const formFields = pickBy(
      {
        minCalories: calories[0],
        maxCalories: calories[1],
        minCarbs: carbs[0],
        maxCarbs: carbs[1],
        minFat: fat[0],
        maxFat: fat[1],
        minProtein: protein[0],
        maxProtein: protein[1],
        includeIngredients,
        ...rest,
      },
      identity
    );

    Object.keys(formFields).forEach((key) => {
      queryParams.set(key, formFields[key]);
    });

    navigate(`/pantry?${queryParams.toString()}`, { replace: true });
  }, [form, queryParams, includeIngredients, navigate]);

  useEffect(() => {
    if (!isParamsEmpty) {
      setSortDirection(currentParams.sortDirection);
      setSortValue(currentParams.sort);
      setIncludeIngredients(currentParams?.includeIngredients?.split(","));
      form.setFieldsValue({
        ...currentParams,
        calories: [currentParams.minCalories, currentParams.maxCalories],
        carbs: [currentParams.minCarbs, currentParams.maxCarbs],
        fat: [currentParams.minFat, currentParams.maxFat],
        protein: [currentParams.minProtein, currentParams.maxProtein],
        intolerances: currentParams.intolerances
          ? currentParams.intolerances.split(",")
          : [],
        excludeIngredients: currentParams.excludeIngredients
          ? currentParams.excludeIngredients.split(",")
          : [],
      });
      getComplexSearch({
        variables: {
          params: {
            ...currentParams,
          },
        },
      });
    }
  }, [getComplexSearch, form, currentParams, isParamsEmpty]);

  const onLoadMore = () => {
    const { number, offset, totalResults } = data?.getComplexSearch;
    if (number + offset >= totalResults) {
      return null;
    }
    return fetchMore({
      variables: {
        offset: offset + 20,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const previousEntry = previousResult.getComplexSearch;
        const newItems = fetchMoreResult.getComplexSearch;
        return {
          getComplexSearch: {
            ...newItems,
            results: [...previousEntry.results, ...newItems.results],
            __typename: previousEntry.__typename,
          },
        };
      },
    });
  };

  useEffect(() => {
    if (sortDirection && sortValue && !isParamsEmpty) {
      getComplexSearch({
        variables: {
          params: {
            ...currentParams,
            sortDirection,
            sort: sortValue,
          },
        },
      });
    }
  }, [
    isParamsEmpty,
    getComplexSearch,
    sortDirection,
    sortValue,
    currentParams,
  ]);

  useEffect(() => {
    if (isParamsEmpty) {
      form.setFieldsValue({
        diet,
        intolerances,
        excludeIngredients,
      });
    }
  }, [form, diet, intolerances, excludeIngredients, isParamsEmpty]);

  const layoutIcon = useMemo(() => {
    if (layout === "list") {
      return (
        <Tooltip title="Switch to table view">
          <ProfileOutlined
            className={styles.Icon}
            onClick={() => setLayout("table")}
          />
        </Tooltip>
      );
    }
    return (
      <Tooltip title="Switch to list view">
        <TableOutlined
          className={styles.Icon}
          onClick={() => setLayout("list")}
        />
      </Tooltip>
    );
  }, [layout]);

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

  return (
    <div className={styles.Container}>
      <div className={styles.Sidebar}>
        <div className={styles.Search}>
          <Tooltip
            title={
              !includeIngredients.length &&
              "Select or search for ingredients to view curated recipes "
            }
          >
            <Button
              type="primary"
              disabled={!includeIngredients.length}
              onClick={handleOnSearchItems}
              icon={<SearchOutlined />}
            >
              Search
            </Button>
          </Tooltip>
        </div>
        <div className={styles.PanelContainer}>
          <Card
            title={<h3>{layoutIcon}Ingredients</h3>}
            className={styles.Card}
            bodyStyle={{
              height: 565,
              overflowY: "auto",
            }}
            extra={
              <>
                <Tooltip title="Remove all ingredients">
                  <DeleteOutlined
                    className={styles.Icon}
                    onClick={() => setIncludeIngredients([])}
                  />
                </Tooltip>
              </>
            }
          >
            <div className={styles.IngredientsCard}>
              <h4>
                {includeIngredients.length} selected{" "}
                {includeIngredients.length === 1 ? "ingredient" : "ingredients"}
              </h4>
              {layout === "list" ? (
                <List
                  includeIngredients={includeIngredients}
                  setIncludeIngredients={setIncludeIngredients}
                />
              ) : (
                <Table
                  includeIngredients={includeIngredients}
                  setIncludeIngredients={setIncludeIngredients}
                />
              )}
            </div>
          </Card>
          {width > 1500 ? (
            <Collapse>
              <Panel key="filter" header={<h3>Filters</h3>} forceRender>
                <IngredientsForm form={form} onFinish={handleOnSearchItems} />
              </Panel>
            </Collapse>
          ) : (
            <Card
              title={<h3>Filters</h3>}
              className={styles.Card}
              bodyStyle={{
                height: 500,
                overflowY: "auto",
              }}
            >
              <IngredientsForm form={form} onFinish={handleOnSearchItems} />
            </Card>
          )}
        </div>
      </div>
      {isParamsEmpty ? (
        <Alert
          description="Select or search for ingredients to view curated recipes"
          type="info"
          showIcon
          className={styles.Alert}
        />
      ) : (
        <div className={styles.Recipes}>
          <Divider orientation="right">
            <SortBy
              setSortValue={setSortValue}
              sortValue={sortValue}
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
            />
          </Divider>
          <AntdList
            className={styles.List}
            grid={{
              gutter: 16,
              xs: 1,
            }}
            dataSource={data?.getComplexSearch?.results}
            loading={loading}
            locale={{
              emptyText:
                "No recipes found. Please refine search and try again.",
            }}
            header={
              !loading && (
                <h4>
                  {data?.getComplexSearch?.totalResults}{" "}
                  {data?.getComplexSearch?.totalResults === 1
                    ? "recipe"
                    : "recipes"}{" "}
                  found
                </h4>
              )
            }
            renderItem={(recipe) => (
              <AntdList.Item>
                <RecipeCard key={recipe.id} {...recipe} showMissedIngredients />
              </AntdList.Item>
            )}
            loadMore={
              <LoadMore
                {...data?.getComplexSearch}
                onLoadMore={onLoadMore}
                loading={loading}
              />
            }
          />
        </div>
      )}
    </div>
  );
};

export default Pantry;
