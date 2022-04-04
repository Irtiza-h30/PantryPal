import React from "react";
import { Card, Form, Input, Button, notification } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { useNavigate, Link } from "react-router-dom";

import { useUserContext } from "contexts/UserContext";
import { LOGIN } from "graphql/mutations";

import styles from "./index.module.scss";

const { Item } = Form;
const { Password } = Input;

const Login = () => {
  const [login] = useMutation(LOGIN);

  const { updateToken } = useUserContext();

  const navigate = useNavigate();

  const handleLogin = ({ email, password }) => {
    login({ variables: { email, password } })
      .then(({ data }) => {
        updateToken(data?.login?.token);
        navigate("/explore");
      })
      .catch((error) => {
        notification.error({
          message: "Error",
          description: error.message,
        });
      });
  };

  return (
    <div className={styles.Container}>
      <Card className={styles.Card}>
        <div className={styles.Title}>
          <h1>Welcome</h1>
        </div>
        <Form layout="vertical" name="login" onFinish={handleLogin}>
          <Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email",
              },
              {
                type: "email",
                message: "The input is not a valid email",
              },
            ]}
          >
            <Input
              placeholder="Enter email"
              prefix={<MailOutlined style={{ color: "#ababab" }} />}
            />
          </Item>

          <Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password",
              },
            ]}
          >
            <Password
              placeholder="Enter password"
              prefix={<LockOutlined style={{ color: "#ababab" }} />}
              visibilityToggle
            />
          </Item>
          <div className={styles.Footer}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            <div className={styles.Link}>
              New to PantryPal? <Link to="/register">Get Started</Link>
            </div>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
