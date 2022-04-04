import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useLazyQuery } from "@apollo/client";

import UserContext from "contexts/UserContext";
import { GET_USER } from "graphql/queries";
import { getToken, setToken } from "utils/localStorage";
import { parseJwt } from "utils/jwt";

const UserProvider = ({ children }) => {
  const [getUser, { data }] = useLazyQuery(GET_USER);

  const getUserProfile = useCallback(() => {
    const token = getToken();
    if (token) {
      const { id } = parseJwt(token);
      getUser({ variables: { userId: id } });
    }
  }, [getUser]);

  const updateToken = (newToken) => {
    setToken(newToken);
    getUserProfile();
  };

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  return (
    <UserContext.Provider
      value={{
        ...data?.getUser,
        updateToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node,
};

UserProvider.defaultProps = {
  children: null,
};

export default UserProvider;
