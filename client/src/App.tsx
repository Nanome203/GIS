import { useEffect, useState } from "react";
import Authentication from "./routes/Authentication";
import { context } from "./utils/context";
import MainPage from "./routes/MainPage";
import { Session } from "@supabase/supabase-js";
import supabase from "./utils/supabase";

function App() {
  const [session, setSession] = useState<Session | null>(
    JSON.parse(localStorage.getItem("session") || "null"),
  );
  console.log(session);
  //refresh tokens
  if (session != null && session.access_token && session.refresh_token) {
    supabase.auth
      .setSession({
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      })
      .then(({ error }) => {
        if (error) {
          console.error(error);
        }
      });
  }
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (_event === "TOKEN_REFRESHED") {
        localStorage.setItem("session", JSON.stringify(session));
        setSession(session);
      } else if (_event === "SIGNED_OUT") {
        localStorage.removeItem("session");
        setSession(session);
      }
    });
    return () => subscription.unsubscribe();
  }, []);
  return (
    <context.Provider value={{ setSession }}>
      {session !== null ? <MainPage /> : <Authentication />}
    </context.Provider>
  );
}

export default App;
