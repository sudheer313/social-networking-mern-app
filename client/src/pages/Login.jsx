import React from "react";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="text-center pt-4 flex flex-col items-center self-auto ">
      <h1 className="text-3xl pb-4 ">Social Networking App</h1>
      <h3 className="text-2xl pb-2"> SignIn</h3>
      <p className="text-gray-500">
        Already have a Account?
        <Link to="/login" className="underline text-blue-700">
          Login
        </Link>
      </p>

      <form className="flex flex-col gap-4">
        <input
          type="e-mail"
          placeholder="E-mail *"
          className="border p-3 rounded-lg w-80"
        />
        <input
          type="password"
          placeholder="Password *"
          className="border p-3 rounded-lg w-80"
        />
        <button
          type="submit"
          className="border p-3 bg-blue-600 text-white w-80"
        >
          SIGNUP
        </button>
      </form>
    </div>
  );
};

export default Login;
