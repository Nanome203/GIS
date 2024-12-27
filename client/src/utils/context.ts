import { Session } from "@supabase/supabase-js";
import { createContext } from "react";
type values = {
  session: Session | null;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
  id: string | undefined;
  setId: React.Dispatch<React.SetStateAction<string | undefined>>;
  fullReRender: boolean;
  setFullReRender: React.Dispatch<React.SetStateAction<boolean>>;
};
export const context = createContext<values | null>(null);
