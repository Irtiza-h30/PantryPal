import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";

import styles from "./index.module.scss";

const LoadMore = ({ number, offset, totalResults, onLoadMore, loading }) => {
  if (number + offset < totalResults) {
    return (
      <div className={styles.LoadMore}>
        <Button
          icon={<DoubleRightOutlined rotate={90} />}
          onClick={onLoadMore}
          loading={loading}
        >
          Load More
        </Button>
      </div>
    );
  }
  return null;
};

LoadMore.propTypes = {
  number: PropTypes.number,
  offset: PropTypes.number,
  totalResults: PropTypes.number,
  onLoadMore: PropTypes.func,
  loading: PropTypes.bool,
};

LoadMore.defaultProps = {
  number: 0,
  offset: 0,
  totalResults: 0,
  onLoadMore: () => {},
  loading: false,
};

export default LoadMore;
