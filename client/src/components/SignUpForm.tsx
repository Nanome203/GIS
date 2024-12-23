import React, { useState } from "react";
interface LoginData {
  email: string;
  password: string;
  confirmPass: string;
}

type Event = React.ChangeEvent<HTMLInputElement>;
interface Props {
  isLogIn: boolean;
  setIsLogIn: React.Dispatch<React.SetStateAction<boolean>>;
}
function SignInForm({ isLogIn, setIsLogIn }: Props) {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
    confirmPass: "",
  });

  function handleOnChangeInputText(e: Event) {
    console.log(e.target.value === "");
    const newFormData = { ...formData, [e.target.id]: e.target.value };
    setFormData(newFormData);
  }

  return (
    <div
      className={`rounded-3xl border-2 border-white text-center backdrop-blur-md duration-700 ${!isLogIn ? "animate-in zoom-in" : "hidden"}`}
    >
      <form
        className="flex flex-col items-center justify-center gap-10 p-10"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h1 className="text-4xl font-bold text-white">Sign Up</h1>
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
        <div className="relative h-14 w-96">
          <input
            type="password"
            id="confirmPass"
            className="peer size-full rounded-full border-2 border-b-2 border-white bg-transparent p-5 text-white outline-none"
            onChange={handleOnChangeInputText}
          />
          <label
            htmlFor="confirmPass"
            className={`absolute left-4 -translate-y-1/2 text-lg transition-all duration-300 ${formData.confirmPass === "" ? "top-1/2 text-white" : "text-md -top-0 rounded-full bg-white px-2 font-bold text-black"} peer-focus:text-md peer-focus:-top-0 peer-focus:rounded-full peer-focus:bg-white peer-focus:px-2 peer-focus:font-bold peer-focus:text-black`}
          >
            Confirm password
          </label>
        </div>
        <button
          className="w-96 rounded-full border-2 border-white bg-white py-2 text-xl font-bold hover:bg-opacity-20 hover:text-white active:bg-opacity-10"
          type="submit"
        >
          Sign Up
        </button>
        <div className="text-white">
          Already have an account?{" "}
          <button
            type="button"
            className="font-bold"
            onClick={() => setIsLogIn((prev) => !prev)}
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;
