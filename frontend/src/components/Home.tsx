import React, { useState } from "react";
import SearchFilter from "./SearchFilter";
import { useNavigate, useLocation } from "react-router-dom";
//import ProfileList from "./ProfileList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faLightbulb,
  faSearch,
  faSignIn,
} from "@fortawesome/free-solid-svg-icons";
import profPic from "../assets/profpic.jpg";
import "../styles/pulse.css";
import backgroundPic from "../assets/login.png";
//import backgroundPic from "../assets/thanatopsis.jpeg";
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
  const [results, setResults] = useState<User[]>([]); //the results are being passed to the SearchResults component as a prop
  const [collapsed, setCollapsed] = useState(true);
  const [showResults, setShowResults] = useState(false);

  const location = useLocation();
  const { signedUser } = location.state;
  console.log("signedIn user", signedUser);
  console.log("searchAttributes", searchAttributes);

  const handleSearchAttributesChange = (attributes: any) => {
    setSearchAttributes(attributes); //this will be set from the search filter react component
    console.log("searchAttributes from searchFilter", searchAttributes);

    //stucture is an array of json objects; replace with the search results from backend
    //the attributes will be the input and the response would be the user object that matches the attributes
    //then execute setResults hook to assign the resulting user details (array of json)
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
          className="relative w-full rounded-lg max-w-md mx-auto mt-16 mb-3 bg-white bg-opacity-25 bg-gray-100 flex flex-col items-center justify-around border-2 border-black"
          style={{ maxHeight: "300px" }}
        >
          <div
            className="text-center mb-5"
            style={{
              marginTop: "6rem", // Adjust this value according to the height of the navbar
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(0, 0, 0, 0.3) transparent",
            }}
          >
            <div className="rounded-full border-3 border-black mb-16 h-24 w-24 bg-gray-300 mx-auto mb-4 glow-blue">
              <img
                src={profPic}
                alt="Profile"
                className="rounded-full h-full w-full object-cover pulse"
              />
            </div>
            {/* <h2
              className="text-2xl font-semibold mb-4"
              style={{
                color: "#0D47A1", // A shade of blue
              }}
            >
              hi, {signedUser.data["userLogin"].username}.
            </h2> */}
          </div>
          <div className="flex justify-center space-x-2 mb-8">
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
        </div>

        <div
          className="relative w-full max-w-md mx-auto "
          style={{ maxHeight: "300px" }}
        >
          <div
            className={`absolute z-10  border-2 border-black w-full bg-white bg-opacity-50 bg-gray-100 p-6 rounded-lg shadow-lg transition-all duration-300 ${
              collapsed ? "hidden" : "block"
            }`}
          >
            {showResults ? (
              <SearchResults
                results={results}
                onToggleView={handleToggleView}
              />
            ) : (
              <SearchFilter
                onSearchAttributesChange={handleSearchAttributesChange}
                onToggleView={handleToggleView}
                signedInUser={signedUser}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
