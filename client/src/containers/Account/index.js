import React, { useEffect, useState } from "react";
import {
  Card,
  Form,
  Input,
  Select,
  Button,
  notification,
  Radio,
  Divider,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";

import { PASSWORD_REGEX } from "constants/index";
import INGREDIENT_LIST from "constants/ingredientList.json";
import { useUserContext } from "contexts/UserContext";
import { GET_USER } from "graphql/queries";
import { UPDATE_USER } from "graphql/mutations";

import styles from "./index.module.scss";

const { Item } = Form;
const { Option } = Select;
const { Password } = Input;

const Account = () => {
  const [password, setPassword] = useState(false);
  const [form] = Form.useForm();
  const { id, fullName, diet, excludeIngredients, intolerances, measure } =
    useUserContext();

  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [
      {
        query: GET_USER,
        variables: { userId: id },
      },
    ],
  });

  const handleUpdateUser = ({
    fullName,
    password,
    diet,
    intolerances,
    excludeIngredients,
    measure,
  }) => {
    updateUser({
      variables: {
        userId: id,
        fullName,
        password,
        diet,
        intolerances,
        excludeIngredients,
        measure,
      },
    })
      .then(() => {
        notification.success({
          message: "Success",
          description: "Account successfully updated",
        });
      })
      .catch((err) => {
        notification.error({
          message: "Error",
          description: "Account could not be updated",
        });
      });
  };

  const onPasswordChange = (e) => {
    const { value } = e.target;

    setPassword(value ? true : false);
  };

  useEffect(() => {
    form.setFieldsValue({
      fullName,
      diet,
      intolerances,
      measure,
      excludeIngredients,
    });
  }, [form, fullName, diet, intolerances, measure, excludeIngredients]);

  return (
    <div className={styles.Container}>
      <Card className={styles.Card}>
        <div className={styles.Title}>
          <h1>Edit Profile</h1>
        </div>
        <Form
          layout="vertical"
          name="login"
          onFinish={handleUpdateUser}
          form={form}
        >
          <Item label="Full Name" name="fullName">
            <Input
              value={fullName}
              placeholder="Enter your full name"
              prefix={<UserOutlined style={{ color: "#ababab" }} />}
            />
          </Item>
          <Divider />
          <Item
            label="New Password"
            name="password"
            rules={[
              {
                pattern: PASSWORD_REGEX,
                message:
                  "Password must contain a minimum of six characters, at least one letter and one number",
              },
            ]}
          >
            <Password
              placeholder="Enter new password"
              prefix={<LockOutlined style={{ color: "#ababab" }} />}
              visibilityToggle
              onChange={onPasswordChange}
            />
          </Item>
          <Item
            label="Confirm New Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: password,
                message: "The password confirmation does not match",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error("The password confirmation does not match")
                  );
                },
              }),
            ]}
            hasFeedback
          >
            <Password
              placeholder="Confirm your password"
              prefix={<LockOutlined style={{ color: "#ababab" }} />}
              visibilityToggle
            />
          </Item>
          <Divider />
          <Item label="Diet" name="diet">
            <Select placeholder="Select Diet(s)" allowClear>
              <Option value="Gluten Free">Gluten Free</Option>
              <Option value="Ketogenic">Ketogenic</Option>
              <Option value="Lacto-Vegetarian">Lacto-Vegetarian</Option>
              <Option value="Ovo-Vegetarian">Ovo-Vegetarian</Option>
              <Option value="Paleo">Paleo</Option>
              <Option value="Pescetarian">Pescetarian</Option>
              <Option value="Vegan">Vegan</Option>
              <Option value="Vegetarian">Vegetarian</Option>
            </Select>
          </Item>
          <Item label="Intolerances" name="intolerances">
            <Select
              placeholder="Select intolerances"
              allowClear
              mode="multiple"
            >
              <Option value="Dairy">Dairy</Option>
              <Option value="Egg">Egg</Option>
              <Option value="Gluten">Gluten</Option>
              <Option value="Grain">Grain</Option>
              <Option value="Peanut">Peanut</Option>
              <Option value="Seafood">Seafood</Option>
              <Option value="Sesame">Sesame</Option>
              <Option value="Shellfish">Shellfish</Option>
              <Option value="Soy">Soy</Option>
              <Option value="Sulfite">Sulfite</Option>
              <Option value="Tree Nut">Tree Nut</Option>
              <Option value="Wheat">Wheat</Option>
            </Select>
          </Item>
          <Item
            name="excludeIngredients"
            label="Excluded Ingredients"
            tooltip="Ingredients you do not want us to include in recipes"
          >
            <Select
              options={INGREDIENT_LIST}
              mode="multiple"
              placeholder="Select excluded ingredients"
              allowClear
            />
          </Item>
          <Item label="Measure" name="measure">
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="metric">Metric</Radio.Button>
              <Radio.Button value="us">Imperial</Radio.Button>
            </Radio.Group>
          </Item>
          <div className={styles.Submit}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Account;
