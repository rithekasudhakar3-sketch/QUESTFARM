import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  email: string;
  username: string;
  password: string; // In production, this would be hashed
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (emailOrUsername: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = "questfarm_users";
const SESSION_STORAGE_KEY = "questfarm_session";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load session on mount
  useEffect(() => {
    const sessionData = localStorage.getItem(SESSION_STORAGE_KEY);
    if (sessionData) {
      try {
        const sessionUser = JSON.parse(sessionData);
        // Verify user still exists
        const users = getUsers();
        const foundUser = users.find((u) => u.id === sessionUser.id);
        if (foundUser) {
          setUser(foundUser);
          setIsAuthenticated(true);
        } else {
          // Session user doesn't exist, clear session
          localStorage.removeItem(SESSION_STORAGE_KEY);
        }
      } catch (error) {
        console.error("Error loading session:", error);
        localStorage.removeItem(SESSION_STORAGE_KEY);
      }
    }
  }, []);

  const getUsers = (): User[] => {
    const usersData = localStorage.getItem(USERS_STORAGE_KEY);
    if (!usersData) return [];
    try {
      return JSON.parse(usersData);
    } catch (error) {
      console.error("Error parsing users data:", error);
      return [];
    }
  };

  const saveUsers = (users: User[]) => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  };

  const login = async (
    emailOrUsername: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    const users = getUsers();
    const foundUser = users.find(
      (u) => (u.email === emailOrUsername || u.username === emailOrUsername) && u.password === password
    );

    if (!foundUser) {
      return { success: false, error: "Invalid email/username or password" };
    }

    setUser(foundUser);
    setIsAuthenticated(true);
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(foundUser));
    return { success: true };
  };

  const signup = async (
    email: string,
    username: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    const users = getUsers();

    // Check if email already exists
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: "Email already registered" };
    }

    // Check if username already exists
    if (users.some((u) => u.username.toLowerCase() === username.toLowerCase())) {
      return { success: false, error: "Username already taken" };
    }

    // Create new user
    const newUser: User = {
      id: crypto.randomUUID(),
      email: email.toLowerCase(),
      username,
      password, // In production, this would be hashed
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveUsers(users);

    // Auto-login after signup
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newUser));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem(SESSION_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

