import { Session } from "@supabase/supabase-js";
import { createContext } from "react";
type values = {
  session: Session | null;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
};
export const context = createContext<values | null>(null);
