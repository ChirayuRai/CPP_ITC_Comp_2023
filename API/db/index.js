/*low db configs*/
//const low = require("lowdb");
//const FileSync = require("lowdb/adapters/FileSync");
//const adapter = new FileSync("api/src/db/db.json");
//const db = low(adapter);
const { MongoClient } = require("mongodb");

require("dotenv").config({ path: ".env" });

const uri = process.env.MONGO_CONN;
const client = new MongoClient(uri);

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

//const db = async () => await connectToMongoDB();
//const db = await connectToMongoDB();

// //const createPetModel = require('./pet')
// const createUserModel = require("./user");

const mongoose = require("mongoose");
const createUserModel = require("./user");
const initializeDatabase = async () => {
  // const db = await connectToMongoDB();
  try {
    await mongoose.connect(process.env.MONGO_CONN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    return {
      models: {
        User: createUserModel(),
      },
      db: mongoose,
    };
  } catch (err) {
    console.error(err);
  }
  // return {
  //   models: {
  //     User: createUserModel(db),
  //   },
  //   db,
  // };
};

module.exports = initializeDatabase;

// module.exports = {
//   models: {
//     //Pet: createPetModel(db),
//     User: createUserModel(db),
//   },
//   db,
// };
