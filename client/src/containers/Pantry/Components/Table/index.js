import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Button, Table as AntdTable, Empty, AutoComplete, Form } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import INGREDIENT_LIST from "constants/ingredientList.json";

const Table = ({ includeIngredients, setIncludeIngredients }) => {
  const [form] = Form.useForm();
  const COLUMNS = [
    {
      title: "Ingredient",
      dataIndex: "ingredient",
      key: "ingredient",
    },
    {
      title: "",
      dataIndex: "ingredient",
      width: 80,
      render: (item) => (
        <Button
          title="removeItem"
          icon={<DeleteOutlined />}
          onClick={() => onRemoveIngredient(item)}
        />
      ),
    },
  ];

  const tableData = useMemo(
    () =>
      includeIngredients.map((value) => ({
        ingredient: value,
      })),
    [includeIngredients]
  );

  const onRemoveIngredient = (item) => {
    setIncludeIngredients((includeIngredients) =>
      includeIngredients.filter((i) => i !== item)
    );
  };

  const onAddIngredient = (item) => {
    setIncludeIngredients([...new Set([item, ...includeIngredients])]);
    form.resetFields();
  };

  return (
    <>
      <Form form={form}>
        <Form.Item name="autoComplete">
          <AutoComplete
            options={INGREDIENT_LIST}
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
            onSelect={onAddIngredient}
            allowClear
            placeholder="Search for ingredient..."
          />
        </Form.Item>
      </Form>
      <AntdTable
        scroll={{ y: 300 }}
        columns={COLUMNS}
        dataSource={tableData}
        rowKey="ingredient"
        pagination={false}
        locale={{ emptyText: <Empty description="No ingredients selected" /> }}
      />
    </>
  );
};

Table.propTypes = {
  includeIngredients: PropTypes.instanceOf(Array),
  setIncludeIngredients: PropTypes.func,
};

Table.defaultProps = {
  includeIngredients: [],
  setIncludeIngredients: () => {},
};

export default Table;
