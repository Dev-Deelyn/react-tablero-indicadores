import { createContext, useState } from "react";
import User from "types/User";
import { apiClient } from "config/Axios";
import { getAllDashboards } from "services/DashboardServices";

interface AuthContextProps {
  authUser?: User;
  profileType?: "ADMIN" | "INVITADO";
  accessKeynames: string[];
  loginUser: (newUser: User) => Promise<void>;
  validateUser: () => User | undefined;
  logoutUser: () => Promise<void>;
  sessionExpired: boolean;
  setSessionExpired: (expired: boolean) => void;
  refreshAccessKeynames: () => Promise<void>;
  accessSections: Record<string, string[]>;
}

const AuthContext = createContext<AuthContextProps>({
  authUser: undefined,
  profileType: undefined,
  accessKeynames: [],
  loginUser: async () => {},
  validateUser: () => undefined,
  logoutUser: async () => {},
  sessionExpired: false,
  setSessionExpired: () => {},
  refreshAccessKeynames: async () => {},
  accessSections: {}
});

export const AuthContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [authUser, setAuthUser] = useState<User | undefined>();
  const [accessKeynames, setAccessKeynames] = useState<string[]>([]);
  const [accessSections, setAccessSections] = useState<Record<string, string[]>>({});
  const [sessionExpired, setSessionExpired] = useState(false);

  const refreshAccessKeynames = async () => {
    try {
      const res = await apiClient.get('/user/my-dashboards');
      const data = res.data?.data ?? [];
      setAccessKeynames(data.map((d: any) => d.keyname));
      const sections: Record<string, string[]> = {};
      data.forEach((d: any) => {
        sections[d.keyname] = d.sections;
      });
      setAccessSections(sections);
    } catch (error) {
      console.error('Error al cargar dashboards:', error);
      setAccessKeynames([]);
      setAccessSections({});
    }
  };

  const loginUser = async (newUser: User) => {
    setAuthUser(newUser);
    await refreshAccessKeynames();
  };

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
    setAccessKeynames([]);
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        profileType: authUser?.profileType,
        accessKeynames,
        loginUser,
        validateUser,
        logoutUser,
        sessionExpired,
        setSessionExpired,
        refreshAccessKeynames,
        accessSections
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export { AuthContext };