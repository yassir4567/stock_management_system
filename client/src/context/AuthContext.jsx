import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../api/auth/getCurrentUser";
import { loginUser } from "../api/auth/login";
import { logoutUser } from "../api/auth/logout";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoading(false);
        return;
      }

      const result = await getCurrentUser();

      if (!result.success) {
        localStorage.removeItem("token");
        setIsLoading(false);
        setUser(null);
        return;
      }

      setUser(result.data.user);
      setIsLoading(false);
    };
    loadUser();
  }, []);

  const login = async (credentials) => {
    const result = await loginUser(credentials);

    if (!result.success) {
      return result;
    }

    const { user, token } = result.data;

    localStorage.setItem("token", token);
    setUser(user);

    return {
      success: true,
      user,
    };
  };

  const logout = async () => {
    const result = await logoutUser();

    localStorage.removeItem("token");
    setUser(null);
  };

  const values = {
    user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

function useAuth() {
  return useContext(AuthContext);
}

export { useAuth, AuthProvider };
