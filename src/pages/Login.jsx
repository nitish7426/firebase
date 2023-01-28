import React, { useState } from "react";
import { Link } from "react-router-dom";
import firebase from "../assets/firebase.svg";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;
      console.log(user);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div
      className="h-[calc(100vh-4rem)] w-full flex items-center justify-center"
      onSubmit={handleSubmit}
    >
      <form className="flex flex-col w-80 gap-5 p-6 shadow-lg rounded-xl border">
        <img className="h-12" src={firebase} alt="" />
        <input
          className="py-2 px-4 rounded-md border outline-none placeholder:capitalize placeholder:text-stone-400"
          type="email"
          value={email}
          placeholder="enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="py-2 px-4 rounded-md border outline-none placeholder:capitalize placeholder:text-stone-400"
          type="password"
          value={password}
          placeholder="enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="py-2 px-4 rounded-md bg-amber-400 text-white font-semibold uppercase tracking-wider"
          type="submit"
        >
          login
        </button>
        <div className="flex text-sm gap-2">
          <p className="text-stone-500">Don't have an accont?</p>
          <Link
            className="text-amber-500 font-medium hover:underline"
            to="/signup"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
