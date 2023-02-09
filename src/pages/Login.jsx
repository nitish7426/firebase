import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { AuthContext } from "../context/AuthContext";
import Spinner from "../components/Spinner";

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [loginErr, setLoginErr] = useState(null);
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("email is required")
      .email("please enter a valid email"),
    password: yup.string().required("password is required").min(4),
  });

  const handleSubmit = async (e) => {
    const { email, password } = e;
    try {
      setLoading(true);
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;
      console.log(user);
      setLoading(false);
      dispatch({ type: "LOGIN", payload: user });
      navigate("/");
    } catch (err) {
      console.log(err.message);
      setLoginErr(err.message);
      setLoading(false);
    }
  };
  return (
    <div
      className="h-[calc(100vh-4rem)] w-full flex items-center justify-center relative"
      onSubmit={handleSubmit}
    >
      {loading && (
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm flex flex-col items-center justify-center">
          <div className="text-yellow-400 mb-4 font-semibold text-lg">
            Signing In...
          </div>
          <Spinner />
        </div>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col w-80 gap-4">
          <h3 className="text-2xl capitalize text-stone-600 text-center font-semibold">
            login
          </h3>
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
              {loginErr && loginErr}
            </div>
          </div>
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
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
