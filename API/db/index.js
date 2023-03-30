const { MongoClient } = require("mongodb");

require("dotenv").config({ path: ".env" });

const uri = process.env.MONGO_CONN;
const client = new MongoClient(uri);

const mongoose = require("mongoose");
const userModel = require("./user");
const initializeDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    return {
      models: {
        User: userModel,
      },
      db: mongoose,
    };
  } catch (err) {
    console.error(err);
  }
};

module.exports = initializeDatabase;
