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

  input NewUserInput {
    id: String!
    firstName: String!
    lastName: String!
    email: String!
    username: String!
    createdAt: Int!
  }

  input UserInput {
    lastName: String!
  }

  type Query {
    user(input: UserInput!): User!
    usertest(username: String!): User! #a query which can be used to get user details based on username
    usertestID(userID: String!): User! #a query which can be used to get user details based on user id
  }

  type Mutation {
    addUser(input: NewUserInput!): User!
  }
`;

module.exports = typeDefs;
