import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faLightbulb,
  faSearch,
  faSignIn,
  faUserPlus,
  faSignInAlt,
  faSearchPlus,
} from "@fortawesome/free-solid-svg-icons";
//import "./styles/tailwind.css";
import "./styles/tailwind.css";
import { useEffect, useState } from "react";

import { ThemeProvider, createTheme } from "@mui/system";
import RegistrationForm from "./components/SignUp";
import { Link } from "react-router-dom";
import backgroundPic from "./assets/thanatopsis.jpg";

function App() {
  return (
    <>
      {/* <nav className="fixed top-0 left-0 w-full bg-white bg-opacity-95 shadow-md z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-blue-800">hæli</h1>
          </div>
          <div>
            <Link
              to="/about"
              className="text-lg font-semibold text-blue-800 hover:text-blue-600"
            >
              About
            </Link>
          </div>
        </div>
      </nav> */}
      <div
        className="min-h-screen flex items-center justify-center bg-center bg-cover"
        style={{
          backgroundImage: `url(${backgroundPic})`,
        }}
      >
        <div className="bg-blue-400 p-8 bg-opacity-30 rounded-lg shadow-md w-full max-w-md mx-auto border-4 border-black">
          <h2
            className="text-2xl font-semibold mb-4 text-center text-white"
            style={{
              letterSpacing: "0.05em",
              textShadow:
                "2px 2px 0 blue, -2px -2px 0 blue, 2px -2px 0 blue, -2px 2px 0 blue",
            }}
          >
            Welcome
          </h2>
          <div className="flex justify-center space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 bg-gradient-to-r from-blue-600 via-blue-600 to-blue-400 text-white font-bold rounded hover:from-blue-400 hover:via-blue-300 hover:to-blue-200 transition-all"
            >
              {/* <FontAwesomeIcon icon={faSearch} /> */}
              Search Roommates
            </Link>
            {/* <Link
              to="/signup"
              className="px-4 py-2 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-300 text-white font-bold rounded hover:from-blue-400 hover:via-blue-300 hover:to-blue-200 transition-all"
            >
              <FontAwesomeIcon icon={faUserPlus} />
            </Link> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
