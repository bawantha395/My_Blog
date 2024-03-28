import express from "express";

let articlesInfo = [
  {
    name: "learn-react",

    upvotes: 0,
    comments: [],
  },
  {
    name: "learn-node",

    upvotes: 0,
    comments: [],
  },
  {
    name: "mongodb",

    upvotes: 0,
    comments: [],
  },
];

//localhost:3000/articles/learn-node
// PUT/articles/learn-react/upvote

const app = express();
app.use(express.json()); // middleware for jason

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
app.put("/api/articles/:name/upvote", (req, res) => {
  const { name } = req.params;
  const article = articlesInfo.find((a) => a.name === name);
  if (article) {
    article.upvotes += 1;
    res.send(`The ${name} article now has ${article.upvotes} upvotes!!!`);
  } else {
    res.send(`That article doesn\ 't exist`);
  }
});

app.post("/api/articles/:name/comments", (req, res) => {
  const { name } = req.params;
  const { postedBy, text } = req.body;

  const article = articlesInfo.find((a) => a.name === name);
  if (article) {
    article.comments.push({ postedBy, text });
    res.send(article.comments); 
  } else {
    res.send(`That article doesn\ 't exist`);
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
