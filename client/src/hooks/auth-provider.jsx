import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
const AuthProviderContext = createContext({});

const AuthProvider = ({ children, ...props }) => {
  const [access, setAccess] = useState(
    localStorage.getItem("access")
      ? JSON.parse(localStorage.getItem("access"))
      : {}
  );
  const [authTokens, setAuthTokens] = useState(
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : {}
  );
  const [user, setUser] = useState(
    localStorage.getItem("authTokens")
      ? jwtDecode(JSON.parse(localStorage.getItem("authTokens")).access)
      : null
  );

  useEffect(() => {
    setUser(() =>
      localStorage.getItem("authTokens")
        ? jwtDecode(JSON.parse(localStorage.getItem("authTokens")).access)
        : null
    );
    console.log("connection started");
  }, [authTokens]);

  const value = {
    user,
    setUser,
    access,
    setAccess,
    authTokens,
    setAuthTokens,
  };

  return (
    <AuthProviderContext.Provider {...props} value={value}>
      {children}
    </AuthProviderContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthProviderContext);

  if (context === undefined) throw new Error("unknown error");

  return context;
};

export default AuthProvider;
