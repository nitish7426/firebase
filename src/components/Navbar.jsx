import React, { useContext } from "react";
import { Link } from "react-router-dom";
import firebase from "../assets/firebase.svg";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <nav className="h-16 w-full px-4 py-2 md:px-6 lg:px-8 flex items-center justify-between border-b">
      <Link to="/">
        <img className="h-10" src={firebase} alt="firebase_logo" />
      </Link>
      {!currentUser && (
        <ul className="flex items-center gap-4 md:gap-6 capitalize text-stone-500 font-semibold md:text-lg">
          <li>
            <Link
              className="text-sm text-white bg-amber-500 py-2 px-4 rounded-md hover:bg-amber-600 duration-150 border border-amber-500"
              to="/login"
            >
              login
            </Link>
          </li>
          <li>
            <Link
              className="text-sm text-amber-500 py-2 px-4 rounded-md border border-amber-500 hover:bg-amber-50 duration-150"
              to="/signup"
            >
              sign up
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
