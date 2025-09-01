import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "../types";

type AuthContextType = {
  user: User | null;
  signin: (user: User) => void;
  signout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Temporary default user for development so Dashboard can render without sign-in
  const [user, setUser] = useState<User | null>({
    id: "1",
    name: "Jay Patel",
    email: "jay@example.com",
    dateOfBirth: "2000-01-01",
  });

  const signin = (user: User) => setUser(user);
  const signout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};