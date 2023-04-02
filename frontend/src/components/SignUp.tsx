import React, { useState } from "react";
import "../styles/tailwind.css";
//import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import axios from "axios";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backgroundPic from "../assets/thanatopsis.jpg";
import "./signup.css";

const USER_DETAILS = gql`
  fragment UserDetails on User {
    id
    username
    email
    #firstName
    #vaccinated @client
  }
`;

const GET_USERS = gql`
  query usersList($input: UserInputUniversity) {
    usersByUniversity(input: $input) {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;

const CREATE_USER = gql`
  mutation CreateUser($input: NewUserInput!) {
    addUser(input: $input) {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;

const RegistrationForm = () => {
  const navigate = useNavigate();

  //const [createUser, newUser] = useMutation(CREATE_USER);

  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  const [formData, setFormData] = useState({
    id: "10", //using hardcoded values to test flow(replace this to be assigned in the backend)
    // firstName: "",
    // lastName: "",
    password: "",
    confirmPassword: "",
    email: "",
    username: "",
    //createdAt: 0, //using hardcoded values (replace this to be assigned in the backend)
  });

  const validatePassword = (): boolean => {
    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return false;
    } else {
      setConfirmPasswordError("");
      return true;
    }
  };

  //updates the formData above whenever a change is detected in the text field via user interaction
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleError = (error: any) => {
    console.error("API error:", error);
    toast.error("invalid signup request", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Perform validation logic here
    const isPasswordValid = validatePassword();
    if (!isPasswordValid) {
      // Submit form data
      alert("Passwords do not match");
      return;
    } else {
      // Send data to the backend/API for registration
      try {
        const { id, password, username, email } = formData; //destructuring the data to be passed as a req in createUser
        //graphql req: input payload
        const input = {
          password,
          username,
          email,
        };
        try {
          // const response = await createUser({
          //   variables: { input },
          // });
          // console.log("API response:", response.data);
          // console.log("API response:", newUser);
          // const stateUsername = response.data["addUser"].username;
          // console.log("response data username", stateUsername);
          //console.log("response data", newUser);
          navigate("/profile-setup", { state: { input } }); //passing the username from response as context for the personal info page
        } catch (error) {
          console.error("API error:", error);
          // Handle the error, e.g., show error message, etc.
          handleError(error);
        }

        // You can handle the response data here, e.g., show success message, redirect, etc.
      } catch (error) {
        console.error("API error:", error);
        // Handle the error, e.g., show error message, etc.
      }
      console.log("Form submitted:", formData);
    }
  };

  return (
    // <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
    <div
      className="min-h-screen flex items-center justify-center bg-center bg-cover"
      style={{
        backgroundImage: `url(${backgroundPic})`,
      }}
    >
      <div className="max-w-md bg-opacity-50 w-full space-y-8 bg-white p-6 rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-semibold text-blue-800">
            Create your profile
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-orange-300 placeholder-black-500 text-black-100 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-orange-300 placeholder-black-500 text-black-100 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-orange-300 placeholder-black-500 text-black-100 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-orange-300 placeholder-black-500 text-black-100 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          {confirmPasswordError && (
            <div className="mt-3 text-sm text-red-600">
              {confirmPasswordError}
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Next
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
