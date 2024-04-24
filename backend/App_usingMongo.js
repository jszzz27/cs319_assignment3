//Implement Mongo (or other database) Later
var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

// Mongo
const url = "mongodb://127.0.0.1:27017";
const dbName = "reactdata";
const client = new MongoClient(url);
const db = client.db(dbName);

app.use(cors());
app.use(bodyParser.json());
const port = "8081";
const host = "localhost";
app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});

//----------------------------------------------------

//GET
app.get("/api/get", async (req, res) => {
  await client.connect();
  console.log("Node connected successfully to GET MongoDB");
  const query = {};
  const results = await db
    .collection("fakestore_catalog")
    .find(query)
    .limit(100)
    .toArray();
  // console.log(results);
  res.status(200);
  res.send(results);
});

//POST
app.post("/api/post", async (req, res) => {
  await client.connect();
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);
  console.log(keys);
  const id = values[0]; // id
  const title = values[1]; // name
  const price = values[2]; // price
  const description = values[3]; // description
  const category = values[4]; // category
  const image = values[5]; // Image
  const rate = values[6]; // Rating
  const count = values[7];
  const newDocument = {
    id:id,
    title:title,
    price:price,
    description:description,
    category: category,
    image:image,
    rating: {
      rate: rate,
      count: count
    }
  };
  console.log("--------------------");
  console.log(newDocument);
  console.log("--------------------");
  const results = await db.collection("fakestore_catalog").insertOne(newDocument);
  res.status(200);
  res.send(results);
  });
  

//PUT
app.put("/api/update", async (req, res) => {
  await client.connect();
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);
  console.log(keys);
  const id = Number(values[0]); // id
  const title = values[1]; // name
  const price = values[2]; // price
  const description = values[3]; // description
  const category = values[4]; // category
  const image = values[5]; // Image
  const rate = values[6]; // Rating
  const count = values[7];
  const newDocument = {
    id:id,
    title:title,
    price:price,
    description:description,
    category: category,
    image:image,
    rating: {
      rate: rate,
      count: count
    }
  };
  console.log("--------------------");
  console.log(newDocument);
  console.log("--------------------");
  const results = await db.collection("fakestore_catalog")
  .replaceOne({id: Number(values[0])},newDocument);
  res.status(200);
  res.send(results);
});

// DELETE
app.delete("/api/delete", async (req, res) => {
  await client.connect();
  console.log("Delete Started");
  const values = Object.values(req.body);
  const id = values[0];
  const query = {id: Number(id)};
  console.log(query);
  const result = await db.collection("fakestore_catalog").deleteOne(query);
  res.send(result);
  // res.send(results);
  // db.query("DELETE FROM fakestore_catalog WHERE id= ?", id, (err, result) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.send(result);
  //   }
  // });
});