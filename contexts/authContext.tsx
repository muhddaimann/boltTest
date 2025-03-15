import { createContext, useContext, useEffect, useState } from "react";
import { storeToken, getToken, removeToken } from "@/contexts/tokenContext";

interface AuthContextType {
  isAuthenticated: boolean;
  username: string;
  login: (username: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await getToken();
      setIsAuthenticated(!!token);
    };
    checkAuthStatus();
  }, []);

  const login = async (username: string) => {
    if (!username.trim()) {
      console.error("Login failed: Username is required.");
      return;
    }
    
    const expirationTime = Math.floor(Date.now() / 1000) + 86400;
    await storeToken("dummyToken", expirationTime);
    setUsername(username);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await removeToken();
    setUsername("");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
