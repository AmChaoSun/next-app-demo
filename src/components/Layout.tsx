// headers footers can be added here

import { ReactNode, useContext } from "react";
import { ThemeContext, ThemeProvider } from "../contexts/ThemeContext";

interface LayoutProps {
  startingTheme: string;
  children: ReactNode;
}

const Layout = ({ startingTheme, children }: LayoutProps) => {
  return (
    <ThemeProvider startingTheme={startingTheme}>
      <LayoutNoThemeProvider>{children}</LayoutNoThemeProvider>
    </ThemeProvider>
  );
};

interface LayoutNoThemeProviderProps {
  children: ReactNode;
}
const LayoutNoThemeProvider = ({ children }: LayoutNoThemeProviderProps) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`container-fluid ${theme === "light" ? "light" : "dark"}`}>
      {children}
    </div>
  );
};

export default Layout;
