import React, { useState } from "react";
import PropTypes from "prop-types";
import { Radio, Tag, Collapse } from "antd";

import INGREDIENTS from "constants/ingredients.json";

import styles from "./index.module.scss";

const { Panel } = Collapse;
const { CheckableTag } = Tag;
const { Group } = Radio;

const List = ({ includeIngredients, setIncludeIngredients }) => {
  const [group, setGroup] = useState("Produce");

  const handleOnChangeTag = (item) => (checked) => {
    if (checked) {
      setIncludeIngredients([...includeIngredients, item]);
    } else {
      setIncludeIngredients((prevItems) => prevItems.filter((i) => i !== item));
    }
  };

  return (
    <>
      <Group
        buttonStyle="solid"
        value={group}
        onChange={(e) => setGroup(e.target.value)}
      >
        {Object.keys(INGREDIENTS).map((i) => (
          <Radio.Button value={i} key={i}>
            {i}
          </Radio.Button>
        ))}
      </Group>
      {INGREDIENTS[group].map((subgroup) => {
        return (
          <Collapse key={subgroup.name}>
            <Panel header={subgroup.name}>
              {subgroup.ingredients.map((item) => (
                <CheckableTag
                  key={item}
                  onChange={handleOnChangeTag(item)}
                  checked={includeIngredients.indexOf(item) > -1}
                  className={styles.Tag}
                >
                  {item}
                </CheckableTag>
              ))}
            </Panel>
          </Collapse>
        );
      })}
    </>
  );
};

List.propTypes = {
  includeIngredients: PropTypes.instanceOf(Array),
  setIncludeIngredients: PropTypes.func,
};

List.defaultProps = {
  includeIngredients: [],
  setIncludeIngredients: () => {},
};

export default List;
