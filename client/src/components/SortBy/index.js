import React from "react";
import PropTypes from "prop-types";
import { Menu, Dropdown } from "antd";
import {
  FilterOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
} from "@ant-design/icons";

import { SORT_ENUMS } from "constants";

import styles from "./index.module.scss";

const { Item } = Menu;

const SortBy = ({
  setSortValue,
  sortValue,
  sortDirection,
  setSortDirection,
}) => {
  const onChangeSortDirection = () => {
    setSortDirection(sortDirection === "desc" ? "asc" : "desc");
  };

  const onChangeSortValue = (value) => {
    setSortValue(value);
  };

  const sortMenu = (
    <Menu selectedKeys={[sortValue]}>
      {Object.keys(SORT_ENUMS).map((i) => (
        <Item key={i} onClick={() => onChangeSortValue(i)}>
          {SORT_ENUMS[i]}
        </Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={sortMenu} className={styles.sort}>
      <div>
        <div className={styles.sortIcon}>
          <FilterOutlined />
        </div>
        Sort By -
        <span className={styles.highlight} onClick={onChangeSortDirection}>
          {SORT_ENUMS[sortValue]}
          {sortDirection === "desc" ? (
            <>
              <CaretDownOutlined />
              (desc)
            </>
          ) : (
            <>
              <CaretUpOutlined />
              (asc)
            </>
          )}
        </span>
      </div>
    </Dropdown>
  );
};

SortBy.propTypes = {
  setSortValue: PropTypes.func,
  sortValue: PropTypes.string,
  setSortDirection: PropTypes.func,
  sortDirection: PropTypes.string,
};

SortBy.defaultProps = {
  setSortValue: () => {},
  sortValue: "popularity",
  setSortDirection: () => {},
  sortDirection: "desc",
};

export default SortBy;
