import { createContext } from "react";
type values = {
  isLoggedIn?: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};
export const context = createContext<values | null>(null);
