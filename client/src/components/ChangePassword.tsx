import React, { useState } from "react";
import supabase from "../utils/supabase";
import { useNavigate } from "react-router-dom";

interface PasswordData {
  pass: string;
  confirmPass: string;
}

function ChangePassword() {
  const [passwordData, setPasswordData] = useState<PasswordData>({
    pass: "",
    confirmPass: "",
  });
  const navigate = useNavigate();
  function handleOnChangeInputText(e: React.ChangeEvent<HTMLInputElement>) {
    const newData = { ...passwordData, [e.target.id]: e.target.value };
    setPasswordData(newData);
  }

  async function handleResetPassword(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    e.preventDefault();
    if (passwordData.pass !== passwordData.confirmPass) {
      alert("Password and confirm password are not the same");
      return;
    }
    const { error } = await supabase.auth.updateUser({
      password: passwordData.pass,
    });
    if (error) {
      alert(error.message);
      return;
    }
    alert("Password has been updated");
    navigate("/authentication");
  }
  return (
    <div className="rounded-3xl border-2 border-white text-center backdrop-blur-md duration-700 animate-in zoom-in">
      <form className="flex flex-col items-center justify-center gap-10 p-10">
        <h1 className="text-4xl font-bold text-white">Reset Password</h1>
        <div className="relative h-14 w-96">
          <input
            type="password"
            name="pass"
            id="pass"
            className="peer size-full rounded-full border-2 border-b-2 border-white bg-transparent p-5 text-white outline-none"
            onChange={handleOnChangeInputText}
          />
          <label
            htmlFor="pass"
            className={`absolute left-4 -translate-y-1/2 text-lg transition-all duration-300 ${passwordData.pass === "" ? "top-1/2 text-white" : "text-md -top-0 rounded-full bg-white px-2 font-bold text-black"} peer-focus:text-md peer-focus:-top-0 peer-focus:rounded-full peer-focus:bg-white peer-focus:px-2 peer-focus:font-bold peer-focus:text-black`}
          >
            New password
          </label>
        </div>
        <div className="relative h-14 w-96">
          <input
            type="password"
            name="confirmPass"
            id="confirmPass"
            className="peer size-full rounded-full border-2 border-b-2 border-white bg-transparent p-5 text-white outline-none"
            onChange={handleOnChangeInputText}
          />
          <label
            htmlFor="confirmPass"
            className={`absolute left-4 -translate-y-1/2 text-lg transition-all duration-300 ${passwordData.confirmPass === "" ? "top-1/2 text-white" : "text-md -top-0 rounded-full bg-white px-2 font-bold text-black"} peer-focus:text-md peer-focus:-top-0 peer-focus:rounded-full peer-focus:bg-white peer-focus:px-2 peer-focus:font-bold peer-focus:text-black`}
          >
            Confirm new password
          </label>
        </div>
        <button
          className="w-96 rounded-full border-2 border-white bg-white py-2 text-xl font-bold hover:bg-opacity-20 hover:text-white active:bg-opacity-10"
          type="submit"
          onClick={handleResetPassword}
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
