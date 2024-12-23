import React, { useState } from "react";
interface LoginData {
  email: string;
  password: string;
  remember: boolean;
}

type Event = React.ChangeEvent<HTMLInputElement>;
interface Props {
  isLogIn: boolean;
  setIsLogIn: React.Dispatch<React.SetStateAction<boolean>>;
}
function LogInForm({ isLogIn, setIsLogIn }: Props) {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
    remember: false,
  });

  function handleOnChangeInputText(e: Event) {
    console.log(e.target.value === "");
    const newFormData = { ...formData, [e.target.id]: e.target.value };
    setFormData(newFormData);
  }

  function handleOnChangeInputCheckBox(e: Event) {
    const newFormData = { ...formData, [e.target.id]: e.target.checked };
    setFormData(newFormData);
  }

  return (
    <div
      className={`rounded-3xl border-2 border-white text-center backdrop-blur-md duration-700 ${isLogIn ? "animate-in zoom-in" : "hidden"}`}
    >
      <form
        className="flex flex-col items-center justify-center gap-10 p-10"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
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
          <a href="#" className="font-bold text-white">
            Forgot Password?
          </a>
        </div>
        <button
          className="w-96 rounded-full border-2 border-white bg-white py-2 text-xl font-bold hover:bg-opacity-20 hover:text-white active:bg-opacity-10"
          type="submit"
        >
          Log In
        </button>
        <div className="text-white">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            className="font-bold"
            onClick={() => setIsLogIn((prev) => !prev)}
          >
            Register now
          </button>
        </div>
      </form>
    </div>
  );
}

export default LogInForm;
