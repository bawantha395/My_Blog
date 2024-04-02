import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

import express from "express";
import { db, connectToDb } from "./db.js";
//localhost:3000/articles/learn-node
// PUT/articles/learn-react/upvote

const app = express();
const port = process.env.PORT;
app.use(express.json()); // middleware for jason

app.get("/api/articles/:name", async (req, res) => {
  const { name } = req.params;

  const article = await db.collection("articles").findOne({ name });

  if (article) {
    res.json(article);
  } else {
    res.sendStatus(404);
  }
});

//get
// app.get("/hello/:name", (req, res) => {
//   const { name } = req.params;
//   console.log(req.params);
//   res.send(`Hello ${name} !!`);
// });

//post
// app.post("/hello", (req, res) => {
//   console.log(req.body);
//   res.send(
//     `Hello ${req.body.name}, nice to meet you!.Your age is ${req.body.age}`
//   );
// });

//put

app.put("/api/articles/:name/upvote", async (req, res) => {
  const { name } = req.params;

  await db.collection("articles").updateOne(
    { name },
    {
      $inc: { upvotes: 1 },
    }
  );
  const article = await db.collection("articles").findOne({ name });

  if (article) {
    res.json(article);
  } else {
    res.send("That article doesn't exist");
  }
});
app.post('/api/articles/:name/comments', async (req, res) => {
  const { name } = req.params;
  const { postedBy, text } = req.body;

  await db.collection('articles').updateOne({ name }, {
      $push: { comments: { postedBy, text } },
  });
  const article = await db.collection('articles').findOne({ name });

  if (article) {
      res.json(article);
  } else {
      res.send('That article doesn\'t exist!');
  }
});


mongoose
  .connect(process.env.MONGO_URI, {})
  .then((result) => {})
  .catch((err) => console.log(err));

connectToDb(() => {
  app.listen(port, () => {
    console.log("database connected");
    console.log(`Server is running on port ${port}`);
  });
});
