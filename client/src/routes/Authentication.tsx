import { useContext, useEffect } from "react";
import background from "../assets/background-image.jpg";
import { context } from "../utils/context";
import { Outlet, useNavigate } from "react-router-dom";

function Authentication() {
  const contextData = useContext(context);
  if (!contextData) {
    throw new Error("useContext must be inside a Provider with a value");
  }
  const { session } = contextData;

  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate("/home");
    }
  }, [session, navigate]);

  return (
    <>
      {session ? (
        <></>
      ) : (
        <div
          className="relative flex h-screen w-screen items-center justify-center bg-cover"
          style={{
            backgroundImage: `url(${background})`,
          }}
        >
          <Outlet />
        </div>
      )}
    </>
  );
}

export default Authentication;
