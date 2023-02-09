import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import firebase from "../assets/firebase.svg";
import { auth } from "../firebase.config";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { AuthContext } from "../context/AuthContext";

const SignUp = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required("username is required"),
    email: yup
      .string()
      .required("email is required")
      .email("please enter a valid email"),
    password: yup.string().required("password is required").min(4),
  });

  const handleSubmit = async (e) => {
    const { email, password } = e;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      dispatch({ type: "LOGIN", payload: user });
      navigate("/");
      console.log(user);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="h-[calc(100vh-4rem)] w-full flex items-center justify-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col w-80 gap-4">
          <h3 className="text-2xl capitalize text-stone-600 text-center font-semibold">
            sign up
          </h3>
          <div>
            <Field
              className="py-2 px-4 border rounded-md w-full border-stone-400 outline-yellow-400"
              type="text"
              name="username"
              placeholder="enter your username"
            />
            <div className="text-sm text-red-500 ml-1">
              <ErrorMessage name="username" />
            </div>
          </div>
          <div>
            <Field
              className="py-2 px-4 border rounded-md w-full border-stone-400 outline-yellow-400"
              type="email"
              name="email"
              placeholder="enter your email"
            />
            <div className="text-sm text-red-500 ml-1">
              <ErrorMessage name="email" />
            </div>
          </div>
          <div>
            <Field
              className="py-2 px-4 border rounded-md w-full border-stone-400 outline-yellow-400"
              type="password"
              name="password"
              placeholder="enter your password"
            />
            <div className="text-sm text-red-500 ml-1">
              <ErrorMessage name="password" />
            </div>
          </div>
          <button
            className="py-2 px-4 rounded-md bg-amber-400 text-white font-semibold uppercase tracking-wider"
            type="submit"
          >
            Sign Up
          </button>
          <div className="flex text-sm gap-2">
            <p className="text-stone-500">Already have an accont?</p>
            <Link
              className="text-amber-500 font-medium hover:underline"
              to="/login"
            >
              Log in
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SignUp;
