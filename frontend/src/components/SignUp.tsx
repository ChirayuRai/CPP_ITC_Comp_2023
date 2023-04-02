import React, { useState } from "react";
//import "../styles/tailwind.css";
//import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import axios from "axios";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

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
  //implement for recommendations and userprofile page
  //const [modal, setModal] = useState(false);
  //const users = useQuery(GET_USERS);

  // const [createUser, newUser] = useMutation(CREATE_USER, {
  //   update(cache, { data: { addUser } }) {
  //     const { users }: any = cache.readQuery({ query: GET_USERS });

  //     cache.writeQuery({
  //       query: GET_USERS,
  //       data: { pets: [addUser, ...users] },
  //     });
  //   },
  // });
  const navigate = useNavigate();

  const [createUser, newUser] = useMutation(CREATE_USER);

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
          //id,
          password,
          username,
          email,
          //createdAt,
        };
        const response = await createUser({
          variables: { input },
        });
        console.log("API response:", response.data);
        console.log("API response:", newUser);
        const stateUsername = response.data["addUser"].username;
        console.log("response data username", stateUsername);
        //console.log("response data", newUser);
        navigate("/profile-setup", { state: { stateUsername } }); //passing the username from response as context for the personal info page
        // You can handle the response data here, e.g., show success message, redirect, etc.
      } catch (error) {
        console.error("API error:", error);
        // Handle the error, e.g., show error message, etc.
      }
      console.log("Form submitted:", formData);
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
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
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
      <div>
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </label>
        {confirmPasswordError && <div>{confirmPasswordError}</div>}
      </div>
      <br />
      {/* <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label> */}
      {/* <br />
      <label>
        Confirm Password:
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </label>
      <br /> */}
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
