import { useEffect, useState } from "react";
import Authentication from "./routes/Authentication";
import { context } from "./utils/context";
import MainPage from "./routes/MainPage";
import { Session } from "@supabase/supabase-js";
import supabase from "./utils/supabase";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LogInForm from "./components/LogInForm";
import SignInForm from "./components/SignUpForm";
import HouseForSale from "./page/HouseForSale";
import HouseForRent from "./page/HouseForRent";
import Directory from "./page/Directory";
import ResetPassword from "./components/ResetPassword";
import ChangePassword from "./components/ChangePassword";

function App() {
  const [session, setSession] = useState<Session | null>(
    JSON.parse(localStorage.getItem("session") || "null"),
  );
  console.log(session);

  useEffect(() => {
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
  }, []);
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (_event === "TOKEN_REFRESHED") {
        localStorage.setItem("session", JSON.stringify(session));
        setSession(session);
      } else if (_event === "SIGNED_OUT") {
        localStorage.removeItem("session");
        setSession(null);
      }
    });
    return () => subscription.unsubscribe();
  }, []);
  return (
    <context.Provider value={{ session, setSession }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to={`${session !== null ? "/home" : "authentication"}`}
              />
            }
          />
          <Route path="/authentication" element={<Authentication />}>
            <Route index element={<Navigate to="login" />} />
            <Route path="login" element={<LogInForm />} />
            <Route path="signup" element={<SignInForm />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
          <Route path="/home" element={<MainPage />}>
            <Route index element={<HouseForSale />} />
            <Route path="house-for-rent" element={<HouseForRent />} />
            {/* <Route path="/analysis" element={<Analysis />} /> */}
            <Route path="directory" element={<Directory />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </context.Provider>
  );
}

export default App;
