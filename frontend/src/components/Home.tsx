import React, { useState } from "react";
import SearchFilter from "./SearchFilter";
import { useNavigate, useLocation } from "react-router-dom";
//import ProfileList from "./ProfileList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import profPic from "../assets/profpic.jpg";
import "../styles/pulse.css";

const Home = () => {
  const [searchAttributes, setSearchAttributes] = useState({});

  const handleSearchAttributesChange = (attributes: any) => {
    setSearchAttributes(attributes); //this will be set from the search filter
  };

  const [collapsed, setCollapsed] = useState(true);

  const location = useLocation();
  const { signedUser } = location.state;
  console.log("signedIn user", signedUser);

  return (
    <div className="container mx-auto px-4 py-6 bg-white min-h-screen">
      <div className="p-4">
        <div
          className="text-center"
          style={{
            marginTop: "6rem", // Adjust this value according to the height of the navbar
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(0, 0, 0, 0.3) transparent",
          }}
        >
          {/* <h1 className="text-4xl font-bold text-blue-800 mb-6">hæli</h1> */}
          {/* <div className="inline-block px-6 py-3 bg-white border-4 border-blue-600 rounded-md mb-6">
            <h1 className="text-4xl font-bold text-blue-800">hæli</h1>
          </div> */}

          <div className="rounded-full h-24 w-24 bg-gray-300 mx-auto mb-4">
            <img
              src={profPic}
              alt="Profile"
              className="rounded-full h-full w-full object-cover pulse"
            />
          </div>
          <h2 className="text-2xl font-semibold mb-4">
            hi, {signedUser.data["userLogin"].username}.
          </h2>
        </div>
        <div className="flex justify-center space-x-2 mb-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => setCollapsed(!collapsed)}
          >
            <FontAwesomeIcon icon={faFilter} />
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => console.log("Recommendations clicked")}
          >
            <FontAwesomeIcon icon={faLightbulb} />
          </button>
        </div>
        <div className="relative w-full max-w-md mx-auto">
          <div
            className={`absolute z-10 w-full bg-gray-100 p-6 rounded-lg shadow-lg transition-all duration-300 ${
              collapsed ? "hidden" : "block"
            }`}
          >
            <SearchFilter
              onSearchAttributesChange={handleSearchAttributesChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
