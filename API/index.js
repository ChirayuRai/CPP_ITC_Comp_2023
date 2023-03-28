const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000
const cors = require('cors');
require("dotenv").config({ path: "./.env" });

app.use(cors({
  origin: '*'
}));

const uri = process.env.MONGO_CONNECTION_STRING;
const client = new MongoClient(uri);

app.post("/query", async (req, res) => {
  let my_query = req.body
  let query = await client.db("Users")
    .collection("Data")
    .find(my_query)

  return res.json(query)
})

client.connect(err => {
  if (err) { console.error(err); return false; }
  // connection to mongo is successful, listen for requests
  app.listen(PORT, () => {
    console.log("listening for requests");
  })
});

