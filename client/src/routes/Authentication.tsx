import { useState } from "react";
import background from "../assets/background-image.jpg";
import LogInForm from "../components/LogInForm";
import SignInForm from "../components/SignUpForm";

function Authentication() {
  const [isLogIn, setIsLogIn] = useState(true);

  return (
    <div
      className="relative flex h-screen w-screen items-center justify-center bg-cover"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <LogInForm isLogIn={isLogIn} setIsLogIn={setIsLogIn} />
      <SignInForm isLogIn={isLogIn} setIsLogIn={setIsLogIn} />
    </div>
  );
}

export default Authentication;
