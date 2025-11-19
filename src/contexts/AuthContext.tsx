import { createContext, useState } from "react";
import User from "types/User";
import { apiClient } from "config/Axios";

interface AuthContextProps {
  authUser?: User;
  profileType?: "ADMIN" | "INVITADO";
  loginUser: (newUser: User) => any;
  validateUser: () => User | undefined;
  logoutUser: () => Promise<void>;
  sessionExpired: boolean;
  setSessionExpired: (expired: boolean) => void;
}

const AuthContext = createContext<AuthContextProps>({
  authUser: undefined,
  profileType: undefined,
  loginUser: () => {},
  validateUser: () => undefined,
  logoutUser: async () => {},
  sessionExpired: false,
  setSessionExpired: () => {},
});

export const AuthContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [authUser, setAuthUser] = useState<User | undefined>();
  const [sessionExpired, setSessionExpired] = useState(false);

  const loginUser = (newUser: User) => setAuthUser(newUser);

  const validateUser = () => {
    const storageUser = localStorage.getItem("user");
    const user = authUser || (storageUser ? JSON.parse(storageUser) : undefined);
    return user;
  };

  const logoutUser = async () => {
    const storedUser = localStorage.getItem("user");
    const userId = storedUser ? JSON.parse(storedUser)._id : null;

    if (userId) {
      await apiClient.post("/auth/logout", { userId });
    }

    localStorage.removeItem("user");
    setAuthUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        profileType: authUser?.profileType,
        loginUser,
        validateUser,
        logoutUser,
        sessionExpired,
        setSessionExpired,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export { AuthContext };
