import React from "react";
import PropTypes from "prop-types";
import { AutoComplete, Input } from "antd";

import styles from "./index.module.scss";

const { Search } = Input;

const Autocomplete = ({
  autocompleteItems,
  onSearch,
  placeholder,
  query,
  setQuery,
}) => {
  const handleChange = (e) => {
    setQuery(e);
  };

  return (
    <AutoComplete
      options={autocompleteItems}
      onSearch={handleChange}
      onSelect={handleChange}
      filterOption={false}
      getPopupContainer={(trigger) => trigger.parentNode}
      className={styles.AutoComplete}
      value={query}
    >
      <Search
        placeholder={placeholder}
        enterButton
        allowClear
        size="large"
        onSearch={onSearch}
      />
    </AutoComplete>
  );
};

Autocomplete.propTypes = {
  autocompleteItems: PropTypes.instanceOf(Array),
  onSearch: PropTypes.func,
  loadingAutocomplete: PropTypes.bool,
  placeholder: PropTypes.string,
  query: PropTypes.string,
  setQuery: PropTypes.func,
};

Autocomplete.defaultProps = {
  autocompleteItems: [],
  onSearch: () => {},
  loadingAutocomplete: false,
  placeholder: "",
  query: "",
  setQuery: () => {},
};

export default Autocomplete;
