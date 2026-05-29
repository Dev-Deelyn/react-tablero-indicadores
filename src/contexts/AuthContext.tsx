import { createContext, useState } from "react";
import User from "types/User";
import { apiClient } from "config/Axios";

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
  accessDashboards: { keyname: string; name?: string; icon?: string }[];
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
  accessSections: {},
  accessDashboards: []
});

export const AuthContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [authUser, setAuthUser] = useState<User | undefined>();
  const [accessKeynames, setAccessKeynames] = useState<string[]>([]);
  const [accessSections, setAccessSections] = useState<Record<string, string[]>>({});
  const [sessionExpired, setSessionExpired] = useState(false);
  const [accessDashboards, setAccessDashboards] = useState<{ keyname: string; name?: string; icon?: string }[]>([]);

  const refreshAccessKeynames = async () => {
    try {
      const res = await apiClient.get('/user/my-dashboards');
      const data = res.data?.data ?? [];
      setAccessKeynames(data.map((d: any) => d.keyname));
      setAccessDashboards(data.map((d: any) => ({ keyname: d.keyname, name: d.name, icon: d.icon })));
      const sections: Record<string, string[]> = {};
      data.forEach((d: any) => {
        sections[d.keyname] = d.sections;
      });
      setAccessSections(sections);
    } catch (error) {
      console.error('Error al cargar dashboards:', error);
      setAccessKeynames([]);
      setAccessDashboards([]);
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
        accessSections,
        accessDashboards
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export { AuthContext };