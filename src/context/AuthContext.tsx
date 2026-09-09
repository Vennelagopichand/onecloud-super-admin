import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext =
  createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({
  children,
}: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] =
    useState<boolean>(() => {
      return localStorage.getItem("onecloud-auth") === "true";
    });

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem(
        "onecloud-auth",
        "true"
      );
    } else {
      localStorage.removeItem("onecloud-auth");
    }
  }, [isAuthenticated]);

  function login(
    email: string,
    password: string
  ): boolean {
    const validEmail = "admin@onecloud.com";
    const validPassword = "admin123";

    if (
      email === validEmail &&
      password === validPassword
    ) {
      setIsAuthenticated(true);
      return true;
    }

    return false;
  }

  function logout() {
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}

export default AuthProvider;
