const { gql } = require("apollo-server");

const typeDefs = gql`
  enum Frequency {
    OFTEN
    SOMETIMES
    NEVER
  }

  type User {
    id: ID!
    name: String!
    password: String!
    email: String!
    username: String!
    bio: String!
    imgUrl: String!
    university: String!
    major: String!
    sleepTime: Int!
    hygiene: Frequency!
    hobbies: [String!]!
    smoke: Boolean!
    pets: Boolean!
    createdAt: Int!
  }

  type ProfileInfo {
    username: User
  }

  type AddUserProfileResult {
    profile: User
    compatibleUsers: [User]
  }

  #enforces the structure and contents of clientside json req payload

  input NewUserInput {
    #id: String!
    password: String!
    email: String!
    username: String!
    #createdAt: Int!
  }

  input UserProfile {
    #id: ID!
    username: String!
    name: String!
    biography: String!
    #image: String!
    university: String!
    major: String!
    sleepTime: String!
    cleanliness: Frequency!
    guests: Frequency!
    hobbies: [String!]!
    smoking: String!
    pets: String!
  }

  input UserInputUniversity {
    university: String!
  }

  input UserInputLogin {
    username: String!
    password: String!
  }

  type Query { #the query can be of any name but the input type and return types are usually defined in the schema
    #user(input: UserInputUniversity!): User!
    #usersByUniversity(input: UserInputUniversity!): [User]! #can be used for search

    #userLogin(input: UserInputLogin): User! #a query which can be used to get user details based on username to handle login
    usertestID(userID: String!): User! #a query which can be used to get user details based on user id
  }

  type Mutation {
    addUser(input: NewUserInput!): User!
    addUserProfile(input: UserProfile): User! #mutation definition to add profile info to the user
    userLogin(input: UserInputLogin!): User!
  }
`;

module.exports = typeDefs;
