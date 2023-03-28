const cors = require('cors');
const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
require("dotenv").config({ path: ".env" });

app.use(express.json())
app.use(cors({
  origin: "*",
}));

const PORT = process.env.PORT || 3000
const uri = process.env.MONGO_CONN;
const client = new MongoClient(uri);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.get("/", (req, res) => {
  return res.json({ "Hello": "World" })
})

app.post("/query", (req, res) => {
  let query = client.db("Users")
    .collection("Data")
    .find(req.body)

  return res.json(query)
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

// client.connect(err => {
//   if (err) { console.error(err); return false; }
//   // connection to mongo is successful, listen for requests
//   console.log("Connected to MongoDB");
//   app.listen(PORT, () => {
//     console.log(`listening for requests on port ${PORT}`);
//   })
// });

