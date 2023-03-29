const cors = require("cors");
const express = require("express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
//const { models, db } = require("./db");
const initializeDatabase = require("./db");

const { ApolloServer } = require("apollo-server-express");
//const { typeDefs, resolvers } = require('./graphql');

require("dotenv").config({ path: ".env" });

const PORT = process.env.PORT || 3000;

// const uri = process.env.MONGO_CONN;
// const client = new MongoClient(uri);

// const connectToMongoDB = async () => {
//   try {
//     await client.connect();
//     console.log("Connected to MongoDB");
//     return client.db;
//     // app.listen(PORT, () => {
//     //   console.log(`listening for requests on port ${PORT}`);
//     // });
//   } catch (err) {
//     console.error(err);
//   }
// };

const startServer = async () => {
  //const db = await connectToMongoDB();
  const { models, db } = await initializeDatabase();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context() {
      //({ db });
      return { models, db };
    },
  });

  const app = express();

  server.applyMiddleware({ app });

  app.use(express.json());
  app.use(
    cors({
      origin: "*",
    })
  );

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
  });

  // app.get("/", (req, res) => {
  //   return res.json({ Hello: "World" });
  // });

  // app.post("/query", (req, res) => {
  //   let query = client.db("Users").collection("Data").find(req.body);

  //   return res.json(query);
  // });

  app.listen(PORT, () => {
    console.log(`listening for requests on port ${PORT}`);
  });
  // server.listen().then(({ url }) => {
  //   console.log(`🚀 Server ready at ${url}`);
  // });
};

startServer();

//creating the express app

// client.connect(err => {
//   if (err) { console.error(err); return false; }
//   // connection to mongo is successful, listen for requests
//   console.log("Connected to MongoDB");
//   app.listen(PORT, () => {
//     console.log(`listening for requests on port ${PORT}`);
//   })
// });

// (async () => {
//   const db = await connectToMongoDB();
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: () => ({ db }),
//   });

//   server.listen().then(({ url }) => {
//     console.log(`🚀 Server ready at ${url}`);
//   });
// })();
