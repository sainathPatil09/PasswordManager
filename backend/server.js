const express = require('express')
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv')
const bodyparser = require('body-parser')
const cors = require('cors')
dotenv.config()
// console.log(process.env.MONGO_URI)

// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = process.env.MONGO_URI;
console.log(url)
const client = new MongoClient(url);
// console.log(client)

// Database Name
const dbName = 'passop';
const app = express()
const port = 3000
app.use(bodyparser.json())
app.use(cors())
client.connect();

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectDB()

//Get all passwords

// app.get('/api', (req, res) => {
//   res.send('Hello World!')
// })

app.get('/api', async(req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  // console.log(findResult)
  console.log("fetching passwords")
  res.json(findResult)
})


//save password
app.post('/api', async(req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password);
  res.send({success : true, result : findResult})
})

//delete password
app.delete('/api', async(req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(password);
  res.send({success : true, result : findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})