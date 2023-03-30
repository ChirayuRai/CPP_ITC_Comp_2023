import React, { useState } from "react";
//import "../styles/tailwind.css";
//import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import axios from "axios";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Loader from "../components/Loader";

const USER_DETAILS = gql`
  fragment UserDetails on User {
    id
    username
    firstName
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
  const [modal, setModal] = useState(false);
  //implement for recommendations and userprofile page
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

  const [createUser, newUser] = useMutation(CREATE_USER);

  const [formData, setFormData] = useState({
    id: "2", //using hardcoded values to test flow(replace this to be assigned in the backend)
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    createdAt: 0, //using hardcoded values (replace this to be assigned in the backend)
  });

  //updates the formData above whenever a change is detected in the text field via user interaction
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Perform validation logic here
    // Send data to the backend/API for registration
    try {
      const { id, firstName, lastName, username, email, createdAt } = formData;
      const input = {
        id,
        firstName,
        lastName,
        username,
        email,
        createdAt,
      }; //graphql req: input payload
      const response = await createUser({
        variables: { input },
      });
      console.log("API response:", response.data);
      // You can handle the response data here, e.g., show success message, redirect, etc.
    } catch (error) {
      console.error("API error:", error);
      // Handle the error, e.g., show error message, etc.
    }
    console.log("Form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
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
