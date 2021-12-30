import { createContext, ReactNode } from "react";
import { useTheme } from "../hooks/useTheme";

interface ThemeContextProps {
  setTheme: Function;
  theme: string;
}

export const ThemeContext = createContext<ThemeContextProps>({
  setTheme: () => {},
  theme: "",
});

interface ThemeProviderProps {
  startingTheme: string;
  children: ReactNode;
}
export const ThemeProvider = ({
  startingTheme,
  children,
}: ThemeProviderProps) => {
  const { theme, setTheme } = useTheme(startingTheme);
  return (
    <ThemeContext.Provider value={{ setTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
