import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useLazyQuery } from "@apollo/client";
import { Form, List, Divider, Alert, Layout, Button } from "antd";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { pickBy, identity, isEmpty } from "lodash";

import { useUserContext } from "contexts/UserContext";

import Autocomplete from "components/Autocomplete";
import LoadMore from "components/LoadMore";
import RecipeCard from "components/RecipeCard";
import SortBy from "components/SortBy";

import { GET_COMPLEX_SEARCH } from "graphql/queries";
import { GET_AUTOCOMPLETE_RECIPES } from "graphql/queries";

import styles from "./index.module.scss";
import theme from "styles/variables.scss";
import IngredientsForm from "components/IngredientsForm";

const { Content, Sider } = Layout;

const Explore = () => {
  const [form] = Form.useForm();
  const queryParams = createSearchParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { diet, intolerances, excludeIngredients } = useUserContext();

  const [sortValue, setSortValue] = useState("popularity");
  const [sortDirection, setSortDirection] = useState("desc");
  const [collapsed, setCollapsed] = useState(false);
  const [query, setQuery] = useState("");

  const [getComplexSearch, { data, loading, error, fetchMore }] =
    useLazyQuery(GET_COMPLEX_SEARCH);

  const currentParams = useMemo(
    () => Object.fromEntries([...searchParams]),
    [searchParams]
  );

  const isParamsEmpty = useMemo(() => isEmpty(currentParams), [currentParams]);

  const [
    getAutocompleteSearch,
    { data: autoCompletedRecipes, loading: loadingAutoComplete },
  ] = useLazyQuery(GET_AUTOCOMPLETE_RECIPES);

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
        query,
        ...rest,
      },
      identity
    );
    Object.keys(formFields).forEach((key) => {
      queryParams.set(key, formFields[key]);
    });

    navigate(`/explore?${queryParams.toString()}`, { replace: true });
  }, [form, queryParams, navigate, query]);

  useEffect(() => {
    if (!isParamsEmpty) {
      setSortDirection(currentParams.sortDirection);
      setSortValue(currentParams.sort);
      setQuery(currentParams.query);
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

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query?.trim().length) {
        getAutocompleteSearch({ variables: { query } });
      }
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [getAutocompleteSearch, query]);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

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
    <Layout hasSider>
      <Sider
        width={340}
        className={styles.Sider}
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        collapsedWidth={0}
        zeroWidthTriggerStyle={{ backgroundColor: theme["primary-color"] }}
      >
        <IngredientsForm form={form} />
        <div className={styles.Submit}>
          <Button type="primary" onClick={handleOnSearchItems}>
            Apply Filters
          </Button>
        </div>
      </Sider>
      <Content className={styles.Content}>
        <div className={styles.Header}>
          <Autocomplete
            placeholder="Search for meal..."
            autocompleteItems={autoCompletedRecipes?.getAutocompleteRecipes?.map(
              (i) => ({
                value: i.title,
              })
            )}
            onSearch={handleOnSearchItems}
            loadingAutocomplete={loadingAutoComplete}
            query={query}
            setQuery={setQuery}
          />
        </div>
        {isParamsEmpty ? (
          <Alert
            description="Search for a meal to view recipes"
            type="info"
            showIcon
          />
        ) : (
          <>
            <Divider orientation="right">
              <SortBy
                setSortValue={setSortValue}
                sortValue={sortValue}
                sortDirection={sortDirection}
                setSortDirection={setSortDirection}
              />
            </Divider>
            <List
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
                <List.Item>
                  <RecipeCard key={recipe.id} {...recipe} />
                </List.Item>
              )}
              loadMore={
                <LoadMore
                  {...data?.getComplexSearch}
                  onLoadMore={onLoadMore}
                  loading={loading}
                />
              }
            />
          </>
        )}
      </Content>
    </Layout>
  );
};

export default Explore;
