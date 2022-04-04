import React from "react";
import PropTypes from "prop-types";
import {
  SearchOutlined,
  BookOutlined,
  UserOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Avatar } from "antd";
import { useApolloClient } from "@apollo/client";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { useUserContext } from "contexts/UserContext";
import { deleteToken, getToken } from "utils/localStorage";
import logo from "images/logo.png";

import styles from "./index.module.scss";

const { Content, Header } = Layout;
const { Item, SubMenu, ItemGroup, Divider } = Menu;

const AppLayout = ({ children }) => {
  const { fullName } = useUserContext();
  const client = useApolloClient();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = getToken();

  const handleLogout = () => {
    client.clearStore();
    deleteToken();
    navigate("/login");
  };

  const getActiveKey = () => {
    return [location.pathname.substring(1)];
  };

  return (
    <Layout>
      <Header className={styles.Navbar}>
        <Link className={styles.LogoContainer} to="/explore">
          <img src={logo} alt="logo" />
        </Link>
        <Menu
          mode="horizontal"
          selectedKeys={getActiveKey()}
          className={styles.Menu}
        >
          <Item key="explore" icon={<SearchOutlined />}>
            <Link to="/explore">Explore</Link>
          </Item>
          <Item key="pantry" icon={<ShoppingCartOutlined />}>
            <Link to="/pantry">Pantry</Link>
          </Item>
          <Item key="cookbook" icon={<BookOutlined />}>
            <Link to="/cookbook">Cookbook</Link>
          </Item>
          {isAuthenticated ? (
            <SubMenu
              key="SubMenu"
              icon={
                <Avatar className={styles.Avatar}>
                  {fullName
                    ?.match(/\b(\w)/g)
                    ?.join("")
                    ?.toUpperCase()}
                </Avatar>
              }
            >
              <ItemGroup title={fullName}>
                <Item key="account" icon={<UserOutlined />}>
                  <Link to="/account">Edit profile</Link>
                </Item>
                <Divider />
                <Item
                  key="logout"
                  icon={<LogoutOutlined />}
                  onClick={() => handleLogout()}
                >
                  Logout
                </Item>
              </ItemGroup>
            </SubMenu>
          ) : (
            <Item key="login" icon={<LoginOutlined />}>
              <Link to="/login">Login</Link>
            </Item>
          )}
        </Menu>
      </Header>
      <Content className={styles.Content}>{children}</Content>
    </Layout>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node,
};

AppLayout.defaultProps = {
  children: null,
};

export default AppLayout;
