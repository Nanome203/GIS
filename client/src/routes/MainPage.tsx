import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useContext, useEffect } from "react";
import { context } from "../utils/context";
import Profile from "../components/Profile";

function MainPage() {
  const navigate = useNavigate();
  const contextData = useContext(context);
  if (contextData === null) {
    throw new Error("useContext must be inside a Provider with a value");
  }
  const { session } = contextData;
  useEffect(() => {
    if (session === null) {
      navigate("/authentication");
    }
  }, [session, navigate]);
  return (
    <>
      {session !== null ? (
        <div className="flex h-screen flex-col">
          <Header />
          <Outlet />
          {/* <Profile /> */}
          <Footer />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default MainPage;
