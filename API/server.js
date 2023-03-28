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


app.get("/", (req, res) => {
  return res.json({ "Hello": "World" })
})

app.post("/query", (req, res) => {
  let query = client.db("itc-website")
    .collection("users")
    .find(req.body)

  return res.json(query)
})

try {
  client.connect(err => {
    if (err) { console.error(err); return false; }
    // connection to mongo is successful, listen for requests
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log(`listening for requests on port ${PORT}`);
    })
  });
} catch (err) {
  console.error(err)
}

