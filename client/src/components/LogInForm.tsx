import React, { useContext, useState } from "react";
import supabase from "../utils/supabase";
import { context } from "../utils/context";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
interface LoginData {
  email: string;
  password: string;
  remember: boolean;
}

type Event = React.ChangeEvent<HTMLInputElement>;

function LogInForm() {
  const contextValue = useContext(context);
  const navigate = useNavigate();
  if (!contextValue) {
    throw new Error("useContext must be inside a Provider with a value");
  }
  const { setSession } = contextValue;
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
    remember: false,
  });

  function handleOnChangeInputText(e: Event) {
    const newFormData = { ...formData, [e.target.id]: e.target.value };
    setFormData(newFormData);
  }

  function handleOnChangeInputCheckBox(e: Event) {
    const newFormData = { ...formData, [e.target.id]: e.target.checked };
    setFormData(newFormData);
  }

  async function handleLogIn(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    if (error) {
      alert(error.message);
      return;
    }
    localStorage.setItem("session", JSON.stringify(data.session));
    if (formData.remember !== true) {
      window.addEventListener("beforeunload", () => {
        localStorage.removeItem("session");
      });
    }
    setSession(data.session);
    navigate("/home");
  }

  return (
    <div className="rounded-3xl border-2 border-white text-center backdrop-blur-md duration-700 animate-in zoom-in">
      <form className="flex flex-col items-center justify-center gap-10 p-10">
        <h1 className="text-4xl font-bold text-white">Login</h1>
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
            className={`absolute left-4 -translate-y-1/2 text-lg transition-all duration-300 ${formData.email === "" ? "top-1/2 text-white" : "text-md -top-0 rounded-full bg-white px-2 font-bold text-black"} peer-focus:text-md peer-focus:-top-0 peer-focus:rounded-full peer-focus:bg-white peer-focus:px-2 peer-focus:font-bold peer-focus:text-black`}
          >
            Email
          </label>
        </div>
        <div className="relative h-14 w-96">
          <input
            type="password"
            name="password"
            id="password"
            className="peer size-full rounded-full border-2 border-b-2 border-white bg-transparent p-5 text-white outline-none"
            onChange={handleOnChangeInputText}
          />
          <label
            htmlFor="password"
            className={`absolute left-4 -translate-y-1/2 text-lg transition-all duration-300 ${formData.password === "" ? "top-1/2 text-white" : "text-md -top-0 rounded-full bg-white px-2 font-bold text-black"} peer-focus:text-md peer-focus:-top-0 peer-focus:rounded-full peer-focus:bg-white peer-focus:px-2 peer-focus:font-bold peer-focus:text-black`}
          >
            Password
          </label>
        </div>
        <div className="flex h-10 w-96 items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <input
              type="checkbox"
              name="remember"
              id="remember"
              className="accent-white"
              onChange={handleOnChangeInputCheckBox}
            />
            <label htmlFor="remember" className="cursor-pointer">
              Remember me?
            </label>
          </div>
          <Link
            to={"/authentication/reset-password"}
            className="font-bold text-white"
          >
            Forgot Password?
          </Link>
        </div>
        <button
          className="w-96 rounded-full border-2 border-white bg-white py-2 text-xl font-bold hover:bg-opacity-20 hover:text-white active:bg-opacity-10"
          type="submit"
          onClick={handleLogIn}
        >
          Log In
        </button>
        <div className="text-white">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            className="font-bold"
            onClick={() => navigate("/authentication/signup")}
          >
            Register now
          </button>
        </div>
      </form>
    </div>
  );
}

export default LogInForm;
