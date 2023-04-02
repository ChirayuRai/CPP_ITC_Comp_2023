import React, { useState } from "react";
//import "../styles/tailwind.css";
//import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import axios from "axios";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const USER_DETAILS = gql`
  fragment SignedInUserDetails on User {
    id
    username
    email
    name
    #vaccinated @client
  }
`;

const VERIFY_USER = gql`
  mutation ValidateUser($input: UserInputLogin!) {
    userLogin(input: $input) {
      ...SignedInUserDetails
    }
  }
  ${USER_DETAILS}
`;

const LoginForm = () => {
  //implement for recommendations and userprofile page
  //const [modal, setModal] = useState(false);
  //const users = useQuery(GET_USERS);

  const navigate = useNavigate();

  const [validateUser, validatedUser] = useMutation(VERIFY_USER);
  //const validatedUser = useQuery(VERIFY_USER); //the response implies that the user has been validated in the backend

  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  const [formData, setFormData] = useState({
    password: "",
    username: "",
  });

  // const validatedUser = useQuery(VERIFY_USER, {
  //   variables: {
  //     input: formData,
  //   },
  // });

  //updates the formData above whenever a change is detected in the text field via user interaction
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Send data to the backend/API for login validation
    try {
      const { username, password } = formData; //destructuring the data to be passed as a req in createUser
      //graphql req: input payload
      const input = {
        username, //this value has to be passed in from the signup flow to establish the relationship
        password,
        //createdAt,
      };
      try {
        const response = await validateUser({
          variables: { input }, //the input has to match the input schema type defined in backend
        });
        console.log("API response:", response.data);
        navigate("/");
      } catch (error) {
        console.error("API error:", error);
        alert("incorrect credentials");
        // Handle the error, e.g., show error message, etc.
      }

      // if (response == null) {
      //   alert("incorrect credentials");
      //   return;
      // }

      //console.log("API response:", newProfile);

      //navigate("/profile-setup"); navigate to either login page or home page
      // You can handle the response data here, e.g., show success message, redirect, etc.
    } catch (error) {
      console.error("API error:", error);
      // Handle the error, e.g., show error message, etc.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
      </div>

      <br />

      <div>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
      </div>
      <br />

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
