import React from "react";
import { Card, Form, Input, Button, notification } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { useNavigate, Link } from "react-router-dom";

import { PASSWORD_REGEX } from "constants/index";
import { useUserContext } from "contexts/UserContext";
import { CREATE_USER } from "graphql/mutations";

import styles from "./index.module.scss";

const { Item } = Form;
const { Password } = Input;

const Register = () => {
  const [register] = useMutation(CREATE_USER);

  const { updateToken } = useUserContext();

  const navigate = useNavigate();

  const handleRegister = ({ fullName, email, password }) => {
    register({ variables: { fullName, email, password } })
      .then(({ data }) => {
        updateToken(data?.createUser?.token);
        navigate("/explore");
        notification.success({
          message: "Success",
          description: "Account successfully created",
        });
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
          <h1>Create Account</h1>
        </div>
        <Form layout="vertical" name="login" onFinish={handleRegister}>
          <Item
            label="Full Name"
            name="fullName"
            rules={[
              {
                required: true,
                message: "Please input your full name",
              },
            ]}
          >
            <Input
              placeholder="Enter your full name"
              prefix={<UserOutlined style={{ color: "#ababab" }} />}
            />
          </Item>

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
              {
                pattern: PASSWORD_REGEX,
                message:
                  "Password must contain a minimum of six characters, at least one letter and one number",
              },
            ]}
            hasFeedback
          >
            <Password
              placeholder="Enter password"
              prefix={<LockOutlined style={{ color: "#ababab" }} />}
              visibilityToggle
            />
          </Item>

          <Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password",
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

          <div className={styles.Footer}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
            <div className={styles.Link}>
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
