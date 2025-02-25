import { createContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { auth } from "../utils/firebase";

interface AuthContextType {
  currentUser: User | null;
}

export const AuthContext = createContext<AuthContextType>({ currentUser: null });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        await signInAnonymously(auth);
      }
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
      <AuthContext.Provider value={{ currentUser }}>
          {children}
      </AuthContext.Provider>
  );
};
