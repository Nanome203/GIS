import React, { useState } from "react";
import supabase from "../utils/supabase";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  function handleOnChangeInputText(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  async function handleResetPassword(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    event.stopPropagation();
    event.preventDefault();
    if (email === "") {
      alert("Please enter your email");
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/authentication/change-password",
    });
    if (error) {
      alert(error.message);
    } else {
      alert("Reset password email has been sent to your email address");
    }
  }
  return (
    <div className="rounded-3xl border-2 border-white text-center backdrop-blur-md duration-700 animate-in zoom-in">
      <form className="flex flex-col items-center justify-center gap-10 p-10">
        <h1 className="text-4xl font-bold text-white">Reset Password</h1>
        <div className="relative h-14 w-96">
          <input
            type="email"
            name="email"
            id="email"
            className="peer size-full rounded-full border-2 border-b-2 border-white bg-transparent p-5 text-white outline-none"
            onChange={handleOnChangeInputText}
          />
          <label
            htmlFor="email"
            className={`absolute left-4 -translate-y-1/2 text-lg transition-all duration-300 ${email === "" ? "top-1/2 text-white" : "text-md -top-0 rounded-full bg-white px-2 font-bold text-black"} peer-focus:text-md peer-focus:-top-0 peer-focus:rounded-full peer-focus:bg-white peer-focus:px-2 peer-focus:font-bold peer-focus:text-black`}
          >
            Enter your email
          </label>
        </div>
        <button
          className="w-96 rounded-full border-2 border-white bg-white py-2 text-xl font-bold hover:bg-opacity-20 hover:text-white active:bg-opacity-10"
          type="submit"
          onClick={handleResetPassword}
        >
          Send
        </button>
        <div className="text-white">
          Already have an account?{" "}
          <button
            type="button"
            className="font-bold"
            onClick={() => navigate("/authentication/login")}
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
