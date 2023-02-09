import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";

const Home = () => {
  const { currentUser, dispatch } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      const user = await signOut(auth);
      dispatch({ type: "LOGOUT" });
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <main className="p-4 space-y-4">
      <div className="text-center text-lg ">{currentUser.email}</div>
      <button
        className="py-2 px-4 rounded-md text-white bg-yellow-500 block mx-auto font-semibold"
        onClick={handleLogout}
      >
        Logout
      </button>
    </main>
  );
};

export default Home;
