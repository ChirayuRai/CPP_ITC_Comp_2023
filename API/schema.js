const { gql } = require("apollo-server");

const typeDefs = gql`
  enum Frequency {
    OFTEN
    SOMETIMES
    NEVER
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    username: String!
    profile: Profile! #if profile value queried, response from the server cannot be null
  }

  #select primary and secondary and tertiary weighting of attributes
  #example primary: university, major, hygiene, smoke, pets
  type Profile {
    id: ID!
    user: User!
    bio: String!
    imgUrl: String!
    university: String!
    major: String!
    sleepTime: Int!
    wakeTime: Int!
    hygiene: Frequency!
    hobbies: [String!]!
    smoke: Boolean!
    pets: Boolean!
    so: Frequency!
    cook: Frequency!
    createdAt: Int!
  }

  # type Recommendation {
  #   id: ID!
  #   user: User!
  #   recommendedUser: User!
  # }

  #enforces the structure and contents of clientside json req payload
  #example query from postman body (json data type):
  #   {
  #   "query": "mutation AddNewUser($input: NewUserInput!) { addUser(input: $input) { id, firstName, lastName, email } }",
  #   "variables": {
  #     "input":{
  #       "id": "123345",
  #       "lastName": "Prakash",
  #       "firstName" : "Amogh",
  #       "email" : "amog@amoghus.com",
  #       "username" : "zog",
  #       "createdAt": 12
  #     }
  #   }
  # }
  input NewUserInput {
    id: String!
    firstName: String!
    lastName: String!
    email: String!
    username: String!
    createdAt: Int!
  }

  input UserInputUniversity {
    university: String!
  }

  input UserProfile {
    profile: String!
  }

  input UserInputUsername {
    username: String!
  }

  type Query {
    #user(input: UserInputUniversity!): User!
    usersByUniversity(input: UserInputUniversity!): [User]!
    userByUsername(username: String!): User! #a query which can be used to get user details based on username
    usertestID(userID: String!): User! #a query which can be used to get user details based on user id
  }

  type Mutation {
    addUser(input: NewUserInput!): User!
    addUserProfile(input: UserProfile): User!
  }
`;

module.exports = typeDefs;
