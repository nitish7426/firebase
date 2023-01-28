import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import firebase from "../assets/firebase.svg";
import { auth } from "../firebase.config";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const validate = (email, password) => {
    const errors = {};
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!email) {
      errors.email = "email is required !";
    } else {
      if (!regex.test(email)) {
        errors.email = "invalid email format !";
      }
    }
    if (!password) {
      errors.password = "password is required !";
    } else {
      if (password.length < 8) {
        errors.password = "password must be 8 character long.";
      }
    }
    return errors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setErrors(validate(email, password));

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      console.log(user);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="h-[calc(100vh-4rem)] w-full flex items-center justify-center">
      <form
        className="flex flex-col w-80 gap-5 p-6 shadow-lg rounded-xl border"
        onSubmit={(e) => handleSubmit(e)}
      >
        <img className="h-12" src={firebase} alt="" />
        <div className="space-y-1">
          <input
            className="py-2 px-4 rounded-md border outline-none placeholder:capitalize placeholder:text-stone-400 w-full"
            type="email"
            value={email}
            placeholder="enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="text-sm text-red-500 capitalize ml-1">
            {errors.email}
          </div>
        </div>
        <div className="space-y-1">
          <input
            className="py-2 px-4 rounded-md border outline-none placeholder:capitalize placeholder:text-stone-400 w-full"
            type="password"
            value={password}
            placeholder="enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="text-sm text-red-500 capitalize ml-1">
            {errors.password}
          </div>
        </div>
        <button
          className="py-2 px-4 rounded-md bg-amber-400 text-white font-semibold uppercase tracking-wider"
          type="submit"
        >
          Signup
        </button>
        <div className="flex text-sm gap-2">
          <p className="text-stone-500">Already have an accont?</p>
          <Link
            className="text-amber-500 font-medium hover:underline capitalize"
            to="/login"
          >
            login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
