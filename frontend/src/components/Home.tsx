import React, { useState } from "react";
import SearchFilter from "./SearchFilter";
import { useNavigate, useLocation } from "react-router-dom";
//import ProfileList from "./ProfileList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faLightbulb,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import profPic from "../assets/profpic.jpg";
import "../styles/pulse.css";
import backgroundPic from "../assets/login.png";
import SearchResults from "./SearchResults";
import gql from "graphql-tag";

interface User {
  id: number;
  name: string;
  email: string;
  attributes: any;
}

//gql mutation query for the list of users based on the search query
const USER_DETAILS = gql`
  fragment UserDetails on User {
    username
    # username
    email
    #firstName
    #vaccinated @client
  }
`;

const SEARCH_USERS = gql`
  mutation CreateUserProfile($input: UserProfile!) {
    addUserProfile(input: $input) {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;

const Home = () => {
  const [searchAttributes, setSearchAttributes] = useState({});
  const [results, setResults] = useState<User[]>([]);
  const [collapsed, setCollapsed] = useState(true);
  const [showResults, setShowResults] = useState(false);

  const location = useLocation();
  const { signedUser } = location.state;
  console.log("signedIn user", signedUser);
  console.log("searchAttributes", searchAttributes);

  const handleSearchAttributesChange = (attributes: any) => {
    setSearchAttributes(attributes); //this will be set from the search filter react component
    console.log("searchAttributes from searchFilter", searchAttributes);

    //stucture is an array of json objects
    const dummyResults = [
      { id: 1, name: "User 1", email: "", attributes },
      { id: 2, name: "User 2", email: "", attributes },
    ];
    //call the api to get the list of searched users

    setResults(dummyResults);
  };

  const handleToggleView = () => {
    console.log("handle toggle view called");
    setShowResults(!showResults);
    console.log("show results value", showResults);
  };

  return (
    // <div className="container mx-auto px-4 py-6 min-h-screen">
    <div
      className="mx-auto px-4 py-6 min-h-screen overflow-y-auto"
      style={{
        backgroundImage: `url(${backgroundPic})`,
      }}
    >
      <div className="p-4 ">
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
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => console.log("Recommendations clicked")}
          >
            <FontAwesomeIcon icon={faLightbulb} />
          </button>
        </div>

        {/* <div className="relative w-full max-w-md mx-auto ">
          <div
            className={`absolute z-10 w-full bg-white bg-opacity-50 bg-gray-100 p-6 rounded-lg shadow-lg transition-all duration-300 ${
              collapsed ? "hidden" : "block"
            }`}
          > */}
        <div
          className="relative w-full max-w-md mx-auto "
          style={{ maxHeight: "300px" }}
        >
          <div
            className={`absolute z-10 w-full bg-white bg-opacity-50 bg-gray-100 p-6 rounded-lg shadow-lg transition-all duration-300 ${
              collapsed ? "hidden" : "block"
            }`}
          >
            {/* <SearchFilter
              onSearchAttributesChange={handleSearchAttributesChange}
            />
            <SearchResults results={results} /> */}
            {showResults ? (
              <SearchResults
                results={results}
                onToggleView={handleToggleView}
              />
            ) : (
              <SearchFilter
                onSearchAttributesChange={handleSearchAttributesChange}
                onToggleView={handleToggleView}
              />
            )}
            {/* <button
              onClick={handleToggleView}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {showResults ? "Go back to search filter" : "Show results"}
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
