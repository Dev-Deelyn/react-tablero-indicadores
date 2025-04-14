import { createContext, useState } from "react";
import User from "types/User";

interface AuthContextProps {
  authUser?: User;
  profileType?: 'ADMIN' | 'INVITADO';
  loginUser: (newUser: User) => any;
  validateUser: () => User | undefined;
  logoutUser: () => any;
}

const AuthContext = createContext<AuthContextProps>({
  authUser: undefined,
  profileType: undefined,
  loginUser: () => { },
  validateUser: () => undefined,
  logoutUser: () => { },
});

export const AuthContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [authUser, setAuthUser] = useState<User | undefined>();

  const loginUser = (newUser: User) => setAuthUser(newUser);

  const validateUser = () => {
    const storageUser = localStorage.getItem('user');
    const user = authUser || (storageUser ? JSON.parse(storageUser) : undefined);
    return user;
  };

  const logoutUser = () => {
    localStorage.removeItem('user');
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
