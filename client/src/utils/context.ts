import { Session } from "@supabase/supabase-js";
import { createContext } from "react";
type values = {
  // isLoggedIn?: boolean;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
};
export const context = createContext<values | null>(null);
