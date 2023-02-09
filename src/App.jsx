import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { AuthContext } from "./context/AuthContext";

const ProctectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? children : <Navigate to={"/login"} />;
};

const ProtectedLogin = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  return !currentUser ? children : <Navigate to={"/"} />;
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProctectedRoute>
              <Home />
            </ProctectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedLogin>
              <Login />
            </ProtectedLogin>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedLogin>
              <SignUp />
            </ProtectedLogin>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
