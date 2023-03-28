const cors = require('cors');
const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
require("dotenv").config({ path: "./.env" });

app.use(express.json())
app.use(cors({
  origin: "*",
}));

const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_CONN;
const client = new MongoClient(uri);

app.get("/", async (req, res) => {
  res.send("Hello World")
})

app.post("/query", async (req, res) => {
  try {
    let query = await client.db("itc-website")
      .collection("users")
      .find(req.body)
      .toArray();

    return res.json(query)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: "Internal Server Error" })
  }
})

const startServer = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`listening for requests on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();
