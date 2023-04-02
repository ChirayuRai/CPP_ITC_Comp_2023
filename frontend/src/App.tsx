import "./App.css";
//import "./styles/tailwind.css";
import "./styles/tailwind.css";
import { useEffect, useState } from "react";

import { ThemeProvider, createTheme } from "@mui/system";
import RegistrationForm from "./components/SignUp";
import { Link } from "react-router-dom";
import backgroundPic from "./assets/thanatopsis.jpg";

function App() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-center bg-cover"
      style={{
        backgroundImage: `url(${backgroundPic})`,
      }}
    >
      <div className="bg-green-200 bg-opacity-40 p-8 rounded-lg shadow-md w-full max-w-md mx-auto border-2 border-yellow-400 glow-golden">
        <h2
          className="text-2xl font-semibold mb-4 text-center text-brown-500"
          style={{ color: "#5F3F1A" }}
        >
          Welcome to hæli
        </h2>
        <div className="flex justify-center space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 text-white font-bold rounded hover:from-yellow-400 hover:via-yellow-300 hover:to-yellow-200 transition-all"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-gradient-to-r from-green-600 via-green-500 to-green-400 text-white font-bold rounded hover:from-green-500 hover:via-green-400 hover:to-green-300 transition-all"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
