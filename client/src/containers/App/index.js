import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AppLayout from "containers/Layout";
import Account from "containers/Account";
import Cookbook from "containers/Cookbook";
import Explore from "containers/Explore";
import Login from "containers/Login";
import Pantry from "containers/Pantry";
import Register from "containers/Register";
import RecipeDetails from "containers/RecipeDetails";
import UserProvider from "contexts/UserProvider";
import ViewportProvider from "contexts/ViewportProvider";

import AuthenticatedRoute from "./components/AuthenticatedRoute";

import "styles/theme/antd.less";
import "styles/index.module.scss";

const App = () => {
  return (
    <UserProvider>
      <ViewportProvider>
        <Router>
          <AppLayout>
            <Routes>
              <Route element={<AuthenticatedRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
              <Route path="/account" element={<Account />}></Route>
              <Route path="/cookbook" element={<Cookbook />}></Route>
              <Route path="/recipe/:id" element={<RecipeDetails />}></Route>
              <Route path="/explore" element={<Explore />}></Route>
              <Route path="/pantry" element={<Pantry />}></Route>
              <Route path="*" element={<Navigate to="/explore" />} />
            </Routes>
          </AppLayout>
        </Router>
      </ViewportProvider>
    </UserProvider>
  );
};

export default App;
