import { createContext, useState } from "react";

interface NavbarContextProps {
  navTitle?: string;
  changeNavTitle: (newTitle: string) => void
}

const NavbarContext = createContext<NavbarContextProps>({ changeNavTitle: () => { } });

export const NavbarContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [navTitle, setNavTitle] = useState<string>('');

  const changeNavTitle = (newTitle: string) => setNavTitle(newTitle)

  return (
    <NavbarContext.Provider value={{ navTitle, changeNavTitle }}>{children}</NavbarContext.Provider>
  )
}

export default NavbarContext;